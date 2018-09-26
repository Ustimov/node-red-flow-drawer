import { JSDOM } from 'jsdom';

/**
 * Copyright JS Foundation and other contributors, http://js.foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

const RED = require('./red');
const jsdom = require('jsdom');
var d3 = require("d3");
const SvgSaver = require('./saveSvgAsPng');
//<link rel="stylesheet" href="style.min.css">
const { window } = new JSDOM(`
    <html>
        
        <body>
            <div id="chart"></div>
        </body>
        <script src="http://127.0.0.1:8080/d3.v3.min.js"></script>
    </html>`, {
    resources: "usable",
    runScripts: "dangerously"
});
const document = window.document;
const { createCanvas, Image } = require('canvas');
    // , Image = Canvas.Image;
// window.onload = () => {
//     console.log('WINDOW LOAD');
// };

RED.view = (function() {
    var space_width = 5000,
        space_height = 5000,
        lineCurveScale = 0.75,
        scaleFactor = 1,
        node_width = 100,
        node_height = 30;

    var touchLongPressTimeout = 1000,
        startTouchDistance = 0,
        startTouchCenter = [],
        moveTouchCenter = [],
        touchStartTime = 0;

    var workspaceScrollPositions = {};

    var gridSize = 20;
    var snapGrid = false;

    var activeSpliceLink;
    var spliceActive = false;
    var spliceTimer;

    var activeSubflow = null;
    var activeNodes = [];
    var activeLinks = [];
    var activeFlowLinks = [];

    var selected_link = null,
        mousedown_link = null,
        mousedown_node = null,
        mousedown_port_type = null,
        mousedown_port_index = 0,
        mouseup_node = null,
        mouse_offset = [0,0],
        mouse_position = null,
        mouse_mode = 0,
        moving_set = [],
        lasso = null,
        showStatus = false,
        lastClickNode = null,
        dblClickPrimed = null,
        clickTime = 0,
        clickElapsed = 0,
        scroll_position = [],
        quickAddActive = false,
        quickAddLink = null;

    var clipboard = "";

    var status_colours = {
        "red":    "#c00",
        "green":  "#5a8",
        "yellow": "#F9DF31",
        "blue":   "#53A3F3",
        "grey":   "#d3d3d3"
    }

    var PORT_TYPE_INPUT = 1;
    var PORT_TYPE_OUTPUT = 0;

    var chart = window.document.querySelector("#chart"); // $("#chart");

    var outer = d3.select(chart)// d3.select("#chart")
        .append("svg:svg")
        .attr("width", space_width)
        .attr("height", space_height)
        .attr("pointer-events", "all")
        .style("cursor","crosshair")
        .on("mousedown", function() {
            focusView();
        })
        .on("contextmenu", function(){
            d3.event.preventDefault();
        });

    var vis = outer
        .append("svg:g")
        .append("svg:g")
        .attr('class','innerCanvas');

    var outer_background = vis.append("svg:rect")
        .attr("width", space_width)
        .attr("height", space_height)
        .attr("fill","#fff");

    var grid = vis.append("g");
    updateGrid();

    function updateGrid() {
        var gridTicks = [];
        for (var i=0;i<space_width;i+=+gridSize) {
            gridTicks.push(i);
        }
        grid.selectAll("line.horizontal").remove();
        grid.selectAll("line.horizontal").data(gridTicks).enter()
            .append("line")
            .attr(
                {
                    "class":"horizontal",
                    "x1" : 0,
                    "x2" : space_width,
                    "y1" : function(d){ return d;},
                    "y2" : function(d){ return d;},
                    "fill" : "none",
                    "shape-rendering" : "crispEdges",
                    "stroke" : "#eee",
                    "stroke-width" : "1px"
                });
        grid.selectAll("line.vertical").remove();
        grid.selectAll("line.vertical").data(gridTicks).enter()
            .append("line")
            .attr(
                {
                    "class":"vertical",
                    "y1" : 0,
                    "y2" : space_width,
                    "x1" : function(d){ return d;},
                    "x2" : function(d){ return d;},
                    "fill" : "none",
                    "shape-rendering" : "crispEdges",
                    "stroke" : "#eee",
                    "stroke-width" : "1px"
                });
    }

    var dragGroup = vis.append("g");
    var drag_lines = [];

    function showDragLines(nodes) {
        for (var i=0;i<nodes.length;i++) {
            var node = nodes[i];
            node.el = dragGroup.append("svg:path").attr("class", "drag_line");
            drag_lines.push(node);
        }

    }
    function hideDragLines() {
        while(drag_lines.length) {
            var line = drag_lines.pop();
            if (line.el) {
                line.el.remove();
            }
        }
    }

    function updateActiveNodes() {
        var activeWorkspace = RED.workspaces.active();
        
        //console.log('Active workspace: ' + activeWorkspace);

        activeNodes = RED.nodes.filterNodes({z:activeWorkspace});

        //console.log('Active nodes: ' + activeNodes.length);

        activeLinks = RED.nodes.filterLinks({
            source:{z:activeWorkspace},
            target:{z:activeWorkspace}
        });

        //console.log('Active links: ' + activeLinks.length);
    }

    function generateLinkPath(origX,origY, destX, destY, sc) {
        var dy = destY-origY;
        var dx = destX-origX;
        var delta = Math.sqrt(dy*dy+dx*dx);
        var scale = lineCurveScale;
        var scaleY = 0;
        if (dx*sc > 0) {
            if (delta < node_width) {
                scale = 0.75-0.75*((node_width-delta)/node_width);
                // scale += 2*(Math.min(5*node_width,Math.abs(dx))/(5*node_width));
                // if (Math.abs(dy) < 3*node_height) {
                //     scaleY = ((dy>0)?0.5:-0.5)*(((3*node_height)-Math.abs(dy))/(3*node_height))*(Math.min(node_width,Math.abs(dx))/(node_width)) ;
                // }
            }
        } else {
            scale = 0.4-0.2*(Math.max(0,(node_width-Math.min(Math.abs(dx),Math.abs(dy)))/node_width));
        }
        if (dx*sc > 0) {
            return "M "+origX+" "+origY+
                " C "+(origX+sc*(node_width*scale))+" "+(origY+scaleY*node_height)+" "+
                (destX-sc*(scale)*node_width)+" "+(destY-scaleY*node_height)+" "+
                destX+" "+destY
        } else {

            var midX = Math.floor(destX-dx/2);
            var midY = Math.floor(destY-dy/2);
            //
            if (dy === 0) {
                midY = destY + node_height;
            }
            var cp_height = node_height/2;
            var y1 = (destY + midY)/2
            var topX =origX + sc*node_width*scale;
            var topY = dy>0?Math.min(y1 - dy/2 , origY+cp_height):Math.max(y1 - dy/2 , origY-cp_height);
            var bottomX = destX - sc*node_width*scale;
            var bottomY = dy>0?Math.max(y1, destY-cp_height):Math.min(y1, destY+cp_height);
            var x1 = (origX+topX)/2;
            var scy = dy>0?1:-1;
            var cp = [
                // Orig -> Top
                [x1,origY],
                [topX,dy>0?Math.max(origY, topY-cp_height):Math.min(origY, topY+cp_height)],
                // Top -> Mid
                // [Mirror previous cp]
                [x1,dy>0?Math.min(midY, topY+cp_height):Math.max(midY, topY-cp_height)],
                // Mid -> Bottom
                // [Mirror previous cp]
                [bottomX,dy>0?Math.max(midY, bottomY-cp_height):Math.min(midY, bottomY+cp_height)],
                // Bottom -> Dest
                // [Mirror previous cp]
                [(destX+bottomX)/2,destY]
            ];
            if (cp[2][1] === topY+scy*cp_height) {
                if (Math.abs(dy) < cp_height*10) {
                    cp[1][1] = topY-scy*cp_height/2;
                    cp[3][1] = bottomY-scy*cp_height/2;
                }
                cp[2][0] = topX;
            }
            return "M "+origX+" "+origY+
                " C "+
                   cp[0][0]+" "+cp[0][1]+" "+
                   cp[1][0]+" "+cp[1][1]+" "+
                   topX+" "+topY+
                " S "+
                   cp[2][0]+" "+cp[2][1]+" "+
                   midX+" "+midY+
               " S "+
                  cp[3][0]+" "+cp[3][1]+" "+
                  bottomX+" "+bottomY+
                " S "+
                    cp[4][0]+" "+cp[4][1]+" "+
                    destX+" "+destY
        }
    }

    function addNode(type,x,y) {
        var m = /^subflow:(.+)$/.exec(type);

        if (activeSubflow && m) {
            var subflowId = m[1];
            if (subflowId === activeSubflow.id) {
                // RED.notify(RED._("notification.error",{message: RED._("notification.errors.cannotAddSubflowToItself")}),"error");
                return;
            }
            if (RED.nodes.subflowContains(m[1],activeSubflow.id)) {
                // RED.notify(RED._("notification.error",{message: RED._("notification.errors.cannotAddCircularReference")}),"error");
                return;
            }
        }

        var nn = { id:RED.nodes.id(),z:RED.workspaces.active()};

        nn.type = type;
        nn._def = RED.nodes.getType(nn.type);

        if (!m) {
            nn.inputs = nn._def.inputs || 0;
            nn.outputs = nn._def.outputs;

            for (var d in nn._def.defaults) {
                if (nn._def.defaults.hasOwnProperty(d)) {
                    if (nn._def.defaults[d].value !== undefined) {
                        nn[d] = JSON.parse(JSON.stringify(nn._def.defaults[d].value));
                    }
                }
            }

            if (nn._def.onadd) {
                try {
                    nn._def.onadd.call(nn);
                } catch(err) {
                    console.log("Definition error: "+nn.type+".onadd:",err);
                }
            }
        } else {
            var subflow = RED.nodes.subflow(m[1]);
            nn.name = "";
            nn.inputs = subflow.in.length;
            nn.outputs = subflow.out.length;
        }

        nn.changed = true;
        nn.moved = true;

        nn.w = node_width;
        nn.h = Math.max(node_height,(nn.outputs||0) * 15);

        var historyEvent = {
            t:"add",
            nodes:[nn.id],
            dirty:RED.nodes.dirty()
        }
        if (activeSubflow) {
            // var subflowRefresh = RED.subflow.refresh(true);
            // if (subflowRefresh) {
            //     historyEvent.subflow = {
            //         id:activeSubflow.id,
            //         changed: activeSubflow.changed,
            //         instances: subflowRefresh.instances
            //     }
            // }
        }
        return {
            node: nn,
            historyEvent: historyEvent
        }

    }

    function selectAll() {
        RED.nodes.eachNode(function(n) {
            if (n.z == RED.workspaces.active()) {
                if (!n.selected) {
                    n.selected = true;
                    n.dirty = true;
                    moving_set.push({n:n});
                }
            }
        });
        if (activeSubflow) {
            activeSubflow.in.forEach(function(n) {
                if (!n.selected) {
                    n.selected = true;
                    n.dirty = true;
                    moving_set.push({n:n});
                }
            });
            activeSubflow.out.forEach(function(n) {
                if (!n.selected) {
                    n.selected = true;
                    n.dirty = true;
                    moving_set.push({n:n});
                }
            });
        }

        selected_link = null;
        updateSelection();
        redraw();
    }

    function clearSelection() {
        for (var i=0;i<moving_set.length;i++) {
            var n = moving_set[i];
            n.n.dirty = true;
            n.n.selected = false;
        }
        moving_set = [];
        selected_link = null;
    }

    // var lastSelection = null;
    // function updateSelection() {
    //     var selection = {};

    //     if (moving_set.length > 0) {
    //         selection.nodes = moving_set.map(function(n) { return n.n;});
    //     }
    //     if (selected_link != null) {
    //         selection.link = selected_link;
    //     }
    //     var activeWorkspace = RED.workspaces.active();
    //     activeLinks = RED.nodes.filterLinks({
    //         source:{z:activeWorkspace},
    //         target:{z:activeWorkspace}
    //     });
    //     var tabOrder = RED.nodes.getWorkspaceOrder();
    //     var currentLinks = activeLinks;
    //     var addedLinkLinks = {};
    //     activeFlowLinks = [];
    //     for (var i=0;i<moving_set.length;i++) {
    //         if (moving_set[i].n.type === "link out" || moving_set[i].n.type === "link in") {
    //             var linkNode = moving_set[i].n;
    //             var offFlowLinks = {};
    //             linkNode.links.forEach(function(id) {
    //                 var target = RED.nodes.node(id);
    //                 if (target) {
    //                     if (linkNode.type === "link out") {
    //                         if (target.z === linkNode.z) {
    //                             if (!addedLinkLinks[linkNode.id+":"+target.id]) {
    //                                 activeLinks.push({
    //                                     source:linkNode,
    //                                     sourcePort:0,
    //                                     target: target,
    //                                     link: true
    //                                 });
    //                                 addedLinkLinks[linkNode.id+":"+target.id] = true;
    //                             }
    //                         } else {
    //                             offFlowLinks[target.z] = offFlowLinks[target.z]||[];
    //                             offFlowLinks[target.z].push(target);
    //                         }
    //                     } else {
    //                         if (target.z === linkNode.z) {
    //                             if (!addedLinkLinks[target.id+":"+linkNode.id]) {
    //                                 activeLinks.push({
    //                                     source:target,
    //                                     sourcePort:0,
    //                                     target: linkNode,
    //                                     link: true
    //                                 });
    //                                 addedLinkLinks[target.id+":"+linkNode.id] = true;
    //                             }
    //                         } else {
    //                             offFlowLinks[target.z] = offFlowLinks[target.z]||[];
    //                             offFlowLinks[target.z].push(target);
    //                         }
    //                     }
    //                 }
    //             });
    //             var offFlows = Object.keys(offFlowLinks);
    //             // offFlows.sort(function(A,B) {
    //             //     return tabOrder.indexOf(A) - tabOrder.indexOf(B);
    //             // });
    //             if (offFlows.length > 0) {
    //                 activeFlowLinks.push({
    //                     refresh: Math.floor(Math.random()*10000),
    //                     node: linkNode,
    //                     links: offFlowLinks//offFlows.map(function(i) { return {id:i,links:offFlowLinks[i]};})
    //                 });
    //             }
    //         }
    //     }
    //     var selectionJSON = activeWorkspace+":"+JSON.stringify(selection,function(key,value) {
    //         if (key === 'nodes') {
    //             return value.map(function(n) { return n.id })
    //         } else if (key === 'link') {
    //             return value.source.id+":"+value.sourcePort+":"+value.target.id;
    //         }
    //         return value;
    //     });
    //     if (selectionJSON !== lastSelection) {
    //         lastSelection = selectionJSON;
    //         // RED.events.emit("view:selection-changed",selection);
    //     }
    // }

    function endKeyboardMove() {
        endMoveSet = false;
        if (moving_set.length > 0) {
            var ns = [];
            for (var i=0;i<moving_set.length;i++) {
                ns.push({n:moving_set[i].n,ox:moving_set[i].ox,oy:moving_set[i].oy,moved:moving_set[i].n.moved});
                moving_set[i].n.moved = true;
                moving_set[i].n.dirty = true;
                delete moving_set[i].ox;
                delete moving_set[i].oy;
            }
            redraw();
            // RED.history.push({t:"move",nodes:ns,dirty:RED.nodes.dirty()});
            RED.nodes.dirty(true);
        }
    }
    var endMoveSet = false;
    function moveSelection(dx,dy) {
        if (moving_set.length > 0) {
            if (!endMoveSet) {
                $(document).one('keyup',endKeyboardMove);
                endMoveSet = true;
            }
            var minX = 0;
            var minY = 0;
            var node;

            for (var i=0;i<moving_set.length;i++) {
                node = moving_set[i];
                node.n.moved = true;
                node.n.dirty = true;
                if (node.ox == null && node.oy == null) {
                    node.ox = node.n.x;
                    node.oy = node.n.y;
                }
                node.n.x += dx;
                node.n.y += dy;
                node.n.dirty = true;
                minX = Math.min(node.n.x-node.n.w/2-5,minX);
                minY = Math.min(node.n.y-node.n.h/2-5,minY);
            }

            if (minX !== 0 || minY !== 0) {
                for (var n = 0; n<moving_set.length; n++) {
                    node = moving_set[n];
                    node.n.x -= minX;
                    node.n.y -= minY;
                }
            }

            redraw();
        }
    }
    function editSelection() {
        if (moving_set.length > 0) {
            var node = moving_set[0].n;
            if (node.type === "subflow") {
                RED.editor.editSubflow(activeSubflow);
            } else {
                RED.editor.edit(node);
            }
        }
    }
    function deleteSelection() {
        if (moving_set.length > 0 || selected_link != null) {
            var result;
            var removedNodes = [];
            var removedLinks = [];
            var removedSubflowOutputs = [];
            var removedSubflowInputs = [];
            var subflowInstances = [];

            var startDirty = RED.nodes.dirty();
            var startChanged = false;
            if (moving_set.length > 0) {
                for (var i=0;i<moving_set.length;i++) {
                    var node = moving_set[i].n;
                    node.selected = false;
                    if (node.type != "subflow") {
                        if (node.x < 0) {
                            node.x = 25
                        }
                        var removedEntities = RED.nodes.remove(node.id);
                        removedNodes.push(node);
                        removedNodes = removedNodes.concat(removedEntities.nodes);
                        removedLinks = removedLinks.concat(removedEntities.links);
                    } else {
                        if (node.direction === "out") {
                            removedSubflowOutputs.push(node);
                        } else if (node.direction === "in") {
                            removedSubflowInputs.push(node);
                        }
                        node.dirty = true;
                    }
                }
                if (removedSubflowOutputs.length > 0) {
                    // result = RED.subflow.removeOutput(removedSubflowOutputs);
                    // if (result) {
                    //     removedLinks = removedLinks.concat(result.links);
                    // }
                }
                // Assume 0/1 inputs
                if (removedSubflowInputs.length == 1) {
                    // result = RED.subflow.removeInput();
                    // if (result) {
                    //     removedLinks = removedLinks.concat(result.links);
                    // }
                }
                // var instances = RED.subflow.refresh(true);
                // if (instances) {
                //     subflowInstances = instances.instances;
                // }
                moving_set = [];
                if (removedNodes.length > 0 || removedSubflowOutputs.length > 0 || removedSubflowInputs.length > 0) {
                    RED.nodes.dirty(true);
                }
            }
            if (selected_link) {
                RED.nodes.removeLink(selected_link);
                removedLinks.push(selected_link);
                RED.nodes.dirty(true);
            }
            var historyEvent = {
                t:"delete",
                nodes:removedNodes,
                links:removedLinks,
                subflowOutputs:removedSubflowOutputs,
                subflowInputs:removedSubflowInputs,
                subflow: {
                    instances: subflowInstances
                },
                dirty:startDirty
            };
            // RED.history.push(historyEvent);

            selected_link = null;
            updateActiveNodes();
            updateSelection();
            redraw();
        }
    }

    function copySelection() {
        if (moving_set.length > 0) {
            var nns = [];
            for (var n=0;n<moving_set.length;n++) {
                var node = moving_set[n].n;
                // The only time a node.type == subflow can be selected is the
                // input/output "proxy" nodes. They cannot be copied.
                if (node.type != "subflow") {
                    for (var d in node._def.defaults) {
                        if (node._def.defaults.hasOwnProperty(d)) {
                            if (node._def.defaults[d].type) {
                                var configNode = RED.nodes.node(node[d]);
                                if (configNode && configNode._def.exclusive) {
                                    nns.push(RED.nodes.convertNode(configNode));
                                }
                            }
                        }
                    }
                    nns.push(RED.nodes.convertNode(node));
                    //TODO: if the node has an exclusive config node, it should also be copied, to ensure it remains exclusive...
                }
            }
            clipboard = JSON.stringify(nns);
            // RED.notify(RED._("clipboard.nodeCopied",{count:nns.length}));
        }
    }


    function calculateTextWidth(str, className, offset) {
        return calculateTextDimensions(str,className,offset,0)[0];
    }

    function calculateTextDimensions(str,className,offsetW,offsetH) {
        var sp = document.createElement("span");
        sp.className = className;
        sp.style.position = "absolute";
        sp.style.top = "-1000px";
        sp.textContent = (str||"");
        document.body.appendChild(sp);
        var w = sp.offsetWidth;
        var h = sp.offsetHeight;
        if (w === 0) {
            w = str.length * 6;
        }
        document.body.removeChild(sp);
        return [offsetW+w,offsetH+h];
    }

    function disableQuickJoinEventHandler(evt) {
        // Check for ctrl (all browsers), "Meta" (Chrome/FF), keyCode 91 (Safari)
        if (evt.keyCode === 17 || evt.key === "Meta" || evt.keyCode === 91) {
            if (quickAddActive && drag_lines.length > 0) {
                quickAddLink = drag_lines[0];
            }
            resetMouseVars();
            hideDragLines();
            redraw();
            $(window).off('keyup',disableQuickJoinEventHandler);
        }
    }

    function portMouseUp(d,portType,portIndex) {
        var i;
        if (mouse_mode === RED.state.QUICK_JOINING && drag_lines.length > 0) {
            if (drag_lines[0].node===d) {
                return
            }
        }
        document.body.style.cursor = "";
        if (mouse_mode == RED.state.JOINING || mouse_mode == RED.state.QUICK_JOINING) {
            if (typeof TouchEvent != "undefined" && d3.event instanceof TouchEvent) {
                RED.nodes.eachNode(function(n) {
                    if (n.z == RED.workspaces.active()) {
                        var hw = n.w/2;
                        var hh = n.h/2;
                        if (n.x-hw<mouse_position[0] && n.x+hw> mouse_position[0] &&
                            n.y-hh<mouse_position[1] && n.y+hh>mouse_position[1]) {
                                mouseup_node = n;
                                portType = mouseup_node.inputs>0?PORT_TYPE_INPUT:PORT_TYPE_OUTPUT;
                                portIndex = 0;
                        }
                    }
                });
            } else {
                mouseup_node = d;
            }
            var addedLinks = [];
            var removedLinks = [];

            for (i=0;i<drag_lines.length;i++) {
                if (drag_lines[i].link) {
                    removedLinks.push(drag_lines[i].link)
                }
            }
            for (i=0;i<drag_lines.length;i++) {
                if (portType != drag_lines[i].portType && mouseup_node !== drag_lines[i].node) {
                    var drag_line = drag_lines[i];
                    var src,dst,src_port;
                    if (drag_line.portType === PORT_TYPE_OUTPUT) {
                        src = drag_line.node;
                        src_port = drag_line.port;
                        dst = mouseup_node;
                    } else if (drag_line.portType === PORT_TYPE_INPUT) {
                        src = mouseup_node;
                        dst = drag_line.node;
                        src_port = portIndex;
                    }
                    var existingLink = RED.nodes.filterLinks({source:src,target:dst,sourcePort: src_port}).length !== 0;
                    if (!existingLink) {
                        var link = {source: src, sourcePort:src_port, target: dst};
                        RED.nodes.addLink(link);
                        addedLinks.push(link);
                    }
                }
            }
            if (addedLinks.length > 0 || removedLinks.length > 0) {
                var historyEvent = {
                    t:"add",
                    links:addedLinks,
                    removedLinks: removedLinks,
                    dirty:RED.nodes.dirty()
                };
                if (activeSubflow) {
                    // var subflowRefresh = RED.subflow.refresh(true);
                    // if (subflowRefresh) {
                    //     historyEvent.subflow = {
                    //         id:activeSubflow.id,
                    //         changed: activeSubflow.changed,
                    //         instances: subflowRefresh.instances
                    //     }
                    // }
                }
                // RED.history.push(historyEvent);
                updateActiveNodes();
                RED.nodes.dirty(true);
            }
            if (mouse_mode === RED.state.QUICK_JOINING) {
                if (addedLinks.length > 0) {
                    hideDragLines();
                    if (portType === PORT_TYPE_INPUT && d.outputs > 0) {
                        showDragLines([{node:d,port:0,portType:PORT_TYPE_OUTPUT}]);
                    } else if (portType === PORT_TYPE_OUTPUT && d.inputs > 0) {
                        showDragLines([{node:d,port:0,portType:PORT_TYPE_INPUT}]);
                    } else {
                        resetMouseVars();
                    }
                }
                redraw();
                return;
            }

            resetMouseVars();
            hideDragLines();
            selected_link = null;
            redraw();
        }
    }

    var portLabelHoverTimeout = null;
    var portLabelHover = null;


    function getElementPosition(node) {
        var d3Node = d3.select(node);
        if (d3Node.attr('class') === 'innerCanvas') {
            return [0,0];
        }
        var result = [];
        var localPos = [0,0];
        if (node.nodeName.toLowerCase() === 'g') {
            var transform = d3Node.attr("transform");
            if (transform) {
                localPos = d3.transform(transform).translate;
            }
        } else {
            localPos = [d3Node.attr("x")||0,d3Node.attr("y")||0];
        }
        var parentPos = getElementPosition(node.parentNode);
        return [localPos[0]+parentPos[0],localPos[1]+parentPos[1]]

    }

    function getPortLabel(node,portType,portIndex) {
        var result;
        var nodePortLabels = (portType === PORT_TYPE_INPUT)?node.inputLabels:node.outputLabels;
        if (nodePortLabels && nodePortLabels[portIndex]) {
            return nodePortLabels[portIndex];
        }
        var portLabels = (portType === PORT_TYPE_INPUT)?node._def.inputLabels:node._def.outputLabels;
        if (typeof portLabels === 'string') {
            result = portLabels;
        } else if (typeof portLabels === 'function') {
            try {
                result = portLabels.call(node,portIndex);
            } catch(err) {
                console.log("Definition error: "+node.type+"."+((portType === PORT_TYPE_INPUT)?"inputLabels":"outputLabels"),err);
                result = null;
            }
        } else if ($.isArray(portLabels)) {
            result = portLabels[portIndex];
        }
        return result;
    }
    function portMouseOver(port,d,portType,portIndex) {
        clearTimeout(portLabelHoverTimeout);
        var active = (mouse_mode!=RED.state.JOINING || (drag_lines.length > 0 && drag_lines[0].portType !== portType));
        if (active && ((portType === PORT_TYPE_INPUT && ((d._def && d._def.inputLabels)||d.inputLabels)) || (portType === PORT_TYPE_OUTPUT && ((d._def && d._def.outputLabels)||d.outputLabels)))) {
            portLabelHoverTimeout = setTimeout(function() {
                var tooltip = getPortLabel(d,portType,portIndex);
                if (!tooltip) {
                    return;
                }
                var pos = getElementPosition(port.node());
                portLabelHoverTimeout = null;
                portLabelHover = vis.append("g")
                    .attr("transform","translate("+(pos[0]+(portType===PORT_TYPE_INPUT?-2:12))+","+(pos[1]+5)+")")
                    .attr("class","port_tooltip");
                var lines = tooltip.split("\n");
                var labelWidth = 0;
                var labelHeight = 4;
                var labelHeights = [];
                lines.forEach(function(l) {
                    var labelDimensions = calculateTextDimensions(l, "port_tooltip_label", 8,0);
                    labelWidth = Math.max(labelWidth,labelDimensions[0]);
                    labelHeights.push(0.8*labelDimensions[1]);
                    labelHeight += 0.8*labelDimensions[1];
                });

                var labelHeight1 = (labelHeight/2)-5-2;
                var labelHeight2 = labelHeight - 4;
                portLabelHover.append("path").attr("d",
                    portType===PORT_TYPE_INPUT?
                        "M0 0 l -5 -5 v -"+(labelHeight1)+" q 0 -2 -2 -2 h -"+labelWidth+" q -2 0 -2 2 v "+(labelHeight2)+" q 0 2 2 2 h "+labelWidth+" q 2 0 2 -2 v -"+(labelHeight1)+" l 5 -5"
                        :
                        "M0 0 l 5 -5 v -"+(labelHeight1)+" q 0 -2 2 -2 h "+labelWidth+" q 2 0 2 2 v "+(labelHeight2)+" q 0 2 -2 2 h -"+labelWidth+" q -2 0 -2 -2 v -"+(labelHeight1)+" l -5 -5"
                    );
                var y = -labelHeight/2-2;
                lines.forEach(function(l,i) {
                    y += labelHeights[i];
                    portLabelHover.append("svg:text").attr("class","port_tooltip_label")
                        .attr("x", portType===PORT_TYPE_INPUT?-10:10)
                        .attr("y", y)
                        .attr("text-anchor",portType===PORT_TYPE_INPUT?"end":"start")
                        .text(l)
                });
            },500);
        }
        port.classed("port_hovered",active);
    }
    function portMouseOut(port,d,portType,portIndex) {
        clearTimeout(portLabelHoverTimeout);
        if (portLabelHover) {
            portLabelHover.remove();
            portLabelHover = null;
        }
        port.classed("port_hovered",false);
    }

    function nodeMouseUp(d) {
        if (dblClickPrimed && mousedown_node == d && clickElapsed > 0 && clickElapsed < 750) {
            mouse_mode = RED.state.DEFAULT;
            if (d.type != "subflow") {
                RED.editor.edit(d);
            } else {
                RED.editor.editSubflow(activeSubflow);
            }
            clickElapsed = 0;
            d3.event.stopPropagation();
            return;
        }
        var direction = d._def? (d.inputs > 0 ? 1: 0) : (d.direction == "in" ? 0: 1)
        portMouseUp(d, direction, 0);
    }

    function nodeMouseDown(d) {
        focusView();
        if (d3.event.button === 1) {
            return;
        }
        //var touch0 = d3.event;
        //var pos = [touch0.pageX,touch0.pageY];
        //RED.touch.radialMenu.show(d3.select(this),pos);
        if (mouse_mode == RED.state.IMPORT_DRAGGING) {
            // RED.keyboard.remove("escape");

            if (activeSpliceLink) {
                // TODO: DRY - droppable/nodeMouseDown/canvasMouseUp
                var spliceLink = d3.select(activeSpliceLink).data()[0];
                RED.nodes.removeLink(spliceLink);
                var link1 = {
                    source:spliceLink.source,
                    sourcePort:spliceLink.sourcePort,
                    target: moving_set[0].n
                };
                var link2 = {
                    source:moving_set[0].n,
                    sourcePort:0,
                    target: spliceLink.target
                };
                RED.nodes.addLink(link1);
                RED.nodes.addLink(link2);
                // var historyEvent = // RED.history.peek();
                // historyEvent.links = [link1,link2];
                // historyEvent.removedLinks = [spliceLink];
                updateActiveNodes();
            }

            updateSelection();
            RED.nodes.dirty(true);
            redraw();
            resetMouseVars();
            d3.event.stopPropagation();
            return;
        } else if (mouse_mode == RED.state.QUICK_JOINING) {
            d3.event.stopPropagation();
            return;
        }
        mousedown_node = d;
        var now = Date.now();
        clickElapsed = now-clickTime;
        clickTime = now;

        dblClickPrimed = (lastClickNode == mousedown_node &&
            d3.event.button === 0 &&
            !d3.event.shiftKey && !d3.event.metaKey && !d3.event.altKey && !d3.event.ctrlKey);
        lastClickNode = mousedown_node;

        var i;

        if (d.selected && (d3.event.ctrlKey||d3.event.metaKey)) {
            mousedown_node.selected = false;
            for (i=0;i<moving_set.length;i+=1) {
                if (moving_set[i].n === mousedown_node) {
                    moving_set.splice(i,1);
                    break;
                }
            }
        } else {
            if (d3.event.shiftKey) {
                clearSelection();
                var cnodes = RED.nodes.getAllFlowNodes(mousedown_node);
                for (var n=0;n<cnodes.length;n++) {
                    cnodes[n].selected = true;
                    cnodes[n].dirty = true;
                    moving_set.push({n:cnodes[n]});
                }
            } else if (!d.selected) {
                if (!d3.event.ctrlKey && !d3.event.metaKey) {
                    clearSelection();
                }
                mousedown_node.selected = true;
                moving_set.push({n:mousedown_node});
            }
            selected_link = null;
            if (d3.event.button != 2) {
                mouse_mode = RED.state.MOVING;
                var mouse = d3.touches(this)[0]||d3.mouse(this);
                mouse[0] += d.x-d.w/2;
                mouse[1] += d.y-d.h/2;
                for (i=0;i<moving_set.length;i++) {
                    moving_set[i].ox = moving_set[i].n.x;
                    moving_set[i].oy = moving_set[i].n.y;
                    moving_set[i].dx = moving_set[i].n.x-mouse[0];
                    moving_set[i].dy = moving_set[i].n.y-mouse[1];
                }
                mouse_offset = d3.mouse(document.body);
                if (isNaN(mouse_offset[0])) {
                    mouse_offset = d3.touches(document.body)[0];
                }
            }
        }
        d.dirty = true;
        updateSelection();
        redraw();
        d3.event.stopPropagation();
    }

    function isButtonEnabled(d) {
        var buttonEnabled = true;
        if (d._def.button.hasOwnProperty('enabled')) {
            if (typeof d._def.button.enabled === "function") {
                buttonEnabled = d._def.button.enabled.call(d);
            } else {
                buttonEnabled = d._def.button.enabled;
            }
        }
        return buttonEnabled;
    }

    function redraw() {
        vis.attr("transform","scale("+scaleFactor+")");
        outer.attr("width", space_width*scaleFactor).attr("height", space_height*scaleFactor);

        // Don't bother redrawing nodes if we're drawing links
        if (mouse_mode != RED.state.JOINING) {

            var dirtyNodes = {};

            if (activeSubflow) {
                var subflowOutputs = vis.selectAll(".subflowoutput").data(activeSubflow.out,function(d,i){ return d.id;});
                subflowOutputs.exit().remove();
                var outGroup = subflowOutputs.enter().insert("svg:g").attr("class","node subflowoutput").attr("transform",function(d) { return "translate("+(d.x-20)+","+(d.y-20)+")"});
                outGroup.each(function(d,i) {
                    d.w=40;
                    d.h=40;
                });

                outGroup.append("rect").attr("class","subflowport").attr("rx",8).attr("ry",8).attr("width",40).attr("height",40);
                outGroup.append("g").attr('transform','translate(-5,15)').append("rect").attr("class","port").attr("rx",3).attr("ry",3).attr("width",10).attr("height",10);
                outGroup.append("svg:text").attr("class","port_label").attr("x",20).attr("y",8).style("font-size","10px").text("output");
                outGroup.append("svg:text").attr("class","port_label port_index").attr("x",20).attr("y",24).text(function(d,i){ return i+1});

                var subflowInputs = vis.selectAll(".subflowinput").data(activeSubflow.in,function(d,i){ return d.id;});
                subflowInputs.exit().remove();
                var inGroup = subflowInputs.enter().insert("svg:g").attr("class","node subflowinput").attr("transform",function(d) { return "translate("+(d.x-20)+","+(d.y-20)+")"});
                inGroup.each(function(d,i) {
                    d.w=40;
                    d.h=40;
                });

                inGroup.append("rect").attr("class","subflowport").attr("rx",8).attr("ry",8).attr("width",40).attr("height",40);
                inGroup.append("g").attr('transform','translate(35,15)').append("rect").attr("class","port").attr("rx",3).attr("ry",3).attr("width",10).attr("height",10);
                inGroup.append("svg:text").attr("class","port_label").attr("x",18).attr("y",20).style("font-size","10px").text("input");

                subflowOutputs.each(function(d,i) {
                    if (d.dirty) {
                        var output = d3.select(this);
                        output.selectAll(".subflowport").classed("node_selected",function(d) { return d.selected; })
                        output.selectAll(".port_index").text(function(d){ return d.i+1});
                        output.attr("transform", function(d) { return "translate(" + (d.x-d.w/2) + "," + (d.y-d.h/2) + ")"; });
                        dirtyNodes[d.id] = d;
                        d.dirty = false;
                    }
                });
                subflowInputs.each(function(d,i) {
                    if (d.dirty) {
                        var input = d3.select(this);
                        input.selectAll(".subflowport").classed("node_selected",function(d) { return d.selected; })
                        input.attr("transform", function(d) { return "translate(" + (d.x-d.w/2) + "," + (d.y-d.h/2) + ")"; });
                        dirtyNodes[d.id] = d;
                        d.dirty = false;
                    }
                });
            } else {
                vis.selectAll(".subflowoutput").remove();
                vis.selectAll(".subflowinput").remove();
            }

            var node = vis.selectAll(".nodegroup").data(activeNodes,function(d){return d.id});
            node.exit().remove();
            
            var nodeEnter = node.enter().insert("svg:g")
                .attr("class", "node nodegroup")
                .classed("node_subflow",function(d) { return activeSubflow != null; })
                .classed("node_link",function(d) { return d.type === "link in" || d.type === "link out" });

            nodeEnter.each(function(d,i) {
                    var node = d3.select(this);
                    var isLink = d.type === "link in" || d.type === "link out";
                    node.attr("id",d.id);
                    var l = RED.utils.getNodeLabel(d);
                    if (isLink) {
                        d.w = node_height;
                    } else {
                        d.w = Math.max(node_width,20*(Math.ceil((calculateTextWidth(l, "node_label", 50)+(d._def.inputs>0?7:0))/20)) );
                    }
                    d.h = Math.max(node_height,(d.outputs||0) * 15);

                    if (d._def.badge) {
                        var badge = node.append("svg:g").attr("class","node_badge_group");
                        var badgeRect = badge.append("rect").attr("class","node_badge").attr("rx",5).attr("ry",5).attr("width",40).attr("height",15);
                        badge.append("svg:text").attr("class","node_badge_label").attr("x",35).attr("y",11).attr("text-anchor","end").text(d._def.badge());
                        if (d._def.onbadgeclick) {
                            badgeRect.attr("cursor","pointer")
                                .on("click",function(d) { d._def.onbadgeclick.call(d);d3.event.preventDefault();});
                        }
                    }

                    if (d._def.button) {
                        var nodeButtonGroup = node.append("svg:g")
                            .attr("transform",function(d) { return "translate("+((d._def.align == "right") ? 94 : -25)+",2)"; })
                            .attr("class",function(d) { return "node_button "+((d._def.align == "right") ? "node_right_button" : "node_left_button"); });
                        nodeButtonGroup.append("rect")
                            .attr("rx",5)
                            .attr("ry",5)
                            .attr("width",32)
                            .attr("height",node_height-4)
                            .attr("fill","#eee");//function(d) { return d._def.color;})
                        nodeButtonGroup.append("rect")
                            .attr("class","node_button_button")
                            .attr("x",function(d) { return d._def.align == "right"? 11:5})
                            .attr("y",4)
                            .attr("rx",4)
                            .attr("ry",4)
                            .attr("width",16)
                            .attr("height",node_height-12)
                            .attr("fill",function(d) { return RED.utils.getNodeColor(d.type,d._def); /*d._def.color;*/})
                            .attr("cursor","pointer");
                    }

                    var mainRect = node.append("rect")
                        .attr("class", "node")
                        .classed("node_unknown",function(d) { return d.type == "unknown"; })
                        .attr("rx", 5)
                        .attr("ry", 5)
                        .attr("fill",function(d) { return RED.utils.getNodeColor(d.type,d._def); /*d._def.color;*/});

                    if (d._def.icon) {
                        var icon_url = RED.utils.getNodeIcon(d._def,d);
                        var icon_group = node.append("g")
                            .attr("class","node_icon_group")
                            .attr("x",0).attr("y",0);

                        var icon_shade = icon_group.append("rect")
                            .attr("x",0).attr("y",0)
                            .attr("class","node_icon_shade")
                            .attr("width","30")
                            .attr("stroke","none")
                            .attr("fill","#000")
                            .attr("fill-opacity","0.05")
                            .attr("height",function(d){return Math.min(50,d.h-4);});

                        var icon = icon_group.append("image")
                            .attr("xlink:href",icon_url)
                            .attr("class","node_icon")
                            .attr("x",0)
                            .attr("width","30")
                            .attr("height","30");

                        var icon_shade_border = icon_group.append("path")
                            .attr("d",function(d) { return "M 30 1 l 0 "+(d.h-2)})
                            .attr("class","node_icon_shade_border")
                            .attr("stroke-opacity","0.1")
                            .attr("stroke","#000")
                            .attr("stroke-width","1");

                        if ("right" == d._def.align) {
                            icon_group.attr("class","node_icon_group node_icon_group_"+d._def.align);
                            icon_shade_border.attr("d",function(d) { return "M 0 1 l 0 "+(d.h-2)})
                        }

                        var img = new Image();
                        
                        img.onload = function() {
                            icon.attr("width",Math.min(img.width,30));
                            icon.attr("height",Math.min(img.height,30));
                            icon.attr("x",15-Math.min(img.width,30)/2);
                        }
                        img.src = icon_url;

                        icon_group.style("pointer-events","none");
                    }
                    if (!isLink) {
                        var text = node.append("svg:text").attr("class","node_label").attr("x", 38).attr("dy", ".35em").attr("text-anchor","start");
                        if (d._def.align) {
                            text.attr("class","node_label node_label_"+d._def.align);
                            if (d._def.align === "right") {
                                text.attr("text-anchor","end");
                            }
                        }

                        var status = node.append("svg:g").attr("class","node_status_group").style("display","none");

                        var statusRect = status.append("rect").attr("class","node_status")
                                            .attr("x",6).attr("y",1).attr("width",9).attr("height",9)
                                            .attr("rx",2).attr("ry",2).attr("stroke-width","3");

                        var statusLabel = status.append("svg:text")
                            .attr("class","node_status_label")
                            .attr("x",20).attr("y",9);
                    }

                    node.append("image").attr("class","node_error hidden").attr("xlink:href","icons/node-red/node-error.png").attr("x",0).attr("y",-6).attr("width",10).attr("height",9);
                    node.append("image").attr("class","node_changed hidden").attr("xlink:href","icons/node-red/node-changed.png").attr("x",12).attr("y",-6).attr("width",10).attr("height",10);
            });

            node.each(function(d,i) {
                    if (d.dirty) {
                        var isLink = d.type === "link in" || d.type === "link out";
                        dirtyNodes[d.id] = d;
                        
                        if (!isLink && d.resize) {
                            var l = RED.utils.getNodeLabel(d);
                            var ow = d.w;
                            d.w = Math.max(node_width,20*(Math.ceil((calculateTextWidth(l, "node_label", 50)+(d._def.inputs>0?7:0))/20)) );
                            d.h = Math.max(node_height,(d.outputs||0) * 15);
                            d.x += (d.w-ow)/2;
                            d.resize = false;
                        }
                        var thisNode = d3.select(this);

                        thisNode.attr("transform", function(d) { return "translate(" + (d.x-d.w/2) + "," + (d.y-d.h/2) + ")"; });

                        if (mouse_mode != RED.state.MOVING_ACTIVE) {
                            thisNode.selectAll(".node")
                                .attr("width",function(d){return d.w})
                                .attr("height",function(d){return d.h})
                                .classed("node_selected",function(d) { return d.selected; })
                                .classed("node_highlighted",function(d) { return d.highlighted; })
                            ;

                            thisNode.selectAll(".node_icon_group_right").attr("transform", function(d){return "translate("+(d.w-30)+",0)"});
                            thisNode.selectAll(".node_label_right").attr("x", function(d){return d.w-38});

                            var inputPorts = thisNode.selectAll(".port_input");
                            if (d.inputs === 0 && !inputPorts.empty()) {
                                inputPorts.remove();
                            } else if (d.inputs === 1 && inputPorts.empty()) {
                                var inputGroup = thisNode.append("g").attr("class","port_input");
                                inputGroup.append("rect").attr("class","port").attr("rx",3).attr("ry",3).attr("width",10).attr("height",10);
                            }

                            var numOutputs = d.outputs;
                            var y = (d.h/2)-((numOutputs-1)/2)*13;
                            d.ports = d.ports || d3.range(numOutputs);
                            d._ports = thisNode.selectAll(".port_output").data(d.ports);
                            var output_group = d._ports.enter().append("g").attr("class","port_output");

                            output_group.append("rect").attr("class","port").attr("rx",3).attr("ry",3).attr("width",10).attr("height",10);

                            d._ports.exit().remove();
                            if (d._ports) {
                                numOutputs = d.outputs || 1;
                                y = (d.h/2)-((numOutputs-1)/2)*13;
                                var x = d.w - 5;
                                d._ports.each(function(d,i) {
                                        var port = d3.select(this);
                                        port.attr("transform", function(d) { return "translate("+x+","+((y+13*i)-5)+")";});
                                });
                            }
                            thisNode.selectAll("text.node_label").text(function(d,i){
                                    var l = "";
                                    if (d._def.label) {
                                        l = d._def.label;
                                        try {
                                            l = (typeof l === "function" ? l.call(d) : l)||"";
                                            l = RED.text.bidi.enforceTextDirectionWithUCC(l);
                                        } catch(err) {
                                            console.log("Definition error: "+d.type+".label",err);
                                            l = d.type;
                                        }
                                    }
                                    return l;
                                })
                                .attr("y", function(d){return (d.h/2)-1;})
                                .attr("class",function(d){
                                    var s = "";
                                    if (d._def.labelStyle) {
                                        s = d._def.labelStyle;
                                        try {
                                            s = (typeof s === "function" ? s.call(d) : s)||"";
                                        } catch(err) {
                                            console.log("Definition error: "+d.type+".labelStyle",err);
                                            s = "";
                                        }
                                        s = " "+s;
                                    }
                                    return "node_label"+
                                    (d._def.align?" node_label_"+d._def.align:"")+s;
                            });

                            if (d._def.icon) {
                                var icon = thisNode.select(".node_icon");
                                var current_url = icon.attr("xlink:href");
                                var new_url = RED.utils.getNodeIcon(d._def,d);
                                if (new_url !== current_url) {
                                    icon.attr("xlink:href",new_url);
                                    var img = new Image();
                                    
                                    img.onload = function() {
                                        icon.attr("width",Math.min(img.width,30));
                                        icon.attr("height",Math.min(img.height,30));
                                        icon.attr("x",15-Math.min(img.width,30)/2);
                                    }
                                    img.src = new_url;
                                }
                            }

                            thisNode.selectAll(".node_tools").attr("x",function(d){return d.w-35;}).attr("y",function(d){return d.h-20;});

                            thisNode.selectAll(".node_changed")
                                .attr("x",function(d){return d.w-10})
                                .classed("hidden",function(d) { return !(d.changed||d.moved); });

                            thisNode.selectAll(".node_error")
                                .attr("x",function(d){return d.w-10-((d.changed||d.moved)?13:0)})
                                .classed("hidden",function(d) { return d.valid; });

                            thisNode.selectAll(".port_input").each(function(d,i) {
                                    var port = d3.select(this);
                                    port.attr("transform",function(d){return "translate(-5,"+((d.h/2)-5)+")";})
                            });

                            thisNode.selectAll(".node_icon").attr("y",function(d){return (d.h-d3.select(this).attr("height"))/2;});
                            thisNode.selectAll(".node_icon_shade").attr("height",function(d){return d.h;});
                            thisNode.selectAll(".node_icon_shade_border").attr("d",function(d){ return "M "+(("right" == d._def.align) ?0:30)+" 1 l 0 "+(d.h-2)});

                            thisNode.selectAll(".node_button").attr("opacity",function(d) {
                                return (activeSubflow||!isButtonEnabled(d))?0.4:1
                            });
                            thisNode.selectAll(".node_button_button").attr("cursor",function(d) {
                                return (activeSubflow||!isButtonEnabled(d))?"":"pointer";
                            });
                            thisNode.selectAll(".node_right_button").attr("transform",function(d){
                                    var x = d.w-6;
                                    if (d._def.button.toggle && !d[d._def.button.toggle]) {
                                        x = x - 8;
                                    }
                                    return "translate("+x+",2)";
                            });
                            thisNode.selectAll(".node_right_button rect").attr("fill-opacity",function(d){
                                    if (d._def.button.toggle) {
                                        return d[d._def.button.toggle]?1:0.2;
                                    }
                                    return 1;
                            });

                            thisNode.selectAll(".node_badge_group").attr("transform",function(d){return "translate("+(d.w-40)+","+(d.h+3)+")";});
                            thisNode.selectAll("text.node_badge_label").text(function(d,i) {
                                if (d._def.badge) {
                                    if (typeof d._def.badge == "function") {
                                        try {
                                            return d._def.badge.call(d);
                                        } catch(err) {
                                            console.log("Definition error: "+d.type+".badge",err);
                                            return "";
                                        }
                                    } else {
                                        return d._def.badge;
                                    }
                                }
                                return "";
                            });
                        }

                        if (!showStatus || !d.status) {
                            thisNode.selectAll(".node_status_group").style("display","none");
                        } else {
                            thisNode.selectAll(".node_status_group").style("display","inline").attr("transform","translate(3,"+(d.h+3)+")");
                            var fill = status_colours[d.status.fill]; // Only allow our colours for now
                            if (d.status.shape == null && fill == null) {
                                thisNode.selectAll(".node_status").style("display","none");
                            } else {
                                var style;
                                if (d.status.shape == null || d.status.shape == "dot") {
                                    style = {
                                        display: "inline",
                                        fill: fill,
                                        stroke: fill
                                    };
                                } else if (d.status.shape == "ring" ){
                                    style = {
                                        display: "inline",
                                        fill: "#fff",
                                        stroke: fill
                                    }
                                }
                                thisNode.selectAll(".node_status").style(style);
                            }
                            if (d.status.text) {
                                thisNode.selectAll(".node_status_label").text(d.status.text);
                            } else {
                                thisNode.selectAll(".node_status_label").text("");
                            }
                        }

                        d.dirty = false;
                    }
            });

            var link = vis.selectAll(".link").data(
                activeLinks,
                function(d) {
                    return d.source.id+":"+d.sourcePort+":"+d.target.id+":"+d.target.i;
                }
            );
            var linkEnter = link.enter().insert("g",".node").attr("class","link");

            linkEnter.each(function(d,i) {
                var l = d3.select(this);
                d.added = true;
                l.append("svg:path").attr("class","link_background link_path");
                l.append("svg:path").attr("class","link_outline link_path");
                l.append("svg:path").attr("class","link_line link_path")
                    .classed("link_link", function(d) { return d.link })
                    .classed("link_subflow", function(d) { return !d.link && activeSubflow });
            });

            link.exit().remove();
            var links = vis.selectAll(".link_path");
            links.each(function(d) {
                var link = d3.select(this);
                if (d.added || d===selected_link || d.selected || dirtyNodes[d.source.id] || dirtyNodes[d.target.id]) {
                    link.attr("d",function(d){
                        var numOutputs = d.source.outputs || 1;
                        var sourcePort = d.sourcePort || 0;
                        var y = -((numOutputs-1)/2)*13 +13*sourcePort;
                        d.x1 = d.source.x+d.source.w/2;
                        d.y1 = d.source.y+y;
                        d.x2 = d.target.x-d.target.w/2;
                        d.y2 = d.target.y;

                        return generateLinkPath(d.x1,d.y1,d.x2,d.y2,1);
                    });
                }
            })

            link.classed("link_selected", function(d) { return d === selected_link || d.selected; });
            link.classed("link_unknown",function(d) {
                delete d.added;
                return d.target.type == "unknown" || d.source.type == "unknown"
            });
            var offLinks = vis.selectAll(".link_flow_link_g").data(
                activeFlowLinks,
                function(d) {
                    return d.node.id+":"+d.refresh
                }
            );

            var offLinksEnter = offLinks.enter().insert("g",".node").attr("class","link_flow_link_g");
            offLinksEnter.each(function(d,i) {
                var g = d3.select(this);
                var s = 1;
                var labelAnchor = "start";
                if (d.node.type === "link in") {
                    s = -1;
                    labelAnchor = "end";
                }
                var stemLength = s*30;
                var branchLength = s*20;
                var l = g.append("svg:path").attr("class","link_flow_link")
                        .attr("class","link_link").attr("d","M 0 0 h "+stemLength);
                var links = d.links;
                var flows = Object.keys(links);
                var tabOrder = RED.nodes.getWorkspaceOrder();
                flows.sort(function(A,B) {
                    return tabOrder.indexOf(A) - tabOrder.indexOf(B);
                });
                var linkWidth = 10;
                var h = node_height;
                var y = -(flows.length-1)*h/2;
                var linkGroups = g.selectAll(".link_group").data(flows);
                var enterLinkGroups = linkGroups.enter().append("g").attr("class","link_group");
                enterLinkGroups.each(function(f) {
                    var linkG = d3.select(this);
                    linkG.append("svg:path").attr("class","link_flow_link")
                        .attr("class","link_link")
                        .attr("d",
                            "M "+stemLength+" 0 "+
                            "C "+(stemLength+(1.7*branchLength))+" "+0+
                            " "+(stemLength+(0.1*branchLength))+" "+y+" "+
                            (stemLength+branchLength*1.5)+" "+y+" "
                        );
                    linkG.append("svg:path")
                        .attr("class","link_port")
                        .attr("d",
                            "M "+(stemLength+branchLength*1.5+s*(linkWidth+7))+" "+(y-12)+" "+
                            "h "+(-s*linkWidth)+" "+
                            "a 3 3 45 0 "+(s===1?"0":"1")+" "+(s*-3)+" 3 "+
                            "v 18 "+
                            "a 3 3 45 0 "+(s===1?"0":"1")+" "+(s*3)+" 3 "+
                            "h "+(s*linkWidth)
                        );
                    linkG.append("svg:path")
                        .attr("class","link_port")
                        .attr("d",
                            "M "+(stemLength+branchLength*1.5+s*(linkWidth+10))+" "+(y-12)+" "+
                            "h "+(s*(linkWidth*3))+" "+
                            "M "+(stemLength+branchLength*1.5+s*(linkWidth+10))+" "+(y+12)+" "+
                            "h "+(s*(linkWidth*3))
                        ).style("stroke-dasharray","12 3 8 4 3");
                    linkG.append("rect").attr("class","port link_port")
                        .attr("x",stemLength+branchLength*1.5-4+(s*4))
                        .attr("y",y-4)
                        .attr("rx",2)
                        .attr("ry",2)
                        .attr("width",8)
                        .attr("height",8);
                    linkG.append("rect")
                        .attr("x",stemLength+branchLength*1.5-(s===-1?node_width:0))
                        .attr("y",y-12)
                        .attr("width",node_width)
                        .attr("height",24)
                        .style("stroke","none")
                        .style("fill","transparent")
                    var tab = RED.nodes.workspace(f);
                    var label;
                    if (tab) {
                        label = tab.label || tab.id;
                    }
                    linkG.append("svg:text")
                        .attr("class","port_label")
                        .attr("x",stemLength+branchLength*1.5+(s*15))
                        .attr("y",y+1)
                        .style("font-size","10px")
                        .style("text-anchor",labelAnchor)
                        .text(label);

                    y += h;
                });
                linkGroups.exit().remove();
            });
            offLinks.exit().remove();
            offLinks = vis.selectAll(".link_flow_link_g");
            offLinks.each(function(d) {
                var s = 1;
                if (d.node.type === "link in") {
                    s = -1;
                }
                var link = d3.select(this);
                link.attr("transform", function(d) { return "translate(" + (d.node.x+(s*d.node.w/2)) + "," + (d.node.y) + ")"; });

            })

        } else {
            // JOINING - unselect any selected links
            vis.selectAll(".link_selected").data(
                activeLinks,
                function(d) {
                    return d.source.id+":"+d.sourcePort+":"+d.target.id+":"+d.target.i;
                }
            ).classed("link_selected", false);
        }
        
        if (d3.event) {
            d3.event.preventDefault();
        }

        return SvgSaver.svgAsDataUri(outer[0][0]);
    }

    return {
        init: updateActiveNodes,
        redraw: function(updateActive) {
            if (updateActive) {
                updateActiveNodes();
            }
            return redraw();
        },
        calculateTextWidth: calculateTextWidth,
        select: function(selection) {
            if (typeof selection !== "undefined") {
                clearSelection();
                if (typeof selection == "string") {
                    var selectedNode = RED.nodes.node(selection);
                    if (selectedNode) {
                        selectedNode.selected = true;
                        selectedNode.dirty = true;
                        moving_set = [{n:selectedNode}];
                    }
                }
            }
            updateSelection();
            redraw();
        },
        selection: function() {
            var selection = {};
            if (moving_set.length > 0) {
                selection.nodes = moving_set.map(function(n) { return n.n;});
            }
            if (selected_link != null) {
                selection.link = selected_link;
            }
            return selection;
        },
        scale: function() {
            return scaleFactor;
        },
        getLinksAtPoint: function(x,y) {
            var result = [];
            var links = outer.selectAll(".link_background")[0];
            for (var i=0;i<links.length;i++) {
                var bb = links[i].getBBox();
                if (x >= bb.x && y >= bb.y && x <= bb.x+bb.width && y <= bb.y+bb.height) {
                    result.push(links[i])
                }
            }
            return result;
        },
        reveal: function(id) {
            if (RED.nodes.workspace(id) || RED.nodes.subflow(id)) {
                RED.workspaces.show(id);
            } else {
                var node = RED.nodes.node(id);
                if (node._def.category !== 'config' && node.z) {
                    node.highlighted = true;
                    node.dirty = true;
                    RED.workspaces.show(node.z);

                    var screenSize = [$("#chart").width(),$("#chart").height()];
                    var scrollPos = [$("#chart").scrollLeft(),$("#chart").scrollTop()];

                    if (node.x < scrollPos[0] || node.y < scrollPos[1] || node.x > screenSize[0]+scrollPos[0] || node.y > screenSize[1]+scrollPos[1]) {
                        var deltaX = '-='+((scrollPos[0] - node.x) + screenSize[0]/2);
                        var deltaY = '-='+((scrollPos[1] - node.y) + screenSize[1]/2);
                        $("#chart").animate({
                            scrollLeft: deltaX,
                            scrollTop: deltaY
                        },200);
                    }

                    if (!node._flashing) {
                        node._flashing = true;
                        var flash = 22;
                        var flashFunc = function() {
                            flash--;
                            node.dirty = true;
                            if (flash >= 0) {
                                node.highlighted = !node.highlighted;
                                setTimeout(flashFunc,100);
                            } else {
                                node.highlighted = false;
                                delete node._flashing;
                            }
                            RED.view.redraw();
                        }
                        flashFunc();
                    }
                } else if (node._def.category === 'config') {
                    // RED.sidebar.config.show(id);
                }
            }
        },
        gridSize: function(v) {
            if (v === undefined) {
                return gridSize;
            } else {
                gridSize = Math.max(5,v);
                updateGrid();
            }
        },
        getActiveNodes: function() {
            return activeNodes;
        }
    };
})();
