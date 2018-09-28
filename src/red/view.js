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

import { JSDOM } from 'jsdom';
import d3 from 'd3';
import RED from './red';

RED.view = (function() {
    const { window } = new JSDOM('<div id="chart"></div>');
    const document = window.document;
    const Image = window.Image;

    var space_width = 5000,
        space_height = 5000,
        lineCurveScale = 0.75,
        scaleFactor = 1,
        node_width = 100,
        node_height = 30;

    var gridSize = 20;

    var activeSubflow = null;
    var activeNodes = [];
    var activeLinks = [];
    var activeFlowLinks = [];

    var selected_link = null,
        mouse_mode = 0,
        showStatus = false;

    var status_colours = {
        "red":    "#c00",
        "green":  "#5a8",
        "yellow": "#F9DF31",
        "blue":   "#53A3F3",
        "grey":   "#d3d3d3"
    }

    var chart = window.document.querySelector("#chart");

    var outer = d3.select(chart)
        .append("svg:svg")
        .attr("width", space_width)
        .attr("height", space_height)
        .attr("pointer-events", "all")
        .style("cursor","crosshair");

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

    function updateActiveNodes() {
        var activeWorkspace = RED.workspaces.active();
        var tabs = RED.workspaces.tabs();
        if (tabs[activeWorkspace] && tabs[activeWorkspace].type === 'subflow') {
            activeSubflow = RED.nodes.subflow(tabs[activeWorkspace].id);
        } else {
            activeSubflow = 0;
        }
        activeNodes = RED.nodes.filterNodes({z:activeWorkspace});
        activeLinks = RED.nodes.filterLinks({
            source:{z:activeWorkspace},
            target:{z:activeWorkspace}
        });
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

    function calculateTextWidth(str, className, offset) {
        return calculateTextDimensions(str,className,offset,0)[0];
    }

    function calculateTextDimensions(str,className,offsetW,offsetH) {
        // TODO: simplify
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

        return outer[0][0];
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
    };
})();
