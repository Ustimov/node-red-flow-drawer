module.exports = (function () {

    let RED;

    function register() {
        RED.nodes.registerType('sentiment',{
            category: 'analysis-function',
            color:"#E6E0F8",
            defaults: {
                name: {value:""},
                property: {value:"payload",required:true}
            },
            inputs:1,
            outputs:1,
            icon: "arrow-in.png",
            label: function() {
                return this.name||"sentiment";
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            oneditprepare: function() {
                if (this.property === undefined) {
                    $("#node-input-property").val("payload");
                }
                $("#node-input-property").typedInput({default:'msg',types:['msg']});
            }
        });

        RED.nodes.registerType('inject',{
            category: 'input',
            color:"#a6bbcf",
            defaults: {
                name: {value:""},
                topic: {value:""},
                payload: {value:""},
                payloadType: {value:"date"},
                repeat: {value:""},
                crontab: {value:""},
                once: {value:false},
                onceDelay: {value:0.1}
            },
            icon: "inject.png",
            inputs:0,
            outputs:1,
            outputLabels: function(index) {
                var labels = { str:"string", num:"number", bool:"boolean", json:"object", flow:"flow context", global:"global context" };
                var lab = labels[this.payloadType] || this.payloadType;
                if (lab === "object") {
                    try {
                        lab = typeof JSON.parse(this.payload);
                        if (lab === "object") {
                            if (Array.isArray(JSON.parse(this.payload))) { lab = "Array"; }
                        }
                    } catch(e) { lab = "Invalid JSON Object"; }
                }
                return lab; },
            label: function() {
                var suffix = "";
                // if fire once then add small indication
                if (this.once) {
                    suffix = " ¹";
                }
                // but replace with repeat one if set to repeat
                if ((this.repeat && this.repeat != 0) || this.crontab) {
                    suffix = " ↻";
                }
                if (this.name) {
                    return this.name+suffix;
                } else if (this.payloadType === "string" ||
                        this.payloadType === "str" ||
                        this.payloadType === "num" ||
                        this.payloadType === "bool" ||
                        this.payloadType === "json") {
                    if ((this.topic !== "") && ((this.topic.length + this.payload.length) <= 32)) {
                        return this.topic + ":" + this.payload+suffix;
                    } else if (this.payload.length > 0 && this.payload.length < 24) {
                        return this.payload+suffix;
                    } else {
                        return this._("inject.inject")+suffix;
                    }
                } else if (this.payloadType === 'date') {
                    if ((this.topic !== "") && (this.topic.length <= 16)) {
                        return this.topic + ":" + this._("inject.timestamp")+suffix;
                    } else {
                        return this._("inject.timestamp")+suffix;
                    }
                } else if (this.payloadType === 'flow' || this.payloadType === 'global') {
                    var key = RED.utils.parseContextKey(this.payload);
                    return this.payloadType+"."+key.key+suffix;
                } else {
                    return this._("inject.inject")+suffix;
                }
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            oneditprepare: function() {
                if (this.payloadType == null) {
                    if (this.payload == "") {
                        this.payloadType = "date";
                    } else {
                        this.payloadType = "str";
                    }
                } else if (this.payloadType === 'string' || this.payloadType === 'none') {
                    this.payloadType = "str";
                }
                $("#node-input-payloadType").val(this.payloadType);

                $("#node-input-payload").typedInput({
                    default: 'str',
                    typeField: $("#node-input-payloadType"),
                    types:['flow','global','str','num','bool','json','bin','date','env']
                });

                $("#inject-time-type-select").change(function() {
                    $("#node-input-crontab").val('');
                    var id = $("#inject-time-type-select").val();
                    $(".inject-time-row").hide();
                    $("#inject-time-row-"+id).show();
                    if ((id == "none") || (id == "interval") || (id == "interval-time")) {
                        $("#node-once").show();
                    }
                    else {
                        $("#node-once").hide();
                        $("#node-input-once").prop('checked', false);
                    }
                });

                $("#node-input-once").change(function() {
                    $("#node-input-onceDelay").attr('disabled', !$("#node-input-once").prop('checked'));
                })

                $(".inject-time-times").each(function() {
                    for (var i=0; i<24; i++) {
                        var l = (i<10?"0":"")+i+":00";
                        $(this).append($("<option></option>").val(i).text(l));
                    }
                });
                $("<option></option>").val(24).text("00:00").appendTo("#inject-time-interval-time-end");
                $("#inject-time-interval-time-start").change(function() {
                    var start = Number($("#inject-time-interval-time-start").val());
                    var end = Number($("#inject-time-interval-time-end").val());
                    $("#inject-time-interval-time-end option").remove();
                    for (var i=start+1; i<25; i++) {
                        var l = (i<10?"0":"")+i+":00";
                        if (i==24) {
                            l = "00:00";
                        }
                        var opt = $("<option></option>").val(i).text(l).appendTo("#inject-time-interval-time-end");
                        if (i === end) {
                            opt.attr("selected","selected");
                        }
                    }
                });

                $(".inject-time-count").spinner({
                    //max:60,
                    min:1
                });

                var repeattype = "none";
                if (this.repeat != "" && this.repeat != 0) {
                    repeattype = "interval";
                    var r = "s";
                    var c = this.repeat;
                    if (this.repeat % 60 === 0) { r = "m"; c = c/60; }
                    if (this.repeat % 1440 === 0) { r = "h"; c = c/60; }
                    $("#inject-time-interval-count").val(c);
                    $("#inject-time-interval-units").val(r);
                    $("#inject-time-interval-days").prop("disabled","disabled");
                } else if (this.crontab) {
                    var cronparts = this.crontab.split(" ");
                    var days = cronparts[4];
                    if (!isNaN(cronparts[0]) && !isNaN(cronparts[1])) {
                        repeattype = "time";
                        // Fixed time
                        var time = cronparts[1]+":"+cronparts[0];
                        $("#inject-time-time").val(time);
                        $("#inject-time-type-select").val("s");
                        if (days == "*") {
                            $("#inject-time-time-days input[type=checkbox]").prop("checked",true);
                        } else {
                            $("#inject-time-time-days input[type=checkbox]").removeAttr("checked");
                            days.split(",").forEach(function(v) {
                                $("#inject-time-time-days [value=" + v + "]").prop("checked", true);
                            });
                        }
                    } else {
                        repeattype = "interval-time";
                        // interval - time period
                        var minutes = cronparts[0].slice(2);
                        if (minutes === "") { minutes = "0"; }
                        $("#inject-time-interval-time-units").val(minutes);
                        if (days == "*") {
                            $("#inject-time-interval-time-days input[type=checkbox]").prop("checked",true);
                        } else {
                            $("#inject-time-interval-time-days input[type=checkbox]").removeAttr("checked");
                            days.split(",").forEach(function(v) {
                                $("#inject-time-interval-time-days [value=" + v + "]").prop("checked", true);
                            });
                        }
                        var time = cronparts[1];
                        var timeparts = time.split(",");
                        var start;
                        var end;
                        if (timeparts.length == 1) {
                            // 0 or 0-10
                            var hours = timeparts[0].split("-");
                            if (hours.length == 1) {
                                if (hours[0] === "") {
                                    start = "0";
                                    end = "0";
                                }
                                else {
                                    start = hours[0];
                                    end = Number(hours[0])+1;
                                }
                            } else {
                                start = hours[0];
                                end = Number(hours[1])+1;
                            }
                        } else {
                            // 23,0 or 17-23,0-10 or 23,0-2 or 17-23,0
                            var startparts = timeparts[0].split("-");
                            start = startparts[0];

                            var endparts = timeparts[1].split("-");
                            if (endparts.length == 1) {
                                end = Number(endparts[0])+1;
                            } else {
                                end = Number(endparts[1])+1;
                            }
                        }
                        $("#inject-time-interval-time-end").val(end);
                        $("#inject-time-interval-time-start").val(start);

                    }
                } else {
                    $("#inject-time-type-select").val("none");
                }

                $(".inject-time-row").hide();
                $("#inject-time-type-select").val(repeattype);
                $("#inject-time-row-"+repeattype).show();

                $("#node-input-payload").typedInput('type',this.payloadType);

                $("#inject-time-type-select").change();
                $("#inject-time-interval-time-start").change();

            },
            oneditsave: function() {
                var repeat = "";
                var crontab = "";
                var type = $("#inject-time-type-select").val();
                if (type == "none") {
                    // nothing
                } else if (type == "interval") {
                    var count = $("#inject-time-interval-count").val();
                    var units = $("#inject-time-interval-units").val();
                    if (units == "s") {
                        repeat = count;
                    } else {
                        if (units == "m") {
                            //crontab = "*/"+count+" * * * "+days;
                            repeat = count * 60;
                        } else if (units == "h") {
                            //crontab = "0 */"+count+" * * "+days;
                            repeat = count * 60 * 60;
                        }
                    }
                } else if (type == "interval-time") {
                    repeat = "";
                    var count = $("#inject-time-interval-time-units").val();
                    var startTime = Number($("#inject-time-interval-time-start").val());
                    var endTime = Number($("#inject-time-interval-time-end").val());
                    var days = $('#inject-time-interval-time-days input[type=checkbox]:checked').map(function(_, el) {
                        return $(el).val()
                    }).get();
                    if (days.length == 0) {
                        crontab = "";
                    } else {
                        if (days.length == 7) {
                            days="*";
                        } else {
                            days = days.join(",");
                        }
                        var timerange = "";
                        if (endTime == 0) {
                            timerange = startTime+"-23";
                        } else if (startTime+1 < endTime) {
                            timerange = startTime+"-"+(endTime-1);
                        } else if (startTime+1 == endTime) {
                            timerange = startTime;
                        } else {
                            var startpart = "";
                            var endpart = "";
                            if (startTime == 23) {
                                startpart = "23";
                            } else {
                                startpart = startTime+"-23";
                            }
                            if (endTime == 1) {
                                endpart = "0";
                            } else {
                                endpart = "0-"+(endTime-1);
                            }
                            timerange = startpart+","+endpart;
                        }
                        if (count === "0") {
                            crontab = count+" "+timerange+" * * "+days;
                        } else {
                            crontab = "*/"+count+" "+timerange+" * * "+days;
                        }
                    }
                } else if (type == "time") {
                    var time = $("#inject-time-time").val();
                    var days = $('#inject-time-time-days  input[type=checkbox]:checked').map(function(_, el) {
                        return $(el).val()
                    }).get();
                    if (days.length == 0) {
                        crontab = "";
                    } else {
                        if (days.length == 7) {
                            days="*";
                        } else {
                            days = days.join(",");
                        }
                        var parts = time.split(":");
                        if (parts.length === 2) {
                            repeat = "";
                            parts[1] = ("00" + (parseInt(parts[1]) % 60)).substr(-2);
                            parts[0] = ("00" + (parseInt(parts[0]) % 24)).substr(-2);
                            crontab = parts[1]+" "+parts[0]+" * * "+days;
                        }
                        else { crontab = ""; }
                    }
                }

                $("#node-input-repeat").val(repeat);
                $("#node-input-crontab").val(crontab);
            },
            button: {
                enabled: function() {
                    return !this.changed
                },
                onclick: function() {
                    if (this.changed) {
                        return RED.notify(RED._("notification.warning", {message:RED._("notification.warnings.undeployedChanges")}),"warning");
                    }
                    var payload = this.payload;
                    if ((this.payloadType === 'flow') ||
                        (this.payloadType === 'global')) {
                        var key = RED.utils.parseContextKey(payload);
                        payload = this.payloadType+"."+key.key;
                    }
                    var label = (this.name||payload);
                    if (label.length > 30) {
                        label = label.substring(0,50)+"...";
                    }
                    label = label.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

                    if (this.payloadType === "date") { label = this._("inject.timestamp"); }
                    if (this.payloadType === "none") { label = this._("inject.blank"); }
                    var node = this;
                    $.ajax({
                        url: "inject/"+this.id,
                        type:"POST",
                        success: function(resp) {
                            RED.notify(node._("inject.success",{label:label}),"success");
                        },
                        error: function(jqXHR,textStatus,errorThrown) {
                            if (jqXHR.status == 404) {
                                RED.notify(node._("common.notification.error",{message:node._("common.notification.errors.not-deployed")}),"error");
                            } else if (jqXHR.status == 500) {
                                RED.notify(node._("common.notification.error",{message:node._("inject.errors.failed")}),"error");
                            } else if (jqXHR.status == 0) {
                                RED.notify(node._("common.notification.error",{message:node._("common.notification.errors.no-response")}),"error");
                            } else {
                                RED.notify(node._("common.notification.error",{message:node._("common.notification.errors.unexpected",{status:jqXHR.status,message:textStatus})}),"error");
                            }
                        }
                    });
                }
            }
        });

        RED.nodes.registerType('catch',{
            category: 'input',
            color:"#e49191",
            defaults: {
                name: {value:""},
                scope: {value:null}
            },
            inputs:0,
            outputs:1,
            icon: "alert.png",
            label: function() {
                return this.name||(this.scope?this._("catch.catchNodes",{number:this.scope.length}):this._("catch.catch"));
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            oneditprepare: function() {
                var nodeList = $("#node-input-catch-target-container");
                var node = this;
                this.resize = function() {
                    var rows = $("#dialog-form>div:not(.node-input-target-row)");
                    var height = $("#dialog-form").height();
                    for (var i=0;i<rows.size();i++) {
                        height -= $(rows[i]).outerHeight(true);
                    }
                    var editorRow = $("#dialog-form>div.node-input-target-row");
                    height -= (parseInt(editorRow.css("marginTop"))+parseInt(editorRow.css("marginBottom")));
                    $("#node-input-catch-target-container-div").css("height",height+"px");
                };

                function createNodeList() {
                    var scope = node.scope || [];
                    nodeList.empty();

                    var candidateNodes = RED.nodes.filterNodes({z:node.z});
                    var allChecked = true;

                    candidateNodes.forEach(function(n) {
                        if (n.id === node.id) {
                            return;
                        }
                        var isChecked = scope.indexOf(n.id) !== -1;

                        allChecked = allChecked && isChecked;

                        var container = $('<li/>',{class:"node-input-target-node"});
                        var row = $('<label/>',{for:"node-input-target-node-"+n.id}).appendTo(container);
                        $('<input>',{type:"checkbox",class:"node-input-target-node-checkbox",id:"node-input-target-node-"+n.id})
                            .data('node-id',n.id)
                            .prop('checked', isChecked)
                            .appendTo(row);
                        container.on('mouseover',function(e) {
                            n.highlighted = true;
                            n.dirty = true;
                            RED.view.redraw();
                        });
                        container.on('mouseout',function(e) {
                            n.highlighted = false;
                            n.dirty = true;
                            RED.view.redraw();
                        });
                        var labelSpan = $('<span>');
                        var nodeDef = RED.nodes.getType(n.type);
                        var label;
                        var sublabel;
                        if (nodeDef) {
                            var l = nodeDef.label;
                            label = (typeof l === "function" ? l.call(n) : l)||"";
                            sublabel = n.type;
                            if (sublabel.indexOf("subflow:") === 0) {
                                var subflowId = sublabel.substring(8);
                                var subflow = RED.nodes.subflow(subflowId);
                                sublabel = "subflow : "+subflow.name;
                            }
                        }
                        if (!nodeDef || !label) {
                            label = n.type;
                        }
                        $('<span>',{class:"node-input-target-node-label",style:"white-space:nowrap"}).text(label).appendTo(row);
                        if (sublabel) {
                            $('<span>',{class:"node-input-target-node-sublabel"}).text(sublabel).appendTo(row);
                        }

                        container.appendTo(nodeList);
                    });

                    $(".node-input-target-node-checkbox").change(function() {
                        if (!this.checked) {
                            $("#node-input-target-node-checkbox-all").prop('checked',false);
                        }
                    });

                    $("#node-input-target-node-checkbox-all").prop('checked',allChecked);

                    sortNodeList('label');
                }

                function sortNodeList(sortOn) {
                    var currentSort = nodeList.data('currentSort');
                    var currentSortOrder = nodeList.data('currentSortOrder');

                    if (!currentSort) {
                        currentSort = sortOn;
                        currentSortOrder = 'a';
                    } else {
                        if (currentSort === sortOn) {
                            currentSortOrder = (currentSortOrder === 'a'?'d':'a');
                        } else {
                            currentSortOrder = 'a';
                        }
                        currentSort = sortOn;
                    }
                    nodeList.data('currentSort',currentSort);
                    nodeList.data('currentSortOrder',currentSortOrder);

                    $("#node-input-catch-target-container-div .fa").hide();
                    $(".node-input-catch-sort-"+currentSort+"-"+currentSortOrder).show();


                    var items = nodeList.find("li").get();
                    items.sort(function(a,b) {
                        var labelA = $(a).find(".node-input-target-node-"+currentSort).text().toLowerCase();
                        var labelB = $(b).find(".node-input-target-node-"+currentSort).text().toLowerCase();
                        if (labelA < labelB) { return currentSortOrder==='a'?-1:1; }
                        if (labelA > labelB) { return currentSortOrder==='a'?1:-1; }
                        return 0;
                    });
                    $.each(items, function(i, li){
                        nodeList.append(li);
                    });
                }
                $("#node-input-target-sort-label").click(function(e) {
                    e.preventDefault();
                    sortNodeList('label');
                });

                $("#node-input-target-sort-type").click(function(e) {
                    e.preventDefault();
                    sortNodeList('sublabel');
                });
                $("#node-input-target-node-checkbox-all").change(function() {
                    $(".node-input-target-node-checkbox").prop('checked',this.checked);
                });



                $("#node-input-scope-select").change(function(e) {
                    var scope = $(this).val();
                    if (scope === "target") {
                        createNodeList();
                        $(".node-input-target-row").show();
                    } else {
                        $(".node-input-target-row").hide();
                    }
                    node.resize();
                });
                if (this.scope === null) {
                    $("#node-input-scope-select").val("all");
                } else {
                    $("#node-input-scope-select").val("target");
                }
                $("#node-input-scope-select").change();
            },
            oneditsave: function() {
                var scope = $("#node-input-scope-select").val();
                if (scope === 'all') {
                    this.scope = null;
                } else {
                    var node = this;
                    node.scope = [];
                    $(".node-input-target-node-checkbox").each(function(n) {
                        if ($(this).prop("checked")) {
                            node.scope.push($(this).data('node-id'));
                        }
                    });
                }
            },
            oneditresize: function(size) {
                this.resize();
            }
        });

        RED.nodes.registerType('status',{
            category: 'input',
            color:"#c0edc0",
            defaults: {
                name: {value:""},
                scope: {value:null}
            },
            inputs:0,
            outputs:1,
            icon: "alert.png",
            label: function() {
                return this.name||(this.scope?this._("status.statusNodes",{number:this.scope.length}):this._("status.status"));
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            oneditprepare: function() {
                var nodeList = $("#node-input-status-target-container");
                var node = this;
                this.resize = function() {
                    var rows = $("#dialog-form>div:not(.node-input-target-row)");
                    var height = $("#dialog-form").height();
                    for (var i=0;i<rows.size();i++) {
                        height -= $(rows[i]).outerHeight(true);
                    }
                    var editorRow = $("#dialog-form>div.node-input-target-row");
                    height -= (parseInt(editorRow.css("marginTop"))+parseInt(editorRow.css("marginBottom")));
                    $("#node-input-status-target-container-div").css("height",height+"px");
                };

                function createNodeList() {
                    var scope = node.scope || [];
                    nodeList.empty();

                    var candidateNodes = RED.nodes.filterNodes({z:node.z});
                    var allChecked = true;

                    candidateNodes.forEach(function(n) {
                        if (n.id === node.id) {
                            return;
                        }
                        var isChecked = scope.indexOf(n.id) !== -1;

                        allChecked = allChecked && isChecked;

                        var container = $('<li/>',{class:"node-input-target-node"});
                        var row = $('<label/>',{for:"node-input-target-node-"+n.id}).appendTo(container);
                        $('<input>',{type:"checkbox",class:"node-input-target-node-checkbox",id:"node-input-target-node-"+n.id})
                            .data('node-id',n.id)
                            .prop('checked', isChecked)
                            .appendTo(row);
                        container.on('mouseover',function(e) {
                            n.highlighted = true;
                            n.dirty = true;
                            RED.view.redraw();
                        });
                        container.on('mouseout',function(e) {
                            n.highlighted = false;
                            n.dirty = true;
                            RED.view.redraw();
                        });
                        var labelSpan = $('<span>');
                        var nodeDef = RED.nodes.getType(n.type);
                        var label;
                        var sublabel;
                        if (nodeDef) {
                            var l = nodeDef.label;
                            label = (typeof l === "function" ? l.call(n) : l)||"";
                            sublabel = n.type;
                            if (sublabel.indexOf("subflow:") === 0) {
                                var subflowId = sublabel.substring(8);
                                var subflow = RED.nodes.subflow(subflowId);
                                sublabel = "subflow : "+subflow.name;
                            }
                        }
                        if (!nodeDef || !label) {
                            label = n.type;
                        }
                        $('<span>',{class:"node-input-target-node-label",style:"white-space:nowrap"}).text(label).appendTo(row);
                        if (sublabel) {
                            $('<span>',{class:"node-input-target-node-sublabel"}).text(sublabel).appendTo(row);
                        }

                        container.appendTo(nodeList);
                    });

                    $(".node-input-target-node-checkbox").change(function() {
                        if (!this.checked) {
                            $("#node-input-target-node-checkbox-all").prop('checked',false);
                        }
                    });

                    $("#node-input-target-node-checkbox-all").prop('checked',allChecked);

                    sortNodeList('label');
                }

                function sortNodeList(sortOn) {
                    var currentSort = nodeList.data('currentSort');
                    var currentSortOrder = nodeList.data('currentSortOrder');

                    if (!currentSort) {
                        currentSort = sortOn;
                        currentSortOrder = 'a';
                    } else {
                        if (currentSort === sortOn) {
                            currentSortOrder = (currentSortOrder === 'a'?'d':'a');
                        } else {
                            currentSortOrder = 'a';
                        }
                        currentSort = sortOn;
                    }
                    nodeList.data('currentSort',currentSort);
                    nodeList.data('currentSortOrder',currentSortOrder);

                    $("#node-input-status-target-container-div .fa").hide();
                    $(".node-input-status-sort-"+currentSort+"-"+currentSortOrder).show();


                    var items = nodeList.find("li").get();
                    items.sort(function(a,b) {
                        var labelA = $(a).find(".node-input-target-node-"+currentSort).text().toLowerCase();
                        var labelB = $(b).find(".node-input-target-node-"+currentSort).text().toLowerCase();
                        if (labelA < labelB) { return currentSortOrder==='a'?-1:1; }
                        if (labelA > labelB) { return currentSortOrder==='a'?1:-1; }
                        return 0;
                    });
                    $.each(items, function(i, li) {
                        nodeList.append(li);
                    });
                }
                $("#node-input-target-sort-label").click(function(e) {
                    e.preventDefault();
                    sortNodeList('label');
                });

                $("#node-input-target-sort-type").click(function(e) {
                    e.preventDefault();
                    sortNodeList('sublabel');
                });
                $("#node-input-target-node-checkbox-all").change(function() {
                    $(".node-input-target-node-checkbox").prop('checked',this.checked);
                });

                $("#node-input-scope-select").change(function(e) {
                    var scope = $(this).val();
                    if (scope === "target") {
                        createNodeList();
                        $(".node-input-target-row").show();
                    } else {
                        $(".node-input-target-row").hide();
                    }
                    node.resize();
                });
                if (this.scope === null) {
                    $("#node-input-scope-select").val("all");
                } else {
                    $("#node-input-scope-select").val("target");
                }
                $("#node-input-scope-select").change();
            },
            oneditsave: function() {
                var scope = $("#node-input-scope-select").val();
                if (scope === 'all') {
                    this.scope = null;
                } else {
                    var node = this;
                    node.scope = [];
                    $(".node-input-target-node-checkbox").each(function(n) {
                        if ($(this).prop("checked")) {
                            node.scope.push($(this).data('node-id'));
                        }
                    });
                }
            },
            oneditresize: function(size) {
                this.resize();
            }
        });

        RED.nodes.registerType('debug',{
            category: 'output',
            defaults: {
                name: {value:""},
                active: {value:true},
                tosidebar: {value:true},
                console: {value:false},
                tostatus: {value:false},
                complete: {value:"false", required:true}
            },
            label: function() {
                var suffix = "";
                if (this.console === true || this.console === "true") { suffix = " ⇲"; }
                if (this.complete === true || this.complete === "true") {
                    return (this.name||"msg") + suffix;
                } else {
                    return (this.name || "msg." + ((!this.complete || this.complete === "false") ? "payload" : this.complete)) + suffix;
                }
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            color:"#87a980",
            inputs:1,
            outputs:0,
            icon: "debug.png",
            align: "right",
            button: {
                toggle: "active",
                onclick: function() {
                    var label = this.name||"debug";
                    var node = this;
                    $.ajax({
                        url: "debug/"+this.id+"/"+(this.active?"enable":"disable"),
                        type: "POST",
                        success: function(resp, textStatus, xhr) {
                            var historyEvent = {
                                t:'edit',
                                node:node,
                                changes:{
                                    active: !node.active
                                },
                                dirty:node.dirty,
                                changed:node.changed
                            };
                            node.changed = true;
                            node.dirty = true;
                            RED.nodes.dirty(true);
                            // RED.history.push(historyEvent);
                            RED.view.redraw();
                            if (xhr.status == 200) {
                                RED.notify(node._("debug.notification.activated",{label:label}),"success");
                            } else if (xhr.status == 201) {
                                RED.notify(node._("debug.notification.deactivated",{label:label}),"success");
                            }
                        },
                        error: function(jqXHR,textStatus,errorThrown) {
                            if (jqXHR.status == 404) {
                                RED.notify(node._("common.notification.error", {message: node._("common.notification.errors.not-deployed")}),"error");
                            } else if (jqXHR.status === 0) {
                                RED.notify(node._("common.notification.error", {message: node._("common.notification.errors.no-response")}),"error");
                            } else {
                                RED.notify(node._("common.notification.error",{message:node._("common.notification.errors.unexpected",{status:err.status,message:err.response})}),"error");
                            }
                        }
                    });
                }
            },
            onpaletteadd: function() {
                var options = {
                    messageMouseEnter: function(sourceId) {
                        if (sourceId) {
                            var n = RED.nodes.node(sourceId);
                            if (n) {
                                n.highlighted = true;
                                n.dirty = true;
                            }
                            RED.view.redraw();
                        }
                    },
                    messageMouseLeave: function(sourceId) {
                        if (sourceId) {
                            var n = RED.nodes.node(sourceId);
                            if (n) {
                                n.highlighted = false;
                                n.dirty = true;
                            }
                            RED.view.redraw();
                        }
                    },
                    messageSourceClick: function(sourceId) {
                        RED.view.reveal(sourceId);
                    },
                    clear: function() {
                        RED.nodes.eachNode(function(node) {
                            node.highlighted = false;
                            node.dirty = true;
                        });
                        RED.view.redraw();
                    }
                };

                var uiComponents = RED.debug.init(options);

                // RED.sidebar.addTab({
                //     id: "debug",
                //     label: this._("debug.sidebar.label"),
                //     name: this._("debug.sidebar.name"),
                //     content: uiComponents.content,
                //     toolbar: uiComponents.footer,
                //     enableOnEdit: true,
                //     pinned: true,
                //     iconClass: "fa fa-bug"
                // });
                // RED.actions.add("core:show-debug-tab",function() { // RED.sidebar.show('debug'); });

                var that = this;
                RED._debug = function(msg) {
                    that.handleDebugMessage("", {
                        name:"debug",
                        msg:msg
                    });
                };

                this.refreshMessageList = function() {
                    RED.debug.refreshMessageList(RED.workspaces.active());
                    if (subWindow) {
                        try {
                            subWindow.postMessage({event:"workspaceChange",activeWorkspace:RED.workspaces.active()},"*");
                        } catch(err) {
                            console.log(err);
                        }
                    }
                };
                RED.events.on("workspace:change", this.refreshMessageList);

                this.handleDebugMessage = function(t,o) {
                    var sourceNode = RED.nodes.node(o.id) || RED.nodes.node(o.z);
                    if (sourceNode) {
                        o._source = {id:sourceNode.id,z:sourceNode.z,name:sourceNode.name,type:sourceNode.type,_alias:o._alias};
                    }
                    RED.debug.handleDebugMessage(o);
                    if (subWindow) {
                        try {
                            subWindow.postMessage({event:"message",msg:o},"*");
                        } catch(err) {
                            console.log(err);
                        }
                    }
                };
                RED.comms.subscribe("debug",this.handleDebugMessage);

                this.clearMessageList = function() {
                    RED.debug.clearMessageList(true);
                    if (subWindow) {
                        try {
                            subWindow.postMessage({event:"projectChange"},"*");
                        } catch(err) {
                            console.log(err);
                        }
                    }
                };
                RED.events.on("project:change", this.clearMessageList);

                $("#debug-tab-open").click(function(e) {
                    e.preventDefault();
                    subWindow = window.open(document.location.toString().replace(/[?#].*$/,"")+"debug/view/view.html"+document.location.search,"nodeREDDebugView","menubar=no,location=no,toolbar=no,chrome,height=500,width=600");
                    subWindow.onload = function() {
                        subWindow.postMessage({event:"workspaceChange",activeWorkspace:RED.workspaces.active()},"*");
                    };
                });

                $(window).unload(function() {
                    if (subWindow) {
                        try {
                            subWindow.close();
                        } catch(err) {
                            console.log(err);
                        }
                    }
                });

                this.handleWindowMessage = function(evt) {
                    var msg = evt.data;
                    if (msg.event === "mouseEnter") {
                        options.messageMouseEnter(msg.id);
                    } else if (msg.event === "mouseLeave") {
                        options.messageMouseLeave(msg.id);
                    } else if (msg.event === "mouseClick") {
                        options.messageSourceClick(msg.id);
                    } else if (msg.event === "clear") {
                        options.clear();
                    }
                };
                window.addEventListener('message',this.handleWindowMessage);
            },
            onpaletteremove: function() {
                RED.comms.unsubscribe("debug",this.handleDebugMessage);
                // RED.sidebar.removeTab("debug");
                RED.events.off("workspace:change", this.refreshMessageList);
                window.removeEventListener("message",this.handleWindowMessage);
                // RED.actions.remove("core:show-debug");

                delete RED._debug;
            },
            oneditprepare: function() {
                if (this.tosidebar === undefined) {
                    this.tosidebar = true;
                    $("#node-input-tosidebar").prop('checked', true);
                }
                if (typeof this.console === "string") {
                    this.console = (this.console == 'true');
                    $("#node-input-console").prop('checked', this.console);
                    $("#node-input-tosidebar").prop('checked', true);
                }
                $("#node-input-typed-complete").typedInput({types:['msg', {value:"full",label:RED._("node-red:debug.msgobj"),hasValue:false}]});
                if (this.complete === "true" || this.complete === true) {
                    // show complete message object
                    $("#node-input-typed-complete").typedInput('type','full');
                } else {
                    var property = (!this.complete||(this.complete === "false")) ? "payload" : this.complete+"";
                    $("#node-input-typed-complete").typedInput('type','msg');
                    $("#node-input-typed-complete").typedInput('value',property);
                }
                $("#node-input-typed-complete").on('change',function() {
                    if ($("#node-input-typed-complete").typedInput('type') === 'msg' &&
                        $("#node-input-typed-complete").typedInput('value') === ''
                    ) {
                        $("#node-input-typed-complete").typedInput('value','payload');
                    }
                    if ($("#node-input-typed-complete").typedInput('type') === 'msg') {
                        $("#node-tostatus-line").show();
                    }
                    else { $("#node-tostatus-line").hide(); }
                });
                $("#node-input-complete").on('change',function() {
                    if ($("#node-input-typed-complete").typedInput('type') === 'msg') {
                        $("#node-tostatus-line").show();
                    }
                    else { $("#node-tostatus-line").hide(); }
                });
            },
            oneditsave: function() {
                var type = $("#node-input-typed-complete").typedInput('type');
                if (type === 'full') {
                    $("#node-input-complete").val("true");
                } else {
                    $("#node-input-complete").val($("#node-input-typed-complete").typedInput('value'));
                }
            }
        });

        RED.nodes.registerType('link in',{
            category: 'input',
            color:"#ddd",//"#87D8CF",
            defaults: {
                name: {value:""},
                links: { value: [] }
            },
            inputs:0,
            outputs:1,
            icon: "link-out.png",
            outputLabels: function(i) {
                return this.name||this._("link.linkIn");
            },
            label: function() {
                return this.name||this._("link.linkIn");
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            oneditprepare: function() {
                onEditPrepare(this,"link out");
            },
            oneditsave: function() {
                onEditSave(this);
            },
            // onadd: onAdd,
            // oneditresize: resizeNodeList
        });

        RED.nodes.registerType('link out',{
            category: 'output',
            color:"#ddd",//"#87D8CF",
            defaults: {
                name: {value:""},
                links: { value: []}
            },
            align:"right",
            inputs:1,
            outputs:0,
            icon: "link-out.png",
            inputLabels: function(i) {
                return this.name||this._("link.linkOut");
            },
            label: function() {
                return this.name||this._("link.linkOut");
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            oneditprepare: function() {
                onEditPrepare(this,"link in");
            },
            oneditsave: function() {
                onEditSave(this);
            },
            // onadd: onAdd,
            // oneditresize: resizeNodeList
        });

        RED.nodes.registerType('exec',{
            category: 'advanced-function',
            color:"darksalmon",
            defaults: {
                command: {value:""},
                addpay: {value:true},
                append: {value:""},
                useSpawn: {value:"false"},
                timer: {value:""},
                oldrc: {value:false},
                name: {value:""}
            },
            inputs:1,
            outputs:3,
            outputLabels: ["stdout","stderr","return code"],
            icon: "arrow-in.png",
            align: "right",
            label: function() {
                return this.name||this.command||(this.useSpawn=="true"?this._("exec.spawn"):this._("exec.exec"));
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            oneditprepare: function() {
                if ($("#node-input-useSpawn").val() === null) {
                    $("#node-input-useSpawn").val(this.useSpawn.toString());
                }
            }
        });

        RED.nodes.registerType('function',{
            color:"#fdd0a2",
            category: 'function',
            defaults: {
                name: {value:""},
                func: {value:"\nreturn msg;"},
                outputs: {value:1},
                noerr: {value:0,required:true,validate:function(v) { return ((!v) || (v === 0)) ? true : false; }}
            },
            inputs:1,
            outputs:1,
            icon: "function.png",
            label: function() {
                return this.name||this._("function.function");
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            oneditprepare: function() {
                var that = this;
                $( "#node-input-outputs" ).spinner({
                    min:1,
                    change: function(event, ui) {
                        var value = this.value;
                        if (!value.match(/^\d+$/)) { value = 1;  }
                        else if (value < this.min) { value = this.min; }
                        if (value !== this.value) { $(this).spinner("value", value); }
                    }
                });

                this.editor = RED.editor.createEditor({
                    id: 'node-input-func-editor',
                    mode: 'ace/mode/javascript',
                    value: $("#node-input-func").val(),
                    globals: {
                        msg:true,
                        context:true,
                        RED: true,
                        util: true,
                        flow: true,
                        global: true,
                        console: true,
                        Buffer: true,
                        setTimeout: true,
                        clearTimeout: true,
                        setInterval: true,
                        clearInterval: true
                    }
                });

                // RED.library.create({
                //     url:"functions", // where to get the data from
                //     type:"function", // the type of object the library is for
                //     editor:this.editor, // the field name the main text body goes to
                //     mode:"ace/mode/javascript",
                //     fields:['name','outputs']
                // });
                this.editor.focus();

                $("#node-function-expand-js").click(function(e) {
                    e.preventDefault();
                    var value = that.editor.getValue();
                    RED.editor.editJavaScript({
                        value: value,
                        width: "Infinity",
                        cursor: that.editor.getCursorPosition(),
                        complete: function(v,cursor) {
                            that.editor.setValue(v, -1);
                            that.editor.gotoLine(cursor.row+1,cursor.column,false);
                            setTimeout(function() {
                                that.editor.focus();
                            },300);
                        }
                    })
                })
            },
            oneditsave: function() {
                var annot = this.editor.getSession().getAnnotations();
                this.noerr = 0;
                $("#node-input-noerr").val(0);
                for (var k=0; k < annot.length; k++) {
                    //console.log(annot[k].type,":",annot[k].text, "on line", annot[k].row);
                    if (annot[k].type === "error") {
                        $("#node-input-noerr").val(annot.length);
                        this.noerr = annot.length;
                    }
                }
                $("#node-input-func").val(this.editor.getValue());
                this.editor.destroy();
                delete this.editor;
            },
            oneditcancel: function() {
                this.editor.destroy();
                delete this.editor;
            },
            oneditresize: function(size) {
                var rows = $("#dialog-form>div:not(.node-text-editor-row)");
                var height = $("#dialog-form").height();
                for (var i=0; i<rows.size(); i++) {
                    height -= $(rows[i]).outerHeight(true);
                }
                var editorRow = $("#dialog-form>div.node-text-editor-row");
                height -= (parseInt(editorRow.css("marginTop"))+parseInt(editorRow.css("marginBottom")));
                $(".node-text-editor").css("height",height+"px");
                this.editor.resize();
            }
        });

        RED.nodes.registerType('template',{
            color:"rgb(243, 181, 103)",
            category: 'function',
            defaults: {
                name: {value:""},
                // field: {value:"payload", validate:RED.validators.typedInput("fieldType")},
                fieldType: {value:"msg"},
                format: {value:"handlebars"},
                syntax: {value:"mustache"},
                template: {value:"This is the payload: {{payload}} !"},
                output: {value:"str"}
            },
            inputs:1,
            outputs:1,
            icon: "template.png",
            label: function() {
                return this.name||this._("template.template");;
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            oneditprepare: function() {
                var that = this;
                if (!this.field) {
                    this.field = 'payload';
                    $("#node-input-field").val("payload");
                }
                if (!this.fieldType) {
                    this.fieldType = 'msg';
                }
                if (!this.syntax) {
                    this.syntax = 'mustache';
                    $("#node-input-syntax").val(this.syntax);
                }
                $("#node-input-field").typedInput({
                    default: 'msg',
                    types: ['msg','flow','global'],
                    typeField: $("#node-input-fieldType")
                });

                this.editor = RED.editor.createEditor({
                    id: 'node-input-template-editor',
                    mode: 'ace/mode/html',
                    value: $("#node-input-template").val()
                });
                // RED.library.create({
                //     url:"functions", // where to get the data from
                //     type:"function", // the type of object the library is for
                //     editor:that.editor, // the field name the main text body goes to
                //     fields:['name','outputs']
                // });
                this.editor.focus();

                $("#node-input-format").change(function() {
                    var mod = "ace/mode/"+$("#node-input-format").val();
                    that.editor.getSession().setMode({
                        path: mod,
                        v: Date.now()
                    });
                });
            },
            oneditsave: function() {
                $("#node-input-template").val(this.editor.getValue());
                this.editor.destroy();
                delete this.editor;
            },
            oneditcancel: function() {
                this.editor.destroy();
                delete this.editor;
            },
            oneditresize: function(size) {
                var rows = $("#dialog-form>div:not(.node-text-editor-row)");
                var height = $("#dialog-form").height();
                for (var i=0; i<rows.size(); i++) {
                    height -= $(rows[i]).outerHeight(true);
                }
                var editorRow = $("#dialog-form>div.node-text-editor-row");
                height -= (parseInt(editorRow.css("marginTop"))+parseInt(editorRow.css("marginBottom")));
                $(".node-text-editor").css("height",height+"px");
                this.editor.resize();
            }
        });

        RED.nodes.registerType('delay',{
            category: 'function',
            color:"#E6E0F8",
            defaults: {
                name: {value:""},
                pauseType: {value:"delay", required:true},
                // timeout: {value:"5", required:true, validate:function(v) { return RED.validators.number(v) && (v >= 0); }},
                timeoutUnits: {value:"seconds"},
                // rate: {value:"1", required:true, validate:function(v) { return RED.validators.number(v) && (v >= 0); }},
                // nbRateUnits: {value:"1", required:false, validate:RED.validators.regex(/\d+|/)},
                rateUnits: {value: "second"},
                // randomFirst: {value:"1", required:true, validate:function(v) { return RED.validators.number(v) && (v >= 0); }},
                // randomLast: {value:"5", required:true, validate:function(v) { return RED.validators.number(v) && (v >= 0); }},
                randomUnits: {value: "seconds"},
                drop: {value:false}
            },
            inputs:1,
            outputs:1,
            icon: "timer.png",
            label: function() {
                if (this.name) {
                    return this.name;
                }
                if (this.pauseType == "delayv") {
                    return this._("delay.label.variable");
                } else if (this.pauseType == "delay") {
                    var units = this.timeoutUnits ? this.timeoutUnits.charAt(0) : "s";
                    if (this.timeoutUnits == "milliseconds") { units = "ms"; }
                    return this._("delay.label.delay")+" "+this.timeout+units;
                } else if (this.pauseType == "random") {
                    return this._("delay.label.random");
                } else {
                    var rate = this.rate+" msg/"+(this.rateUnits ? (this.nbRateUnits > 1 ? this.nbRateUnits : '') + this.rateUnits.charAt(0) : "s");
                    if (this.pauseType == "rate") {
                        return this._("delay.label.limit")+" "+rate;
                    } else if (this.pauseType == "timed") {
                        return this._("delay.label.limitTopic")+" "+rate;
                    } else {
                        return this._("delay.label.limitTopic")+" "+rate;
                    }
                }
                //     var units = '';
                //     if (this.nbRateUnits > 1) {
                //         units = this.nbRateUnits + ' ' + this._("delay.label.units." + this.rateUnits + ".plural");
                //     } else {
                //         units = this._("delay.label.units." + this.rateUnits + ".singular");
                //     }
                //     return this.name || this.rate + " " + this._("delay.label.timed") + ' ' + units;
                // } else {
                //     var units = this.rateUnits ? (this.nbRateUnits > 1 ? this.nbRateUnits : '') + this.rateUnits.charAt(0) : "s";
                //     return this.name || this._("delay.label.queue")+" "+this.rate+" msg/"+units;
                // }
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            oneditprepare: function() {
                var node = this;
                $( "#node-input-timeout" ).spinner({min:1});
                $( "#node-input-rate" ).spinner({min:1});
                $( "#node-input-nbRateUnits" ).spinner({min:1});

                $( "#node-input-randomFirst" ).spinner({min:0});
                $( "#node-input-randomLast" ).spinner({min:1});

                $('.ui-spinner-button').click(function() {
                    $(this).siblings('input').change();
                });

                $( "#node-input-nbRateUnits" ).on('change keyup', function() {
                    var $this = $(this);
                    var val = parseInt($this.val());
                    var type = "singular";
                    if (val > 1) {
                        type = "plural";
                    }
                    if ($this.attr("data-type") == type) {
                        return;
                    }
                    $this.attr("data-type", type);
                    $("#node-input-rateUnits option").each(function () {
                        var $option = $(this);
                        var key = "delay.label.units." + $option.val() + "." + type;
                        $option.attr('data-i18n', 'node-red:' + key);
                        $option.html(node._(key));
                    });
                });

                if (this.pauseType == "delay") {
                    $("#node-input-delay-action").val('delay');
                    $("#node-input-delay-type").val('delay');
                } else if (this.pauseType == "delayv") {
                    $("#node-input-delay-action").val('delay');
                    $("#node-input-delay-type").val('delayv');
                } else if (this.pauseType == "random") {
                    $("#node-input-delay-action").val('delay');
                    $("#node-input-delay-type").val('random');
                } else if (this.pauseType == "rate") {
                    $("#node-input-delay-action").val('rate');
                    $("#node-input-rate-type").val('all');
                } else if (this.pauseType == "queue") {
                    $("#node-input-delay-action").val('rate');
                    $("#node-input-rate-type").val('topic');
                    $("#node-input-rate-topic-type").val('queue');
                } else if (this.pauseType == "timed") {
                    $("#node-input-delay-action").val('rate');
                    $("#node-input-rate-type").val('topic');
                    $("#node-input-rate-topic-type").val('timed');
                }

                if (!this.timeoutUnits) {
                    $("#node-input-timeoutUnits option").filter(function() {
                        return $(this).val() == 'seconds';
                    }).attr('selected', true);
                }

                if (!this.randomUnits) {
                    $("#node-input-randomUnits option").filter(function() {
                        return $(this).val() == 'seconds';
                    }).attr('selected', true);
                }

                $("#node-input-delay-action").on("change",function() {
                    if (this.value === "delay") {
                        $("#delay-details").show();
                        $("#rate-details").hide();
                    } else if (this.value === "rate") {
                        $("#delay-details").hide();
                        $("#rate-details").show();
                    }
                }).change();

                $("#node-input-delay-type").on("change", function() {
                    if (this.value === "delay") {
                        $("#delay-details-for").show();
                        $("#random-details").hide();
                    } else if (this.value === "delayv") {
                        $("#delay-details-for").show();
                        $("#random-details").hide();
                    } else if (this.value === "random") {
                        $("#delay-details-for").hide();
                        $("#random-details").show();
                    }
                }).change();

                $("#node-input-rate-type").on("change", function() {
                    if (this.value === "all") {
                        $("#node-input-drop").attr('disabled',false).next().css("opacity",1)
                        $("#rate-details-per-topic").hide();
                    } else if (this.value === "topic") {
                        $("#node-input-drop").prop('checked',true).attr('disabled',true).next().css("opacity",0.5)
                        $("#rate-details-per-topic").show();
                    }
                }).change();
            },
            oneditsave: function() {
                var action = $("#node-input-delay-action").val();
                if (action === "delay") {
                    this.pauseType = $("#node-input-delay-type").val();
                } else if (action === "rate") {
                    action = $("#node-input-rate-type").val();
                    if (action === "all") {
                        this.pauseType = "rate";
                    } else {
                        this.pauseType = $("#node-input-rate-topic-type").val();
                    }
                }
            }
        });

        RED.nodes.registerType('trigger',{
            category: 'function',
            color:"#E6E0F8",
            defaults: {
                // op1: {value:"1", validate: RED.validators.typedInput("op1type")},
                // op2: {value:"0", validate: RED.validators.typedInput("op2type")},
                op1type: {value:"val"},
                op2type: {value:"val"},
                // duration: {value:"250",required:true,validate:RED.validators.number()},
                extend: {value:"false"},
                units: {value:"ms"},
                reset: {value:""},
                bytopic: {value: "all"},
                name: {value:""}
            },
            inputs:1,
            outputs:1,
            icon: "trigger.png",
            label: function() {
                if (this.duration > 0) {
                    return this.name|| this._("trigger.label.trigger")+" "+this.duration+this.units;
                }
                if (this.duration < 0) {
                    return this.name|| this._("trigger.label.trigger-loop")+" "+(this.duration * -1)+this.units;
                }
                else {
                    return this.name|| this._("trigger.label.trigger-block");
                }
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            oneditprepare: function() {
                $("#node-then-type").change(function() {
                    if ($(this).val() == "block") {
                        $(".node-type-wait").hide();
                        $(".node-type-duration").hide();
                    }
                    else if ($(this).val() == "loop") {
                        $(".node-type-wait").hide();
                        $(".node-type-duration").show();
                    } else {
                        $(".node-type-wait").show();
                        $(".node-type-duration").show();
                    }
                });

                if (this.op1type === 'val') {
                    $("#node-input-op1type").val('str');
                }
                if (this.op2type === 'val') {
                    $("#node-input-op2type").val('str');
                }

                var optionNothing = {value:"nul",label:this._("trigger.output.nothing"),hasValue:false};
                var optionPayload = {value:"pay",label:this._("trigger.output.existing"),hasValue:false};
                var optionOriginalPayload = {value:"pay",label:this._("trigger.output.original"),hasValue:false};
                var optionLatestPayload = {value:"payl",label:this._("trigger.output.latest"),hasValue:false};

                $("#node-input-op1").typedInput({
                    default: 'str',
                    typeField: $("#node-input-op1type"),
                    types:['flow','global','str','num','bool','json','bin','date','env',
                        optionPayload,
                        optionNothing
                    ]
                });
                $("#node-input-op2").typedInput({
                    default: 'str',
                    typeField: $("#node-input-op2type"),
                    types:['flow','global','str','num','bool','json','bin','date','env',
                        optionOriginalPayload,
                        optionLatestPayload,
                        optionNothing
                    ]
                });

                if (this.bytopic === undefined) {
                    $("#node-input-bytopic").val("all");
                }

                if (this.duration == "0") {
                    $("#node-then-type").val("block");
                }
                else if ((this.duration * 1) < 0) {
                    $("#node-then-type").val("loop");
                    $("#node-input-duration").val(this.duration*-1);
                } else {
                    $("#node-then-type").val("wait");
                }
                $("#node-then-type").change();

                if (this.extend === "true" || this.extend === true) {
                    $("#node-input-extend").prop("checked",true);
                } else {
                    $("#node-input-extend").prop("checked",false);
                }

            },
            oneditsave: function() {
                if ($("#node-then-type").val() == "block") {
                    $("#node-input-duration").val("0");
                }
                if ($("#node-then-type").val() == "loop") {
                    $("#node-input-duration").val($("#node-input-duration").val() * -1);
                }


            }
        });

        RED.nodes.registerType('comment',{
            category: 'function',
            color:"#ffffff",
            defaults: {
                name: {value:""},
                info: {value:""}
            },
            inputs:0,
            outputs:0,
            icon: "comment.png",
            label: function() {
                return this.name||this._("comment.comment");
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            info: function() {
                return (this.name?"# "+this.name+"\n":"")+(this.info||"");
            },
            oneditprepare: function() {
                var that = this;
                this.editor = RED.editor.createEditor({
                    id: 'node-input-info-editor',
                    mode: 'ace/mode/markdown',
                    value: $("#node-input-info").val()
                });
                this.editor.focus();
            },
            oneditsave: function() {
                $("#node-input-info").val(this.editor.getValue());
                this.editor.destroy();
                delete this.editor;
            },
            oneditcancel: function() {
                this.editor.destroy();
                delete this.editor;
            },
            oneditresize: function(size) {
                var rows = $("#dialog-form>div:not(.node-text-editor-row)");
                var height = $("#dialog-form").height();
                for (var i=0; i<rows.size(); i++) {
                    height -= $(rows[i]).outerHeight(true);
                }
                var editorRow = $("#dialog-form>div.node-text-editor-row");
                height -= (parseInt(editorRow.css("marginTop"))+parseInt(editorRow.css("marginBottom")));
                $(".node-text-editor").css("height",height+"px");
                this.editor.resize();
            }
        });

        RED.nodes.registerType('unknown',{
            category: 'unknown',
            color:"#fff0f0",
            defaults: {
                name: {value:""}
            },
            inputs:1,
            outputs:1,
            icon: "",
            label: function() {
                return "("+this.name+")"||this._("unknown.label.unknown");
            },
            labelStyle: function() {
                return "node_label_unknown";
            }
        });

        RED.nodes.registerType('rpi-gpio in',{
            category: 'Raspberry Pi',
            color:"#c6dbef",
            defaults: {
                name: { value:"" },
                // pin: { value:"tri",required:true,validate:RED.validators.number() },
                intype: { value:"tri" },
                debounce: { value:"25" },
                read: { value:false }
            },
            inputs:0,
            outputs:1,
            icon: "rpi.png",
            info: function() {
                if ( Object.keys(pinsInUse).length !== 0 ) {
                    return "**Pins in use** : "+Object.keys(pinsInUse);
                }
                else { return ""; }
            },
            label: function() {
                var suf = "";
                if (this.intype === "up") { suf = "↑ "}
                if (this.intype === "down") { suf = "↓ "}
                return this.name || "PIN: "+suf+this.pin ;
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            outputLabels: function() { return "GPIO"+this.pin; },
            oneditprepare: function() {
                var pinnow = this.pin;
                var pintip = this._("rpi-gpio.tip.pin");
                var pinname = this._("rpi-gpio.pinname");
                var alreadyuse = this._("rpi-gpio.alreadyuse");
                var alreadyset = this._("rpi-gpio.alreadyset");

                $.getJSON('rpi-pins/'+this.id,function(data) {
                    pinsInUse = data || {};
                    $('#pin-tip').html(pintip + Object.keys(data));
                });
                $("#node-input-pin").change(function() {
                    if ($("#node-input-pin").val()) {
                        $("#pinform input[value="+$("#node-input-pin").val()+"]").prop('checked', true);
                    }
                    var pinnew = $("#node-input-pin").val();
                    if ((pinnew) && (pinnew !== pinnow)) {
                        if (pinsInUse.hasOwnProperty(pinnew)) {
                            RED.notify(pinname+" "+pinnew+" "+alreadyuse,"warn");
                        }
                        pinnow = pinnew;
                    }
                });
                $("#node-input-intype").change(function() {
                    var newtype = $("#node-input-intype").val();
                    if ((pinsInUse.hasOwnProperty(pinnow)) && (pinsInUse[pinnow] !== newtype)) {
                        RED.notify(pinname+" "+pinnow+" "+alreadyset+" "+pinsInUse[pinnow],"error");
                    }
                });
                $('#pinform input').on('change', function() {
                    this.pin = $("#pinform input[type='radio']:checked").val();
                    $("#node-input-pin").val(this.pin);
                });
            }
        });

        RED.nodes.registerType('rpi-gpio out',{
            category: 'Raspberry Pi',
            color:"#c6dbef",
            defaults: {
                name: { value:"" },
                // pin: { value:"",required:true,validate:RED.validators.number() },
                set: { value:"" },
                level: { value:"0" },
                freq: {value:""},
                out: { value:"out" }
            },
            inputs:1,
            outputs:0,
            icon: "rpi.png",
            info: function() {
                if ( Object.keys(pinsInUse).length !== 0 ) {
                    return "**Pins in use** : "+Object.keys(pinsInUse);
                }
                else { return ""; }
            },
            align: "right",
            label: function() {
                if (this.out === "pwm") { return this.name || "PWM: "+this.pin; }
                else if (this.out === "ser") { return this.name || "Servo: "+this.pin; }
                else {
                    var suf = "";
                    if (this.set == true) { suf = (this.level === "1") ? " ¹" : " ₀"; }
                    return this.name||"PIN: "+ this.pin + suf ;
                }
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            inputLabels: function() { return "GPIO"+this.pin; },
            oneditprepare: function() {
                var pinnow = this.pin;
                var pintip = this._("rpi-gpio.tip.pin");
                var pinname = this._("rpi-gpio.pinname");
                var alreadyuse = this._("rpi-gpio.alreadyuse");
                var alreadyset = this._("rpi-gpio.alreadyset");
                if (!$("#node-input-out").val()) { $("#node-input-out").val("out"); }

                $.getJSON('rpi-pins/'+this.id,function(data) {
                    pinsInUse = data || {};
                    $('#pin-tip').html(pintip + Object.keys(data));
                });

                $("#node-input-pin").change(function() {
                    if ($("#node-input-pin").val()) {
                        $("#pinform input[value="+$("#node-input-pin").val()+"]").prop('checked', true);
                    }
                    var pinnew = $("#node-input-pin").val();
                    if ((pinnew) && (pinnew !== pinnow)) {
                        if (pinsInUse.hasOwnProperty(pinnew)) {
                            RED.notify(pinname+" "+pinnew+" "+alreadyuse,"warn");
                        }
                        pinnow = pinnew;
                    }
                });

                $("#node-input-out").change(function() {
                    var newtype = $("#node-input-out").val();
                    if ((pinsInUse.hasOwnProperty(pinnow)) && (pinsInUse[pinnow] !== newtype)) {
                        RED.notify(pinname+" "+pinnow+" "+alreadyset+" "+pinsInUse[pinnow],"error");
                    }
                });

                var hidestate = function () {
                    if ($("#node-input-out").val() === "pwm") {
                        $('#node-set-tick').hide();
                        $('#node-set-state').hide();
                        $('#node-input-set').prop('checked', false);
                        $("#dig-tip").hide();
                        $("#pwm-tip").show();
                        $('#node-set-freq').show();
                    }
                    else {
                        $('#node-set-tick').show();
                        $("#dig-tip").show();
                        $("#pwm-tip").hide();
                        $('#node-set-freq').hide();
                    }
                };
                $("#node-input-out").change(function () { hidestate(); });
                hidestate();

                var setstate = function () {
                    if ($('#node-input-set').is(":checked")) {
                        $("#node-set-state").show();
                    } else {
                        $("#node-set-state").hide();
                    }
                };
                $("#node-input-set").change(function () { setstate(); });
                setstate();

                $('#pinform input').on('change', function() {
                    this.pin = $("#pinform input[type='radio']:checked").val();
                    $("#node-input-pin").val(this.pin);
                });
            }
        });

        RED.nodes.registerType('rpi-mouse',{
            category: 'Raspberry Pi',
            color:"#c6dbef",
            defaults: {
                name: { value:"" },
                butt: { value:"1",required:true }
            },
            inputs:0,
            outputs:1,
            icon: "rpi.png",
            label: function() {
                var na = this._("rpi-gpio.label.pimouse");
                if (this.butt === "1") { na += " "+this._("rpi-gpio.label.left"); }
                if (this.butt === "2") { na += " "+this._("rpi-gpio.label.right"); }
                if (this.butt === "4") { na += " "+this._("rpi-gpio.label.middle"); }
                return this.name||na;
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            }
        });

        RED.nodes.registerType('rpi-keyboard',{
            category: 'Raspberry Pi',
            color:"#c6dbef",
            defaults: {
                name: { value:"" }
            },
            inputs:0,
            outputs:1,
            icon: "rpi.png",
            label: function() {
                return this.name || this._("rpi-gpio.label.pikeyboard");
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            }
        });

        RED.nodes.registerType('tls-config',{
            category: 'config',
            defaults: {
                name: {value:""},
                // cert: {value:"", validate: function(v) {
                //     var currentKey = $("#node-config-input-key").val();
                //     if (currentKey === undefined) {
                //         currentKey = this.key;
                //     }
                //     return currentKey === '' || v != '';
                // }},
                // key: {value:"", validate: function(v) {
                //     var currentCert = $("#node-config-input-cert").val();
                //     if (currentCert === undefined) {
                //         currentCert = this.cert;
                //     }
                //     return currentCert === '' || v != '';
                // }},
                ca: {value:""},
                certname: {value:""},
                keyname: {value:""},
                caname: {value:""},
                servername: {value:""},
                verifyservercert: {value: true}
            },
            credentials: {
                certdata: {type:"text"},
                keydata: {type:"text"},
                cadata: {type:"text"},
                passphrase: {type:"password"}
            },
            label: function() {
                return this.name || this._("tls.tls");
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            oneditprepare: function() {
                function updateFileUpload() {
                    if ($("#node-config-input-uselocalfiles").is(':checked')) {
                        $(".tls-config-input-path").show();
                        $(".tls-config-input-data").hide();
                    } else {
                        $(".tls-config-input-data").show();
                        $(".tls-config-input-path").hide();
                    }
                }
                $("#node-config-input-uselocalfiles").on("click",function() {
                    updateFileUpload();
                });

                function saveFile(property, file) {
                    var dataInputId = "#node-config-input-"+property+"data";
                    var filenameInputId = "#node-config-input-"+property+"name";
                    var filename = file.name;
                    var reader = new FileReader();
                    reader.onload = function(event) {
                        $("#tls-config-"+property+"name").text(filename);
                        $(filenameInputId).val(filename);
                        $(dataInputId).val(event.target.result);
                    }
                    reader.readAsText(file,"UTF-8");
                }
                $("#node-config-input-certfile" ).change(function() {
                    saveFile("cert", this.files[0]);
                });
                $("#node-config-input-keyfile" ).change(function() {
                    saveFile("key", this.files[0]);
                });
                $("#node-config-input-cafile" ).change(function() {
                    saveFile("ca", this.files[0]);
                });

                function clearNameData(prop) {
                    $("#tls-config-"+prop+"name").text("");
                    $("#node-config-input-"+prop+"data").val("");
                    $("#node-config-input-"+prop+"name").val("");
                }
                $("#tls-config-button-cert-clear").click(function() {
                    clearNameData("cert");
                });
                $("#tls-config-button-key-clear").click(function() {
                    clearNameData("key");
                });
                $("#tls-config-button-ca-clear").click(function() {
                    clearNameData("ca");
                });

                if (RED.settings.tlsConfigDisableLocalFiles) {
                    $("#node-config-row-uselocalfiles").hide();
                } else {
                    $("#node-config-row-uselocalfiles").show();
                }
                // in case paths were set from old TLS config
                if(this.cert || this.key || this.ca) {
                    $("#node-config-input-uselocalfiles").prop('checked',true);
                }
                $("#tls-config-certname").text(this.certname);
                $("#tls-config-keyname").text(this.keyname);
                $("#tls-config-caname").text(this.caname);
                updateFileUpload();
            },
            oneditsave: function() {
                if ($("#node-config-input-uselocalfiles").is(':checked')) {
                    clearNameData("ca");
                    clearNameData("cert");
                    clearNameData("key");
                } else {
                    $("#node-config-input-ca").val("");
                    $("#node-config-input-cert").val("");
                    $("#node-config-input-key").val("");
                }
            }
        });

        RED.nodes.registerType('mqtt in',{
            category: 'input',
            defaults: {
                name: {value:""},
                // topic: {value:"",required:true,validate: RED.validators.regex(/^(#$|(\+|[^+#]*)(\/(\+|[^+#]*))*(\/(\+|#|[^+#]*))?$)/)},
                qos: {value: "2"},
                broker: {type:"mqtt-broker", required:true}
            },
            color:"#d8bfd8",
            inputs:0,
            outputs:1,
            icon: "bridge.png",
            label: function() {
                return this.name||this.topic||"mqtt";
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            oneditprepare: function() {
                if (this.qos === undefined) {
                    $("#node-input-qos").val("2");
                }
            }
        });

        RED.nodes.registerType('mqtt out',{
            category: 'output',
            defaults: {
                name: {value:""},
                topic: {value:""},
                qos: {value:""},
                retain: {value:""},
                broker: {type:"mqtt-broker", required:true}
            },
            color:"#d8bfd8",
            inputs:1,
            outputs:0,
            icon: "bridge.png",
            align: "right",
            label: function() {
                return this.name||this.topic||"mqtt";
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            }
        });

        RED.nodes.registerType('mqtt-broker',{
            category: 'config',
            defaults: {
                name: {value:""},
                broker: {value:"",required:true},
                // port: {value:1883,required:false,validate:RED.validators.number(true)},
                tls: {type:"tls-config",required: false},
                clientid: {value:"", validate: function(v) {
                    if ($("#node-config-input-clientid").length) {
                        // Currently editing the node
                        return $("#node-config-input-cleansession").is(":checked") || (v||"").length > 0;
                    } else {
                        return (this.cleansession===undefined || this.cleansession) || (v||"").length > 0;
                    }
                }},
                usetls: {value: false},
                verifyservercert: { value: false},
                compatmode: { value: true},
                // keepalive: {value:60,validate:RED.validators.number()},
                cleansession: {value: true},
                birthTopic: {value:""},
                birthQos: {value:"0"},
                birthRetain: {value:false},
                birthPayload: {value:""},
                closeTopic: {value:""},
                closeQos: {value:"0"},
                closeRetain: {value:false},
                closePayload: {value:""},
                willTopic: {value:""},
                willQos: {value:"0"},
                willRetain: {value:false},
                willPayload: {value:""}
            },
            credentials: {
                user: {type:"text"},
                password: {type: "password"}
            },
            label: function() {
                if (this.name) {
                    return this.name;
                }
                var b = this.broker;
                if (b === "") { b = "undefined"; }
                var lab = "";
                lab = (this.clientid?this.clientid+"@":"")+b;
                if (b.indexOf("://") === -1){
                    if (!this.port){ lab = lab + ":1883"; }
                    else { lab = lab + ":" + this.port; }
                }
                return lab;
            },
            oneditprepare: function () {
                var tabs = RED.tabs.create({
                    id: "node-config-mqtt-broker-tabs",
                    onchange: function(tab) {
                        $("#node-config-mqtt-broker-tabs-content").children().hide();
                        $("#" + tab.id).show();
                    }
                });
                tabs.addTab({
                    id: "mqtt-broker-tab-connection",
                    label: this._("mqtt.tabs-label.connection")
                });
                tabs.addTab({
                    id: "mqtt-broker-tab-security",
                    label: this._("mqtt.tabs-label.security")
                });

                tabs.addTab({
                    id: "mqtt-broker-tab-messages",
                    label: this._("mqtt.tabs-label.messages")
                });

                function setUpSection(sectionId, isExpanded) {
                    var birthMessageSection = $(sectionId);
                    var paletteHeader = birthMessageSection.find('.palette-header');
                    var twistie = paletteHeader.find('i');
                    var sectionContent = birthMessageSection.find('.section-content');

                    function toggleSection(expanded) {
                        twistie.toggleClass('expanded', expanded);
                        sectionContent.toggle(expanded);
                    }
                    paletteHeader.click(function(e) {
                        e.preventDefault();
                        var isExpanded = twistie.hasClass('expanded');
                        toggleSection(!isExpanded);
                    });
                    toggleSection(isExpanded);
                }

                // show first section if none are set so the user gets the idea
                var showBirthSection = this.birthTopic !== ""
                    || this.willTopic === ""
                    && this.birthTopic === ""
                    && this.closeTopic == "";
                setUpSection('#mqtt-broker-section-birth', showBirthSection);
                setUpSection('#mqtt-broker-section-close', this.closeTopic !== "");
                setUpSection('#mqtt-broker-section-will', this.willTopic !== "");

                setTimeout(function() { tabs.resize(); },0);
                if (typeof this.cleansession === 'undefined') {
                    this.cleansession = true;
                    $("#node-config-input-cleansession").prop("checked",true);
                }
                if (typeof this.usetls === 'undefined') {
                    this.usetls = false;
                    $("#node-config-input-usetls").prop("checked",false);
                }
                if (typeof this.compatmode === 'undefined') {
                    this.compatmode = true;
                    $("#node-config-input-compatmode").prop('checked', true);
                }
                if (typeof this.keepalive === 'undefined') {
                    this.keepalive = 15;
                    $("#node-config-input-keepalive").val(this.keepalive);
                }
                if (typeof this.birthQos === 'undefined') {
                    this.birthQos = "0";
                    $("#node-config-input-birthQos").val("0");
                }
                if (typeof this.closeQos === 'undefined') {
                    this.willQos = "0";
                    $("#node-config-input-willQos").val("0");
                }
                if (typeof this.willQos === 'undefined') {
                    this.willQos = "0";
                    $("#node-config-input-willQos").val("0");
                }

                function updateTLSOptions() {
                    if ($("#node-config-input-usetls").is(':checked')) {
                        $("#node-config-row-tls").show();
                    } else {
                        $("#node-config-row-tls").hide();
                    }
                }
                updateTLSOptions();
                $("#node-config-input-usetls").on("click",function() {
                    updateTLSOptions();
                });
                var node = this;
                function updateClientId() {
                    if ($("#node-config-input-cleansession").is(":checked")) {
                        $("#node-config-input-clientid").attr("placeholder",node._("mqtt.placeholder.clientid"));
                    } else {
                        $("#node-config-input-clientid").attr("placeholder",node._("mqtt.placeholder.clientid-nonclean"));
                    }
                    $("#node-config-input-clientid").change();
                }
                setTimeout(updateClientId,0);
                $("#node-config-input-cleansession").on("click",function() {
                    updateClientId();
                });

                function updatePortEntry(){
                    var disabled = $("#node-config-input-port").prop("disabled");
                    if ($("#node-config-input-broker").val().indexOf("://") === -1){
                        if (disabled){
                            $("#node-config-input-port").prop("disabled", false);
                        }
                    }
                    else {
                        if (!disabled){
                            $("#node-config-input-port").prop("disabled", true);
                        }
                    }
                }
                $("#node-config-input-broker").change(function() {
                    updatePortEntry();
                });
                $("#node-config-input-broker").on( "keyup", function() {
                    updatePortEntry();
                });
                setTimeout(updatePortEntry,50);

            },
            oneditsave: function() {
                if (!$("#node-config-input-usetls").is(':checked')) {
                    $("#node-config-input-tls").val("");
                }
            }
        });

        RED.nodes.registerType('http in',{
            category: 'input',
            color:"rgb(231, 231, 174)",
            defaults: {
                name: {value:""},
                url: {value:"",required:true},
                method: {value:"get",required:true},
                upload: {value:false},
                swaggerDoc: {type:"swagger-doc", required:false}
            },
            inputs:0,
            outputs:1,
            icon: "white-globe.png",
            label: function() {
                if (this.name) {
                    return this.name;
                } else if (this.url) {
                    var root = '/';//RED.settings.httpNodeRoot;
                    if (root.slice(-1) != "/") {
                        root = root+"/";
                    }
                    if (this.url.charAt(0) == "/") {
                        root += this.url.slice(1);
                    } else {
                        root += this.url;
                    }
                    return "["+this.method+"] "+root;
                } else {
                    return "http";
                }
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            oneditprepare: function() {
                var root = '/';//RED.settings.httpNodeRoot;
                if (root.slice(-1) == "/") {
                    root = root.slice(0,-1);
                }
                if (root == "") {
                    $("#node-input-tip").hide();
                } else {
                    $("#node-input-path").html(root);
                    $("#node-input-tip").show();
                }
                if(!RED.nodes.getType("swagger-doc")){
                    $('.row-swagger-doc').hide();
                }
                $("#node-input-method").change(function() {
                    if ($(this).val() === "post") {
                        $(".form-row-http-in-upload").show();
                    } else {
                        $(".form-row-http-in-upload").hide();
                    }
                }).change();


            }

        });

        RED.nodes.registerType('http response',{
            category: 'output',
            color:"rgb(231, 231, 174)",
            defaults: {
                name: {value:""},
                // statusCode: {value:"",validate: RED.validators.number(true)},
                headers: {value:{}}
            },
            inputs:1,
            outputs:0,
            align: "right",
            icon: "white-globe.png",
            label: function() {
                return this.name||("http"+(this.statusCode?" ("+this.statusCode+")":""));
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            oneditprepare: function() {
                function resizeRule(rule) {
                    var newWidth = rule.width();
                    rule.find('.red-ui-typedInput').typedInput("width",(newWidth-15)/2);
                }
                var headerList = $("#node-input-headers-container").css('min-height','150px').css('min-width','450px').editableList({
                    addItem: function(container,i,header) {
                        var row = $('<div/>').css({
                            overflow: 'hidden',
                            whiteSpace: 'nowrap'
                        }).appendTo(container);

                        var propertyName = $('<input/>',{class:"node-input-header-name",type:"text"})
                            .appendTo(row)
                            .typedInput({types:headerTypes});

                        var propertyValue = $('<input/>',{class:"node-input-header-value",type:"text",style:"margin-left: 10px"})
                            .appendTo(row)
                            .typedInput({types:
                                header.h === 'content-type'?contentTypes:[{value:"other",label:"other",icon:"red/images/typedInput/az.png"}]
                            });

                        var matchedType = headerTypes.filter(function(ht) {
                            return ht.value === header.h
                        });
                        if (matchedType.length === 0) {
                            propertyName.typedInput('type','other');
                            propertyName.typedInput('value',header.h);
                            propertyValue.typedInput('value',header.v);
                        } else {
                            propertyName.typedInput('type',header.h);

                            if (header.h === "content-type") {
                                matchedType = contentTypes.filter(function(ct) {
                                    return ct.value === header.v;
                                });
                                if (matchedType.length === 0) {
                                    propertyValue.typedInput('type','other');
                                    propertyValue.typedInput('value',header.v);
                                } else {
                                    propertyValue.typedInput('type',header.v);
                                }
                            } else {
                                propertyValue.typedInput('value',header.v);
                            }
                        }

                        matchedType = headerTypes.filter(function(ht) {
                            return ht.value === header.h
                        });
                        if (matchedType.length === 0) {
                            propertyName.typedInput('type','other');
                            propertyName.typedInput('value',header.h);
                        } else {
                            propertyName.typedInput('type',header.h);
                        }

                        propertyName.on('change',function(event) {
                            var type = propertyName.typedInput('type');
                            if (type === 'content-type') {
                                propertyValue.typedInput('types',contentTypes);
                            } else {
                                propertyValue.typedInput('types',[{value:"other",label:"other",icon:"red/images/typedInput/az.png"}]);
                            }
                        });



                        resizeRule(container);
                    },
                    resizeItem: resizeRule,
                    removable: true
                });

                if (this.headers) {
                    for (var key in this.headers) {
                        if (this.headers.hasOwnProperty(key)) {
                            headerList.editableList('addItem',{h:key,v:this.headers[key]});
                        }
                    }
                }
            },
            oneditsave: function() {
                var headers = $("#node-input-headers-container").editableList('items');
                var node = this;
                node.headers = {};
                headers.each(function(i) {
                    var header = $(this);
                    var keyType = header.find(".node-input-header-name").typedInput('type');
                    var keyValue = header.find(".node-input-header-name").typedInput('value');
                    var valueType = header.find(".node-input-header-value").typedInput('type');
                    var valueValue = header.find(".node-input-header-value").typedInput('value');
                    var key = keyType;
                    var value = valueType;
                    if (keyType === 'other') {
                        key = keyValue;
                    }
                    if (valueType === 'other') {
                        value = valueValue;
                    }
                    if (key !== '') {
                        node.headers[key] = value;
                    }
                });
            },
            oneditresize: function(size) {
                var rows = $("#dialog-form>div:not(.node-input-headers-container-row)");
                var height = size.height;
                for (var i=0; i<rows.size(); i++) {
                    height -= $(rows[i]).outerHeight(true);
                }
                var editorRow = $("#dialog-form>div.node-input-headers-container-row");
                height -= (parseInt(editorRow.css("marginTop"))+parseInt(editorRow.css("marginBottom")));

                $("#node-input-headers-container").editableList('height',height);
            }
        });

        RED.nodes.registerType('http request',{
            category: 'function',
            color:"rgb(231, 231, 174)",
            defaults: {
                name: {value:""},
                method:{value:"GET"},
                ret: {value:"txt"},
                url:{value:"",validate:function(v) { return (v.trim().length === 0) || (v.indexOf("://") === -1) || (v.trim().indexOf("http") === 0)} },
                tls: {type:"tls-config",required: false}
            },
            credentials: {
                user: {type:"text"},
                password: {type: "password"}
            },
            inputs:1,
            outputs:1,
            outputLabels: function(i) {
                return ({txt:"UTF8 string", bin:"binary buffer", obj:"parsed JSON object"}[this.ret]);
            },
            icon: "white-globe.png",
            label: function() {
                return this.name||this._("httpin.httpreq");
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            oneditprepare: function() {
                $("#node-input-useAuth").change(function() {
                    if ($(this).is(":checked")) {
                        $(".node-input-useAuth-row").show();
                    } else {
                        $(".node-input-useAuth-row").hide();
                        $('#node-input-user').val('');
                        $('#node-input-password').val('');
                    }
                });
                if (this.credentials.user || this.credentials.has_password) {
                    $('#node-input-useAuth').prop('checked', true);
                } else {
                    $('#node-input-useAuth').prop('checked', false);
                }
                $("#node-input-useAuth").change();

                function updateTLSOptions() {
                    if ($("#node-input-usetls").is(':checked')) {
                        $("#node-row-tls").show();
                    } else {
                        $("#node-row-tls").hide();
                    }
                }
                if (this.tls) {
                    $('#node-input-usetls').prop('checked', true);
                } else {
                    $('#node-input-usetls').prop('checked', false);
                }
                updateTLSOptions();
                $("#node-input-usetls").on("click",function() {
                    updateTLSOptions();
                });
                $("#node-input-ret").change(function() {
                    if ($("#node-input-ret").val() === "obj") {
                        $("#tip-json").show();
                    } else {
                        $("#tip-json").hide();
                    }
                });
            },
            oneditsave: function() {
                if (!$("#node-input-usetls").is(':checked')) {
                    $("#node-input-tls").val("_ADD_");
                }
            }
        });

        function ws_oneditprepare() {
            $("#websocket-client-row").hide();
            $("#node-input-mode").change(function() {
                if ( $("#node-input-mode").val() === 'client') {
                    $("#websocket-server-row").hide();
                    $("#websocket-client-row").show();
                }
                else {
                    $("#websocket-server-row").show();
                    $("#websocket-client-row").hide();
                }
            });

            if (this.client) {
                $("#node-input-mode").val('client').change();
            }
            else {
                $("#node-input-mode").val('server').change();
            }
        }

        function ws_oneditsave() {
            if ($("#node-input-mode").val() === 'client') {
                $("#node-input-server").append('<option value="">Dummy</option>');
                $("#node-input-server").val('');
            }
            else {
                $("#node-input-client").append('<option value="">Dummy</option>');
                $("#node-input-client").val('');
            }
        }

        function ws_label() {
            var nodeid = (this.client)?this.client:this.server;
            var wsNode = RED.nodes.node(nodeid);
            return this.name||(wsNode?"[ws] "+wsNode.label():"websocket");
        }

        function ws_validateserver() {
            if ($("#node-input-mode").val() === 'client' || (this.client && !this.server)) {
                return true;
            }
            else {
                return RED.nodes.node(this.server) != null;
            }
        }

        function ws_validateclient() {
            if ($("#node-input-mode").val() === 'client' || (this.client && !this.server)) {
                return RED.nodes.node(this.client) != null;
            }
            else {
                return true;
            }
        }

        RED.nodes.registerType('websocket in',{
            category: 'input',
            defaults: {
                name: {value:""},
                server: {type:"websocket-listener", validate: ws_validateserver},
                client: {type:"websocket-client", validate: ws_validateclient}
            },
            color:"rgb(215, 215, 160)",
            inputs:0,
            outputs:1,
            icon: "white-globe.png",
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            label: ws_label,
            oneditsave: ws_oneditsave,
            oneditprepare: ws_oneditprepare
        });

        RED.nodes.registerType('websocket out',{
            category: 'output',
            defaults: {
                name: {value:""},
                server: {type:"websocket-listener", validate: ws_validateserver},
                client: {type:"websocket-client", validate: ws_validateclient}
            },
            color:"rgb(215, 215, 160)",
            inputs:1,
            outputs:0,
            icon: "white-globe.png",
            align: "right",
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            label: ws_label,
            oneditsave: ws_oneditsave,
            oneditprepare: ws_oneditprepare
        });

        RED.nodes.registerType('websocket-listener',{
            category: 'config',
            defaults: {
                // path: {value:"",required:true,validate:RED.validators.regex(/^((?!\/debug\/ws).)*$/)},
                wholemsg: {value:"false"}
            },
            inputs:0,
            outputs:0,
            label: function() {
                var root = '/';//RED.settings.httpNodeRoot;
                if (root.slice(-1) != "/") {
                    root = root+"/";
                }
                if (this.path.charAt(0) == "/") {
                    root += this.path.slice(1);
                } else {
                    root += this.path;
                }
                return root;
            },
            oneditprepare: function() {
                var root = '/';//RED.settings.httpNodeRoot;
                if (root.slice(-1) == "/") {
                    root = root.slice(0,-1);
                }
                if (root === "") {
                    $("#node-config-ws-tip").hide();
                } else {
                    $("#node-config-ws-path").html(root);
                    $("#node-config-ws-tip").show();
                }
            }
        });

        RED.nodes.registerType('websocket-client',{
            category: 'config',
            defaults: {
                // path: {value:"",required:true,validate:RED.validators.regex(/^((?!\/debug\/ws).)*$/)},
                tls: {type:"tls-config",required: false},
                wholemsg: {value:"false"}
            },
            inputs:0,
            outputs:0,
            label: function() {
                return this.path;
            },
            oneditprepare: function() {
                $("#node-config-input-path").on("change keyup paste",function() {
                    $(".node-config-row-tls").toggle(/^wss:/i.test($(this).val()))
                });
                $("#node-config-input-path").change();
            },
            oneditsave: function() {
                if (!/^wss:/i.test($("#node-config-input-path").val())) {
                    $("#node-config-input-tls").val("_ADD_");
                }
            }
        });

        RED.nodes.registerType('watch',{
            category: 'advanced-input',
            defaults: {
                name: {value:""},
                files: {value:"",required:true},
                recursive: {value:""}
            },
            color:"BurlyWood",
            inputs:0,
            outputs:1,
            icon: "watch.png",
            label: function() {
                return this.name||this.files||this._("watch.watch");
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            }
        });

        RED.nodes.registerType('tcp in',{
            category: 'input',
            color:"Silver",
            defaults: {
                name: {value:""},
                server: {value:"server",required:true},
                host: {value:"",validate:function(v) { return (this.server == "server")||v.length > 0;} },
                // port: {value:"",required:true,validate:RED.validators.number()},
                datamode:{value:"stream"},
                datatype:{value:"buffer"},
                newline:{value:""},
                topic: {value:""},
                base64: {/*deprecated*/ value:false,required:true}
            },
            inputs:0,
            outputs:1,
            icon: "bridge-dash.png",
            label: function() {
                return this.name || "tcp:"+(this.host?this.host+":":"")+this.port;
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            oneditprepare: function() {
                var updateOptions = function() {
                    var sockettype = $("#node-input-server").val();
                    if (sockettype == "client") {
                        $("#node-input-host-row").show();
                    } else {
                        $("#node-input-host-row").hide();
                    }
                    var datamode = $("#node-input-datamode").val();
                    var datatype = $("#node-input-datatype").val();
                    if (datamode == "stream") {
                        if (datatype == "utf8") {
                            $("#node-row-newline").show();
                        } else {
                            $("#node-row-newline").hide();
                        }
                    } else {
                        $("#node-row-newline").hide();
                    }
                };
                updateOptions();
                $("#node-input-server").change(updateOptions);
                $("#node-input-datatype").change(updateOptions);
                $("#node-input-datamode").change(updateOptions);
            }
        });

        RED.nodes.registerType('tcp out',{
            category: 'output',
            color:"Silver",
            defaults: {
                host: {value:"",validate:function(v) { return (this.beserver != "client")||v.length > 0;} },
                // port: {value:"",validate:function(v) { return (this.beserver == "reply")||RED.validators.number()(v); } },
                beserver: {value:"client",required:true},
                base64: {value:false,required:true},
                end: {value:false,required:true},
                name: {value:""}
            },
            inputs:1,
            outputs:0,
            icon: "bridge-dash.png",
            align: "right",
            label: function() {
                return this.name || "tcp:"+(this.host?this.host+":":"")+this.port;
            },
            labelStyle: function() {
                return (this.name)?"node_label_italic":"";
            },
            oneditprepare: function() {
                var updateOptions = function() {
                    var sockettype = $("#node-input-beserver").val();
                    if (sockettype == "reply") {
                        $("#node-input-port-row").hide();
                        $("#node-input-host-row").hide();
                        $("#node-input-end-row").hide();
                    } else {
                        $("#node-input-port-row").show();
                        $("#node-input-end-row").show();
                    }

                    if (sockettype == "client") {
                        $("#node-input-host-row").show();
                    } else {
                        $("#node-input-host-row").hide();
                    }
                };
                updateOptions();
                $("#node-input-beserver").change(updateOptions);
            }
        });


        RED.nodes.registerType('tcp request',{
            category: 'function',
            color:"Silver",
            defaults: {
                server: {value:""},
                // port: {value:"",validate:RED.validators.regex(/^(\d*|)$/)},
                out: {value:"time",required:true},
                splitc: {value:"0",required:true},
                name: {value:""}
            },
            inputs:1,
            outputs:1,
            icon: "bridge-dash.png",
            label: function() {
                return this.name || "tcp:"+(this.server?this.server+":":"")+this.port;
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            oneditprepare: function() {
                var previous = null;
                $("#node-input-out").on('focus', function () { previous = this.value; }).change(function() {
                    if (previous === null) { previous = $("#node-input-out").val(); }
                    if ($("#node-input-out").val() == "char") {
                        if (previous != "char") { $("#node-input-splitc").val("\\n"); }
                        $("#node-units").text("");
                    }
                    else if ($("#node-input-out").val() == "time") {
                        if (previous != "time") { $("#node-input-splitc").val("0"); }
                        $("#node-units").text(RED._("node-red:tcpin.label.ms"));
                    }
                    else if ($("#node-input-out").val() == "immed") {
                        if (previous != "immed") { $("#node-input-splitc").val(" "); }
                        $("#node-units").text("");
                    }
                    else if ($("#node-input-out").val() == "count") {
                        if (previous != "count") { $("#node-input-splitc").val("12"); }
                        $("#node-units").text(RED._("node-red:tcpin.label.chars"));
                    }
                    else {
                        if (previous != "sit") { $("#node-input-splitc").val(" "); }
                        $("#node-units").text("");
                    }
                });
            }
        });

        RED.nodes.registerType('udp in',{
            category: 'input',
            color:"Silver",
            defaults: {
                name: {value:""},
                iface: {value:""},
                // port: {value:"",required:true,validate:RED.validators.number()},
                ipv: {value:"udp4"},
                multicast: {value:"false"},
                group: {value:"",validate:function(v) { return (this.multicast !== "true")||v.length > 0;} },
                datatype: {value:"buffer",required:true}
            },
            inputs:0,
            outputs:1,
            icon: "bridge-dash.png",
            label: function() {
                if (this.multicast=="false") {
                    return this.name||"udp "+this.port;
                }
                else {
                    return this.name||"udp "+(this.group+":"+this.port);
                }
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            oneditprepare: function() {
                $("#node-input-multicast").change(function() {
                    var id = $("#node-input-multicast").val();
                    if (id == "false") {
                        $(".node-input-group").hide();
                        $(".node-input-iface").hide();
                    }
                    else {
                        $(".node-input-group").show();
                        $(".node-input-iface").show();
                    }
                });
                $("#node-input-multicast").change();

                var porttip = this._("udp.tip.port");
                var alreadyused = this._("udp.errors.alreadyused");
                var portsInUse = {};
                $.getJSON('udp-ports/'+this.id,function(data) {
                    portsInUse = data || {};
                    $('#udpporttip').html(porttip + data);
                });
                $("#node-input-port").change(function() {
                    var portnew = $("#node-input-port").val();
                    if (portsInUse.hasOwnProperty($("#node-input-port").val())) {
                        RED.notify(alreadyused+" "+$("#node-input-port").val(),"warn");
                    }
                });
            }
        });

        RED.nodes.registerType('udp out',{
            category: 'output',
            color:"Silver",
            defaults: {
                name: {value:""},
                addr: {value:""},
                iface: {value:""},
                port: {value:""},
                ipv: {value:"udp4"},
                outport: {value:""},
                base64: {value:false,required:true},
                multicast: {value:"false"}
            },
            inputs:1,
            outputs:0,
            icon: "bridge-dash.png",
            align: "right",
            label: function() {
                return this.name||"udp "+(this.addr+":"+this.port);
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            oneditprepare: function() {
                var addresslabel = this._("udp.label.address");
                var addressph = this._("udp.placeholder.address");
                var grouplabel = this._("udp.label.group");
                var bindrandom = this._("udp.bind.random");
                var bindtarget = this._("udp.bind.target");

                var type = this.outport===""?"random":"fixed";
                $("#node-input-outport-type").val(type);

                $("#node-input-outport-type").change(function() {
                    var type = $(this).val();
                    if (type == "random") {
                        $("#node-input-outport").val("").hide();
                    } else {
                        $("#node-input-outport").show();
                    }
                });
                $("#node-input-outport-type").change();

                $("#node-input-multicast").change(function() {
                    var id = $("#node-input-multicast").val();
                    if (id === "multi") {
                        $(".node-input-iface").show();
                        $("#node-input-addr-label").html('<i class="fa fa-list"></i> ' + grouplabel);
                        $("#node-input-addr")[0].placeholder = '225.0.18.83';
                    }
                    else if (id === "broad") {
                        $(".node-input-iface").hide();
                        $("#node-input-addr-label").html('<i class="fa fa-list"></i> ' + addresslabel);
                        $("#node-input-addr")[0].placeholder = '255.255.255.255';
                    }
                    else {
                        $(".node-input-iface").hide();
                        $("#node-input-addr-label").html('<i class="fa fa-list"></i> ' + addresslabel);
                        $("#node-input-addr")[0].placeholder = addressph;
                    }
                    var type = $(this).val();
                    if (type == "false") {
                        $("#node-input-outport-type-random").html(bindrandom);
                    } else {
                        $("#node-input-outport-type-random").html(bindtarget);
                    }
                });
                $("#node-input-multicast").change();
            }
        });

        var operators = [
            {v:"eq",t:"==",kind:'V'},
            {v:"neq",t:"!=",kind:'V'},
            {v:"lt",t:"<",kind:'V'},
            {v:"lte",t:"<=",kind:'V'},
            {v:"gt",t:">",kind:'V'},
            {v:"gte",t:">=",kind:'V'},
            {v:"btwn",t:"switch.rules.btwn",kind:'V'},
            {v:"cont",t:"switch.rules.cont",kind:'V'},
            {v:"regex",t:"switch.rules.regex",kind:'V'},
            {v:"true",t:"switch.rules.true",kind:'V'},
            {v:"false",t:"switch.rules.false",kind:'V'},
            {v:"null",t:"switch.rules.null",kind:'V'},
            {v:"nnull",t:"switch.rules.nnull",kind:'V'},
            {v:"istype",t:"switch.rules.istype",kind:'V'},
            {v:"empty",t:"switch.rules.empty",kind:'V'},
            {v:"nempty",t:"switch.rules.nempty",kind:'V'},
            {v:"head",t:"switch.rules.head",kind:'S'},
            {v:"index",t:"switch.rules.index",kind:'S'},
            {v:"tail",t:"switch.rules.tail",kind:'S'},
            {v:"jsonata_exp",t:"switch.rules.exp",kind:'O'},
            {v:"else",t:"switch.rules.else",kind:'O'}
        ];

        function clipValueLength(v) {
            if (v.length > 15) {
                return v.substring(0,15)+"...";
            }
            return v;
        }
        function prop2name(key) {
            var result = RED.utils.parseContextKey(key);
            return result.key;
        }
        function getValueLabel(t,v) {
            if (t === 'str') {
                return '"'+clipValueLength(v)+'"';
            } else if (t === 'msg') {
                return t+"."+clipValueLength(v);
            } else if (t === 'flow' || t === 'global') {
                return t+"."+clipValueLength(prop2name(v));
            }
            return clipValueLength(v);
        }
        RED.nodes.registerType('switch', {
            color: "#E2D96E",
            category: 'function',
            defaults: {
                name: {value:""},
                // property: {value:"payload", required:true, validate: RED.validators.typedInput("propertyType")},
                propertyType: { value:"msg" },
                rules: {value:[{t:"eq", v:"", vt:"str"}]},
                checkall: {value:"true", required:true},
                repair: {value:false},
                outputs: {value:1}
            },
            inputs: 1,
            outputs: 1,
            outputLabels: function(index) {
                var rule = this.rules[index];
                var label = "";
                if (rule) {
                    for (var i=0;i<operators.length;i++) {
                        if (operators[i].v === rule.t) {
                            label = /^switch/.test(operators[i].t)?this._(operators[i].t):operators[i].t;
                            break;
                        }
                    }
                    if ((rule.t === 'btwn') || (rule.t === 'index')) {
                        label += " "+getValueLabel(rule.vt,rule.v)+" & "+getValueLabel(rule.v2t,rule.v2);
                    } else if (rule.t !== 'true' && rule.t !== 'false' && rule.t !== 'null' && rule.t !== 'nnull' && rule.t !== 'empty' && rule.t !== 'nempty' && rule.t !== 'else' ) {
                        label += " "+getValueLabel(rule.vt,rule.v);
                    }
                    return label;
                }
            },
            icon: "switch.png",
            label: function() {
                return this.name||this._("switch.switch");
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            oneditprepare: function() {
                var node = this;
                var previousValueType = {value:"prev",label:this._("inject.previous"),hasValue:false};

                $("#node-input-property").typedInput({default:this.propertyType||'msg',types:['msg','flow','global','jsonata']});
                var outputCount = $("#node-input-outputs").val("{}");

                var andLabel = this._("switch.and");
                var caseLabel = this._("switch.ignorecase");

                function resizeRule(rule) {
                    var newWidth = rule.width();
                    var selectField = rule.find("select");
                    var type = selectField.val()||"";
                    var valueField = rule.find(".node-input-rule-value");
                    var typeField = rule.find(".node-input-rule-type-value");
                    var numField = rule.find(".node-input-rule-num-value");
                    var expField = rule.find(".node-input-rule-exp-value");
                    var btwnField1 = rule.find(".node-input-rule-btwn-value");
                    var btwnField2 = rule.find(".node-input-rule-btwn-value2");
                    var selectWidth;
                    if (type.length < 4) {
                        selectWidth = 60;
                    } else if (type === "regex") {
                        selectWidth = 147;
                    } else {
                        selectWidth = 120;
                    }
                    selectField.width(selectWidth);
                    if ((type === "btwn") || (type === "index")) {
                        btwnField1.typedInput("width",(newWidth-selectWidth-70));
                        btwnField2.typedInput("width",(newWidth-selectWidth-70));
                    } else if ((type === "head") || (type === "tail")) {
                        numField.typedInput("width",(newWidth-selectWidth-70));
                    } else if (type === "jsonata_exp") {
                        expField.typedInput("width",(newWidth-selectWidth-70));
                    } else if (type === "istype") {
                        typeField.typedInput("width",(newWidth-selectWidth-70));
                    } else {
                        if (type === "true" || type === "false" || type === "null" || type === "nnull" || type === "empty" || type === "nempty" || type === "else") {
                            // valueField.hide();
                        } else {
                            valueField.typedInput("width",(newWidth-selectWidth-70));
                        }
                    }
                }

                $("#node-input-rule-container").css('min-height','250px').css('min-width','450px').editableList({
                    addItem: function(container,i,opt) {
                        if (!opt.hasOwnProperty('r')) {
                            opt.r = {};
                        }
                        var rule = opt.r;
                        if (!rule.hasOwnProperty('t')) {
                            rule.t = 'eq';
                        }
                        if (!opt.hasOwnProperty('i')) {
                            opt._i = Math.floor((0x99999-0x10000)*Math.random()).toString();
                        }
                        container.css({
                            overflow: 'hidden',
                            whiteSpace: 'nowrap'
                        });
                        var row = $('<div/>').appendTo(container);
                        var row2 = $('<div/>',{style:"padding-top: 5px; padding-left: 175px;"}).appendTo(container);
                        var row3 = $('<div/>',{style:"padding-top: 5px; padding-left: 102px;"}).appendTo(container);
                        var selectField = $('<select/>',{style:"width:120px; margin-left: 5px; text-align: center;"}).appendTo(row);
                        var group0 = $('<optgroup/>', { label: "value rules" }).appendTo(selectField);
                        for (var d in operators) {
                            if(operators[d].kind === 'V') {
                                group0.append($("<option></option>").val(operators[d].v).text(/^switch/.test(operators[d].t)?node._(operators[d].t):operators[d].t));
                            }
                        }
                        var group1 = $('<optgroup/>', { label: "sequence rules" }).appendTo(selectField);
                        for (var d in operators) {
                            if(operators[d].kind === 'S') {
                                group1.append($("<option></option>").val(operators[d].v).text(/^switch/.test(operators[d].t)?node._(operators[d].t):operators[d].t));
                            }
                        }
                        for (var d in operators) {
                            if(operators[d].kind === 'O') {
                                selectField.append($("<option></option>").val(operators[d].v).text(/^switch/.test(operators[d].t)?node._(operators[d].t):operators[d].t));
                            }
                        }
                        var valueField = $('<input/>',{class:"node-input-rule-value",type:"text",style:"margin-left: 5px;"}).appendTo(row).typedInput({default:'str',types:['msg','flow','global','str','num','jsonata','env',previousValueType]});
                        var numValueField = $('<input/>',{class:"node-input-rule-num-value",type:"text",style:"margin-left: 5px;"}).appendTo(row).typedInput({default:'num',types:['flow','global','num','jsonata','env']});
                        var expValueField = $('<input/>',{class:"node-input-rule-exp-value",type:"text",style:"margin-left: 5px;"}).appendTo(row).typedInput({default:'jsonata',types:['jsonata']});
                        var btwnValueField = $('<input/>',{class:"node-input-rule-btwn-value",type:"text",style:"margin-left: 5px;"}).appendTo(row).typedInput({default:'num',types:['msg','flow','global','str','num','jsonata','env',previousValueType]});
                        var btwnAndLabel = $('<span/>',{class:"node-input-rule-btwn-label"}).text(" "+andLabel+" ").appendTo(row3);
                        var btwnValue2Field = $('<input/>',{class:"node-input-rule-btwn-value2",type:"text",style:"margin-left:2px;"}).appendTo(row3).typedInput({default:'num',types:['msg','flow','global','str','num','jsonata','env',previousValueType]});
                        var typeValueField = $('<input/>',{class:"node-input-rule-type-value",type:"text",style:"margin-left: 5px;"}).appendTo(row)
                            .typedInput({default:'string',types:[
                                {value:"string",label:"string",hasValue:false},
                                {value:"number",label:"number",hasValue:false},
                                {value:"boolean",label:"boolean",hasValue:false},
                                {value:"array",label:"array",hasValue:false},
                                {value:"buffer",label:"buffer",hasValue:false},
                                {value:"object",label:"object",hasValue:false},
                                {value:"json",label:"JSON string",hasValue:false},
                                {value:"undefined",label:"undefined",hasValue:false},
                                {value:"null",label:"null",hasValue:false}
                            ]});
                        var finalspan = $('<span/>',{style:"float: right;margin-top: 6px;"}).appendTo(row);
                        finalspan.append(' &#8594; <span class="node-input-rule-index">'+(i+1)+'</span> ');
                        var caseSensitive = $('<input/>',{id:"node-input-rule-case-"+i,class:"node-input-rule-case",type:"checkbox",style:"width:auto;vertical-align:top"}).appendTo(row2);
                        $('<label/>',{for:"node-input-rule-case-"+i,style:"margin-left: 3px;"}).text(caseLabel).appendTo(row2);
                        selectField.change(function() {
                            resizeRule(container);
                            var type = selectField.val();
                            if ((type === "btwn") || (type === "index")) {
                                valueField.typedInput('hide');
                                expValueField.typedInput('hide');
                                numValueField.typedInput('hide');
                                typeValueField.typedInput('hide');
                                btwnValueField.typedInput('show');
                            } else if ((type === "head") || (type === "tail")) {
                                btwnValueField.typedInput('hide');
                                btwnValue2Field.typedInput('hide');
                                expValueField.typedInput('hide');
                                numValueField.typedInput('show');
                                typeValueField.typedInput('hide');
                                valueField.typedInput('hide');
                            } else if (type === "jsonata_exp") {
                                btwnValueField.typedInput('hide');
                                btwnValue2Field.typedInput('hide');
                                expValueField.typedInput('show');
                                numValueField.typedInput('hide');
                                typeValueField.typedInput('hide');
                                valueField.typedInput('hide');
                            } else {
                                btwnValueField.typedInput('hide');
                                expValueField.typedInput('hide');
                                numValueField.typedInput('hide');
                                typeValueField.typedInput('hide');
                                valueField.typedInput('hide');
                                if (type === "true" || type === "false" || type === "null" || type === "nnull" || type === "empty" || type === "nempty" || type === "else") {
                                    valueField.typedInput('hide');
                                    typeValueField.typedInput('hide');
                                }
                                else
                                if (type === "istype") {
                                    valueField.typedInput('hide');
                                    typeValueField.typedInput('show');
                                }
                                else {
                                    typeValueField.typedInput('hide');
                                    valueField.typedInput('show');
                                }
                            }
                            if (type === "regex") {
                                row2.show();
                                row3.hide();
                            } else if ((type === "btwn") || (type === "index")) {
                                row2.hide();
                                row3.show();
                                btwnValue2Field.typedInput('show');
                            } else {
                                row2.hide();
                                row3.hide();
                            }
                        });
                        selectField.val(rule.t);
                        if ((rule.t == "btwn") || (rule.t == "index")) {
                            btwnValueField.typedInput('value',rule.v);
                            btwnValueField.typedInput('type',rule.vt||'num');
                            btwnValue2Field.typedInput('value',rule.v2);
                            btwnValue2Field.typedInput('type',rule.v2t||'num');
                        } else if ((rule.t === "head") || (rule.t === "tail")) {
                            numValueField.typedInput('value',rule.v);
                            numValueField.typedInput('type',rule.vt||'num');
                        } else if (rule.t === "istype") {
                            typeValueField.typedInput('value',rule.vt);
                            typeValueField.typedInput('type',rule.vt);
                        } else if (rule.t === "jsonata_exp") {
                            expValueField.typedInput('value',rule.v);
                            expValueField.typedInput('type',rule.vt||'jsonata');
                        } else if (typeof rule.v != "undefined") {
                            valueField.typedInput('value',rule.v);
                            valueField.typedInput('type',rule.vt||'str');
                        }
                        if (rule.case) {
                            caseSensitive.prop('checked',true);
                        } else {
                            caseSensitive.prop('checked',false);
                        }
                        selectField.change();

                        var currentOutputs = JSON.parse(outputCount.val()||"{}");
                        currentOutputs[opt.hasOwnProperty('i')?opt.i:opt._i] = i;
                        outputCount.val(JSON.stringify(currentOutputs));
                    },
                    removeItem: function(opt) {
                        var currentOutputs = JSON.parse(outputCount.val()||"{}");
                        if (opt.hasOwnProperty('i')) {
                            currentOutputs[opt.i] = -1;
                        } else {
                            delete currentOutputs[opt._i];
                        }
                        var rules = $("#node-input-rule-container").editableList('items');
                        rules.each(function(i) {
                            $(this).find(".node-input-rule-index").html(i+1);
                            var data = $(this).data('data');
                            currentOutputs[data.hasOwnProperty('i')?data.i:data._i] = i;
                        });
                        outputCount.val(JSON.stringify(currentOutputs));
                    },
                    resizeItem: resizeRule,
                    sortItems: function(rules) {
                        var currentOutputs = JSON.parse(outputCount.val()||"{}");
                        var rules = $("#node-input-rule-container").editableList('items');
                        rules.each(function(i) {
                            $(this).find(".node-input-rule-index").html(i+1);
                            var data = $(this).data('data');
                            currentOutputs[data.hasOwnProperty('i')?data.i:data._i] = i;
                        });
                        outputCount.val(JSON.stringify(currentOutputs));
                    },
                    sortable: true,
                    removable: true
                });

                for (var i=0;i<this.rules.length;i++) {
                    var rule = this.rules[i];
                    $("#node-input-rule-container").editableList('addItem',{r:rule,i:i});
                }
            },
            oneditsave: function() {
                var rules = $("#node-input-rule-container").editableList('items');
                var ruleset;
                var node = this;
                node.rules = [];
                rules.each(function(i) {
                    var ruleData = $(this).data('data');
                    var rule = $(this);
                    var type = rule.find("select").val();
                    var r = {t:type};
                    if (!(type === "true" || type === "false" || type === "null" || type === "nnull" || type === "empty" || type === "nempty" || type === "else")) {
                        if ((type === "btwn") || (type === "index")) {
                            r.v = rule.find(".node-input-rule-btwn-value").typedInput('value');
                            r.vt = rule.find(".node-input-rule-btwn-value").typedInput('type');
                            r.v2 = rule.find(".node-input-rule-btwn-value2").typedInput('value');
                            r.v2t = rule.find(".node-input-rule-btwn-value2").typedInput('type');
                        } else if ((type === "head") || (type === "tail")) {
                            r.v = rule.find(".node-input-rule-num-value").typedInput('value');
                            r.vt = rule.find(".node-input-rule-num-value").typedInput('type');
                        } else if (type === "istype") {
                            r.v = rule.find(".node-input-rule-type-value").typedInput('type');
                            r.vt = rule.find(".node-input-rule-type-value").typedInput('type');
                        } else if (type === "jsonata_exp") {
                            r.v = rule.find(".node-input-rule-exp-value").typedInput('value');
                            r.vt = rule.find(".node-input-rule-exp-value").typedInput('type');
                        } else {
                            r.v = rule.find(".node-input-rule-value").typedInput('value');
                            r.vt = rule.find(".node-input-rule-value").typedInput('type');
                        }
                        if (type === "regex") {
                            r.case = rule.find(".node-input-rule-case").prop("checked");
                        }
                    }
                    node.rules.push(r);
                });
                this.propertyType = $("#node-input-property").typedInput('type');
            },
            oneditresize: function(size) {
                var rows = $("#dialog-form>div:not(.node-input-rule-container-row)");
                var height = size.height;
                for (var i=0;i<rows.size();i++) {
                    height -= $(rows[i]).outerHeight(true);
                }
                var editorRow = $("#dialog-form>div.node-input-rule-container-row");
                height -= (parseInt(editorRow.css("marginTop"))+parseInt(editorRow.css("marginBottom")));
                $("#node-input-rule-container").editableList('height',height);
            }
        });

        RED.nodes.registerType('change', {
            color: "#E2D96E",
            category: 'function',
            defaults: {
                name: {value:""},
                rules:{value:[{t:"set",p:"payload",pt:"msg",to:"",tot:"str"}]},
                // legacy
                action: {value:""},
                property: {value:""},
                from: {value:""},
                to: {value:""},
                reg: {value:false}
            },
            inputs: 1,
            outputs: 1,
            icon: "swap.png",
            label: function() {
                function prop2name(type, key) {
                    var result = RED.utils.parseContextKey(key);
                    return type +"." +result.key;
                }
                if (this.name) {
                    return this.name;
                }
                if (!this.rules) {
                    if (this.action === "replace") {
                        return this._("change.label.set",{property:"msg."+this.property});
                    } else if (this.action === "change") {
                        return this._("change.label.change",{property:"msg."+this.property});
                    } else if (this.action === "move") {
                        return this._("change.label.move",{property:"msg."+this.property});
                    } else {
                        return this._("change.label.delete",{property:"msg."+this.property});
                    }
                } else {
                    if (this.rules.length == 1) {
                        if (this.rules[0].t === "set") {
                            return this._("change.label.set",{property:prop2name((this.rules[0].pt||"msg"), this.rules[0].p)});
                        } else if (this.rules[0].t === "change") {
                            return this._("change.label.change",{property:prop2name((this.rules[0].pt||"msg"), this.rules[0].p)});
                        } else if (this.rules[0].t === "move") {
                            return this._("change.label.move",{property:prop2name((this.rules[0].pt||"msg"), this.rules[0].p)});
                        } else {
                            return this._("change.label.delete",{property:prop2name((this.rules[0].pt||"msg"), this.rules[0].p)});
                        }
                    } else {
                        return this._("change.label.changeCount",{count:this.rules.length});
                    }
                }
            },
            labelStyle: function() {
                return this.name ? "node_label_italic" : "";
            },
            oneditprepare: function() {
                var set = this._("change.action.set");
                var change = this._("change.action.change");
                var del = this._("change.action.delete");
                var move = this._("change.action.move");
                var to = this._("change.action.to");
                var search = this._("change.action.search");
                var replace = this._("change.action.replace");
                var regex = this._("change.label.regex");

                function resizeRule(rule) {
                    var newWidth = rule.width();
                    rule.find('.red-ui-typedInput').typedInput("width",newWidth-130);

                }
                $('#node-input-rule-container').css('min-height','300px').css('min-width','450px').editableList({
                    addItem: function(container,i,opt) {
                        var rule = opt;
                        if (!rule.hasOwnProperty('t')) {
                            rule = {t:"set",p:"payload",to:"",tot:"str"};
                        }
                        if (rule.t === "change" && rule.re) {
                            rule.fromt = 're';
                            delete rule.re;
                        }
                        if (rule.t === "set" && !rule.tot) {
                            if (rule.to.indexOf("msg.") === 0 && !rule.tot) {
                                rule.to = rule.to.substring(4);
                                rule.tot = "msg";
                            } else {
                                rule.tot = "str";
                            }
                        }
                        if (rule.t === "move" && !rule.tot) {
                            rule.tot = "msg";
                        }
                        container.css({
                            overflow: 'hidden',
                            whiteSpace: 'nowrap'
                        });
                        var row1 = $('<div/>').appendTo(container);
                        var row2 = $('<div/>',{style:"margin-top:8px;"}).appendTo(container);
                        var row3 = $('<div/>',{style:"margin-top:8px;"}).appendTo(container);
                        var row4 = $('<div/>',{style:"margin-top:8px;"}).appendTo(container);

                        var selectField = $('<select/>',{class:"node-input-rule-type",style:"width:110px; margin-right:10px;"}).appendTo(row1);
                        var selectOptions = [{v:"set",l:set},{v:"change",l:change},{v:"delete",l:del},{v:"move",l:move}];
                        for (var i=0; i<4; i++) {
                            selectField.append($("<option></option>").val(selectOptions[i].v).text(selectOptions[i].l));
                        }

                        var propertyName = $('<input/>',{class:"node-input-rule-property-name",type:"text"})
                            .appendTo(row1)
                            .typedInput({types:['msg','flow','global']});

                        $('<div/>',{style:"display:inline-block;text-align:right; width:120px; padding-right:10px; box-sizing:border-box;"})
                            .text(to)
                            .appendTo(row2);
                        var propertyValue = $('<input/>',{class:"node-input-rule-property-value",type:"text"})
                            .appendTo(row2)
                            .typedInput({default:'str',types:['msg','flow','global','str','num','bool','json','bin','date','jsonata','env']});

                        var row3_1 = $('<div/>').appendTo(row3);
                        $('<div/>',{style:"display:inline-block;text-align:right; width:120px; padding-right:10px; box-sizing:border-box;"})
                            .text(search)
                            .appendTo(row3_1);
                        var fromValue = $('<input/>',{class:"node-input-rule-property-search-value",type:"text"})
                            .appendTo(row3_1)
                            .typedInput({default:'str',types:['msg','flow','global','str','re','num','bool','env']});

                        var row3_2 = $('<div/>',{style:"margin-top:8px;"}).appendTo(row3);
                        $('<div/>',{style:"display:inline-block;text-align:right; width:120px; padding-right:10px; box-sizing:border-box;"})
                            .text(replace)
                            .appendTo(row3_2);
                        var toValue = $('<input/>',{class:"node-input-rule-property-replace-value",type:"text"})
                            .appendTo(row3_2)
                            .typedInput({default:'str',types:['msg','flow','global','str','num','bool','json','bin','env']});

                        $('<div/>',{style:"display:inline-block;text-align:right; width:120px; padding-right:10px; box-sizing:border-box;"})
                            .text(to)
                            .appendTo(row4);
                        var moveValue = $('<input/>',{class:"node-input-rule-property-move-value",type:"text"})
                            .appendTo(row4)
                            .typedInput({default:'msg',types:['msg','flow','global']});

                        selectField.change(function() {
                            var width = $("#node-input-rule-container").width();
                            var type = $(this).val();
                            if (type == "set") {
                                row2.show();
                                row3.hide();
                                row4.hide();
                            } else if (type == "change") {
                                row2.hide();
                                row3.show();
                                row4.hide();
                            } else if (type == "delete") {
                                row2.hide();
                                row3.hide();
                                row4.hide();
                            } else if (type == "move") {
                                row2.hide();
                                row3.hide();
                                row4.show();
                            }
                            resizeRule(container);
                        });

                        selectField.val(rule.t);
                        propertyName.typedInput('value',rule.p);
                        propertyName.typedInput('type',rule.pt);
                        propertyValue.typedInput('value',rule.to);
                        propertyValue.typedInput('type',rule.tot);
                        moveValue.typedInput('value',rule.to);
                        moveValue.typedInput('type',rule.tot);
                        fromValue.typedInput('value',rule.from);
                        fromValue.typedInput('type',rule.fromt);
                        toValue.typedInput('value',rule.to);
                        toValue.typedInput('type',rule.tot);
                        selectField.change();

                        var newWidth = $("#node-input-rule-container").width();
                        resizeRule(container);
                    },
                    resizeItem: resizeRule,
                    removable: true,
                    sortable: true
                });

                if (!this.rules) {
                    var rule = {
                        t:(this.action=="replace"?"set":this.action),
                        p:this.property,
                        pt:"msg"
                    };

                    if ((rule.t === "set")||(rule.t === "move")) {
                        rule.to = this.to;
                    } else if (rule.t === "change") {
                        rule.from = this.from;
                        rule.to = this.to;
                        rule.re = this.reg;
                    }

                    delete this.to;
                    delete this.from;
                    delete this.reg;
                    delete this.action;
                    delete this.property;

                    this.rules = [rule];
                }

                for (var i=0; i<this.rules.length; i++) {
                    var rule = this.rules[i];
                    $("#node-input-rule-container").editableList('addItem',rule);
                }
            },
            oneditsave: function() {
                var rules = $("#node-input-rule-container").editableList('items');
                var ruleset;
                var node = this;
                node.rules= [];
                rules.each(function(i) {
                    var rule = $(this);
                    var type = rule.find(".node-input-rule-type").val();
                    var r = {
                        t:type,
                        p:rule.find(".node-input-rule-property-name").typedInput('value'),
                        pt:rule.find(".node-input-rule-property-name").typedInput('type')
                    };
                    if (type === "set") {
                        r.to = rule.find(".node-input-rule-property-value").typedInput('value');
                        r.tot = rule.find(".node-input-rule-property-value").typedInput('type');
                    } else if (type === "move") {
                        r.to = rule.find(".node-input-rule-property-move-value").typedInput('value');
                        r.tot = rule.find(".node-input-rule-property-move-value").typedInput('type');
                    } else if (type === "change") {
                        r.from = rule.find(".node-input-rule-property-search-value").typedInput('value');
                        r.fromt = rule.find(".node-input-rule-property-search-value").typedInput('type');
                        r.to = rule.find(".node-input-rule-property-replace-value").typedInput('value');
                        r.tot = rule.find(".node-input-rule-property-replace-value").typedInput('type');
                    }
                    node.rules.push(r);
                });
            },
            oneditresize: function(size) {
                var rows = $("#dialog-form>div:not(.node-input-rule-container-row)");
                var height = size.height;
                for (var i=0; i<rows.size(); i++) {
                    height -= $(rows[i]).outerHeight(true);
                }
                var editorRow = $("#dialog-form>div.node-input-rule-container-row");
                height -= (parseInt(editorRow.css("marginTop"))+parseInt(editorRow.css("marginBottom")));

                $("#node-input-rule-container").editableList('height',height);
            }
        });

        RED.nodes.registerType('range', {
            color: "#E2D96E",
            category: 'function',
            defaults: {
                // minin: {value:"",required:true,validate:RED.validators.number()},
                // maxin: {value:"",required:true,validate:RED.validators.number()},
                // minout: {value:"",required:true,validate:RED.validators.number()},
                // maxout: {value:"",required:true,validate:RED.validators.number()},
                action: {value:"scale"},
                round: {value:false},
                property: {value:"payload",required:true},
                name: {value:""}
            },
            inputs: 1,
            outputs: 1,
            icon: "range.png",
            label: function() {
                if (this.minout !== "" && this.maxout !== "") { return this.name||this.minout + " - " + this.maxout; }
                else { return this.name||this._("range.range"); }
            },
            labelStyle: function() {
                return this.name ? "node_label_italic" : "";
            },
            oneditprepare: function() {
                if (this.property === undefined) {
                    $("#node-input-property").val("payload");
                }
                $("#node-input-property").typedInput({default:'msg',types:['msg']});
            }
        });

        RED.nodes.registerType('split',{
            category: 'function',
            color:"#E2D96E",
            defaults: {
                name: {value:""},
                splt: {value:"\\n"},
                spltType: {value:"str"},
                arraySplt: {value:1},
                arraySpltType: {value:"len"},
                stream: {value:false},
                addname: {value:""}
            },
            inputs:1,
            outputs:1,
            icon: "split.png",
            label: function() {
                return this.name||this._("split.split");
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            oneditprepare: function() {
                $("#node-input-splt").typedInput({
                    default: 'str',
                    typeField: $("#node-input-spltType"),
                    types:[
                        'str',
                        'bin',
                        {value:"len", label:RED._("node-red:split.splitLength"),validate:/^\d+$/}
                    ]
                });
                if (this.arraySplt === undefined) {
                    $("#node-input-arraySplt").val(1);
                }
                $("#node-input-arraySplt").typedInput({
                    default: 'len',
                    typeField: $("#node-input-arraySpltType"),
                    types:[
                        {value:"len", label:RED._("node-red:split.splitLength"),validate:/^\d+$/}
                    ]
                });
                $("#node-input-addname").typedInput({
                    typeField: $("#node-input-fnameType"),
                    types:['msg']
                });

                $("#node-input-addname-cb").change(function() {
                    $("#node-input-addname").prop('disabled',!this.checked);
                })
                if (this.addname === "") {
                    $("#node-input-addname-cb").prop('checked',false);
                    $("#node-input-addname").val('topic');
                } else {
                    $("#node-input-addname-cb").prop('checked',true);
                }
                $("#node-input-addname-cb").change();
            },
            oneditsave: function() {
                if (!$("#node-input-addname-cb").prop('checked')) {
                    $("#node-input-addname").val('');
                }
            }
        });

        RED.nodes.registerType('join',{
            category: 'function',
            color:"#E2D96E",
            defaults: {
                name: {value:""},
                mode: {value:"auto"},
                build: { value:"string"},
                // property: { value:"payload", validate:RED.validators.typedInput("propertyType")},
                propertyType: { value:"msg"},
                key: {value:"topic"},
                joiner: { value:"\\n"},
                joinerType: { value:"str"},
                accumulate: { value:"false" },
                timeout: {value:""},
                count: {value:""},
                reduceRight: {value:false},
                reduceExp: {value:undefined},
                reduceInit: {value:undefined},
                reduceInitType: {value:undefined},
                reduceFixup: {value:undefined}
            },
            inputs:1,
            outputs:1,
            icon: "join.png",
            label: function() {
                return this.name||this._("join.join");
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            oneditprepare: function() {
                var node = this;

                $("#node-input-mode").change(function(e) {
                    var val = $(this).val();
                    $(".node-row-custom").toggle(val==='custom');
                    $(".node-row-reduce").toggle(val==='reduce');
                    $(".form-tips-auto").toggle((val==='auto') || (val==='reduce'));
                    if (val === "auto") {
                        $("#node-input-accumulate").attr('checked', false);
                    }
                    else if (val === "custom") {
                        $("#node-input-build").change();
                    }
                    else if (val === "reduce") {
                        var jsonata_or_empty = {
                            value: "jsonata",
                            label: "expression",
                            icon: "red/images/typedInput/expr.png",
                            validate: function(v) {
                                try{
                                    if(v !== "") {
                                        jsonata(v);
                                    }
                                    return true;
                                }
                                catch(e){
                                    return false;
                                }
                            },
                            expand:function() {
                                var that = this;
                                RED.editor.editExpression({
                                    value: this.value().replace(/\t/g,"\n"),
                                    complete: function(v) {
                                        that.value(v.replace(/\n/g,"\t"));
                                    }
                                })
                            }
                        };
                        $("#node-input-reduceExp").typedInput({types:[jsonata_or_empty]});
                        $("#node-input-reduceInit").typedInput({
                            default: 'num',
                            types:['flow','global','str','num','bool','json','bin','date','jsonata','env'],
                            typeField: $("#node-input-reduceInitType")
                        });
                        $("#node-input-reduceFixup").typedInput({types:[jsonata_or_empty]});
                    }
                });

                $("#node-input-build").change(function(e) {
                    var val = $(this).val();
                    $(".node-row-key").toggle(val==='object');
                    $(".node-row-accumulate").toggle(val==='object' || val==='merged');
                    $(".node-row-joiner").toggle(val==='string' || val==='buffer');
                    $(".node-row-trigger").toggle(val!=='auto');
                    if (val === 'string' || val==='buffer') {
                        $("#node-input-property").typedInput('types',['msg']);
                        $("#node-input-joiner").typedInput("show");
                    } else {
                        $("#node-input-property").typedInput('types',['msg', {value:"full",label:"complete message",hasValue:false}]);
                    }
                });

                $("#node-input-joiner").typedInput({
                    default: 'str',
                    typeField: $("#node-input-joinerType"),
                    types:['str', 'bin']
                });

                $("#node-input-property").typedInput({
                    typeField: $("#node-input-propertyType"),
                    types:['msg', {value:"full", label:"complete message", hasValue:false}]
                });

                $("#node-input-key").typedInput({
                    types:['msg']
                });

                $("#node-input-build").change();
                $("#node-input-mode").change();
            },
            oneditsave: function() {
                var build = $("#node-input-build").val();
                if (build !== 'object' && build !== 'merged') {
                    $("#node-input-accumulate").prop("checked",false);
                }
            }
        });

        RED.nodes.registerType('sort',{
            category: 'function',
            color:"#E2D96E",
            defaults: {
                name: { value:"" },
                order: { value:"ascending" },
                as_num: { value:false },
                target: { value:"payload" },
                targetType: { value:"msg" },
                msgKey: { value:"payload" },
                msgKeyType: { value:"elem" },
                seqKey: { value:"payload" },
                seqKeyType: { value:"msg" }
            },
            inputs:1,
            outputs:1,
            icon: "sort.png",
            label: function() {
                return this.name||this._("sort.sort");
            },
            labelStyle: function() {
                return this.name ? "node_label_italic" : "";
            },
            oneditprepare: function() {
                var seq = {
                    value: "seq",
                    label: RED._("node-red:sort.seq"),
                    hasValue: false
                };
                var elem = {
                    value: "elem",
                    label: RED._("node-red:sort.elem"),
                    hasValue: false
                };
                $("#node-input-target").typedInput({
                    default:'msg',
                    typeField: $("#node-input-targetType"),
                    types:['msg', seq]
                });
                $("#node-input-msgKey").typedInput({
                    default:'elem',
                    typeField: $("#node-input-msgKeyType"),
                    types:[elem, 'jsonata']
                });
                $("#node-input-seqKey").typedInput({
                    default:'msg',
                    typeField: $("#node-input-seqKeyType"),
                    types:['msg', 'jsonata']
                });
                $("#node-input-target").change(function(e) {
                    var val = $("#node-input-target").typedInput('type');
                    $(".node-row-sort-msg-key").toggle(val === "msg");
                    $(".node-row-sort-seq-key").toggle(val === "seq");
                });
                $("#node-input-target").change();
            }
        });
        RED.nodes.registerType("batch",{
            category: "function",
            color:"#E2D96E",
            defaults: {
                name: {value:""},
                mode: {value:"count"},
                count: {value:10},
                overlap: {value:0},
                interval: {value:10},
                allowEmptySequence: {value:false},
                topics: {value:[{topic:""}]}
            },
            inputs:1,
            outputs:1,
            icon: "batch.png",
            label: function() {
                return this.name||this._("batch.batch");;
            },
            labelStyle: function() {
                return this.name ? "node_label_italic" : "";
            },
            oneditprepare: function() {
                var node = this;
                var topic_str = node._("batch.concat.topic");

                function resizeTopics(topic) {
                    var newWidth = topic.width();
                    topic.find('.red-ui-typedInput')
                        .typedInput("width",newWidth-15);
                }

                $("#node-input-topics-container")
                    .css('min-height','200px').css('min-width','430px')
                    .editableList({
                        addItem: function(container, i, opt) {
                            if (!opt.hasOwnProperty('topic')) {
                                opt.topic = "";
                            }
                            var row = $('<div/>').appendTo(container);
                            var valueField = $('<input/>',{
                                class:"node-input-topic-value",
                                type:"text",
                                style:"margin-left: 5px;"
                            }).appendTo(row)
                            .typedInput({default:'str', types:['str']});
                            valueField.typedInput('value', opt.topic);
                            valueField.typedInput('type', 'str');
                            valueField.attr('placeholder', topic_str);
                            resizeTopics(container);
                        },
                        resizeItem: resizeTopics,
                        sortable: true,
                        removable: true
                    });

                $("#node-input-count").spinner({
                });
                $("#node-input-overlap").spinner({
                });
                $("#node-input-interval").spinner({
                });
                $("#node-input-mode").change(function(e) {
                    var val = $(this).val();
                    $(".node-row-msg-count").toggle(val==="count");
                    $(".node-row-msg-overlap").toggle(val==="count");
                    $(".node-row-msg-interval").toggle(val==="interval");
                    $(".node-row-msg-concat").toggle(val==="concat");
                    if (val==="concat") {
                        var topics = node.topics;
                        var container = $("#node-input-topics-container");
                        container.editableList('empty');
                        for (var i = 0; i < topics.length; i++) {
                            var topic = topics[i];
                            container.editableList('addItem', topic);
                        }
                    }
                });
            },
            oneditsave: function() {
                var topics = $("#node-input-topics-container").editableList('items');
                var node = this;
                node.topics = [];
                topics.each(function(i) {
                    var topicData = $(this).data('data');
                    var topic = $(this);
                    var vf = topic.find(".node-input-topic-value");
                    var value = vf.typedInput('value');
                    var type = vf.typedInput('type');
                    var r = {topic:value};
                    node.topics.push(r);
                });
            },
            oneditresize: function(size) {
                var rows = $("#dialog-form>div:not(.node-input-topics-container-row)");
                var height = size.height;
                for (var i = 0; i < rows.size(); i++) {
                    height -= $(rows[i]).outerHeight(true);
                }
                var editorRow = $("#dialog-form>div.node-input-topics-container-row");
                height -= (parseInt(editorRow.css("marginTop"))+parseInt(editorRow.css("marginBottom")));
                $("#node-input-topics-container").editableList('height',height);
            }
        });


        RED.nodes.registerType('csv',{
            category: 'function',
            color:"#DEBD5C",
            defaults: {
                name: {value:""},
                // sep: {value:',',required:true,validate:RED.validators.regex(/^.{1,2}$/)},
                //quo: {value:'"',required:true},
                hdrin: {value:""},
                hdrout: {value:""},
                multi: {value:"one",required:true},
                ret: {value:'\\n'},
                temp: {value:""},
                skip: {value:"0"}
            },
            inputs:1,
            outputs:1,
            icon: "parser-csv.png",
            label: function() {
                return this.name||"csv";
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            oneditprepare: function() {
                console.log(this.skip,$("#node-input-skip").val());
                if (this.skip === undefined) { this.skip = 0; $("#node-input-skip").val("0");}
                $("#node-input-skip").spinner({ min:0 });
                if (this.sep == "," || this.sep == "\\t" || this.sep == ";" || this.sep == ":" || this.sep == " " || this.sep == "#") {
                    $("#node-input-select-sep").val(this.sep);
                    $("#node-input-sep").hide();
                } else {
                    $("#node-input-select-sep").val("");
                    $("#node-input-sep").val(this.sep);
                    $("#node-input-sep").show();
                }
                $("#node-input-select-sep").change(function() {
                    var v = $("#node-input-select-sep").val();
                    $("#node-input-sep").val(v);
                    if (v == "") {
                        $("#node-input-sep").val("");
                        $("#node-input-sep").show().focus();
                    } else {
                        $("#node-input-sep").hide();
                    }
                });
            }
        });


        RED.nodes.registerType('html',{
            category: 'function',
            color:"#DEBD5C",
            defaults: {
                name: {value:""},
                property: {value:"payload"},
                outproperty: {value:"payload"},
                tag: {value:""},
                ret: {value:"html"},
                as: {value:"single"}
            },
            inputs:1,
            outputs:1,
            icon: "parser-html.png",
            label: function() {
                return this.name||this.tag||"html";
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            oneditprepare: function() {
                $("#node-input-property").typedInput({default:'msg',types:['msg']});
                $("#node-input-outproperty").typedInput({default:'msg',types:['msg']});
            }
        });

        RED.nodes.registerType('json',{
            category: 'function',
            color:"#DEBD5C",
            defaults: {
                name: {value:""},
                property: {value:"payload",required:true},
                action: {value:""},
                pretty: {value:false}
            },
            inputs:1,
            outputs:1,
            icon: "parser-json.png",
            label: function() {
                return this.name||"json";
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            oneditprepare: function() {
                if (this.property === undefined) {
                    $("#node-input-property").val("payload");
                }
                $("#node-input-property").typedInput({default:'msg',types:['msg']});
                $("#node-input-action").change(function() {
                    if (this.value === "" || this.value === "str") {
                        $(".node-json-to-json-options").show();
                    } else {
                        $(".node-json-to-json-options").hide();
                    }
                });
                $("#node-input-action").change();
            }
        });

        RED.nodes.registerType('xml',{
            category: 'function',
            color:"#DEBD5C",
            defaults: {
                name: {value:""},
                property: {value:"payload",required:true},
                attr: {value:""},
                chr: {value:""}
            },
            inputs:1,
            outputs:1,
            icon: "parser-xml.png",
            label: function() {
                return this.name||"xml";
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            oneditprepare: function() {
                if (this.property === undefined) {
                    $("#node-input-property").val("payload");
                }
                $("#node-input-property").typedInput({default:'msg',types:['msg']});
            }
        });

        RED.nodes.registerType('yaml',{
            category: 'function',
            color:"#DEBD5C",
            defaults: {
                property: {value:"payload",required:true},
                name: {value:""}
            },
            inputs:1,
            outputs:1,
            icon: "parser-yaml.png",
            label: function() {
                return this.name||"yaml";
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            oneditprepare: function() {
                if (this.property === undefined) {
                    $("#node-input-property").val("payload");
                }
                $("#node-input-property").typedInput({default:'msg',types:['msg']});
            }
        });

        RED.nodes.registerType('file',{
            category: 'storage-output',
            defaults: {
                name: {value:""},
                filename: {value:""},
                appendNewline: {value:true},
                createDir: {value:false},
                overwriteFile: {value:"false"}
            },
            color:"BurlyWood",
            inputs:1,
            outputs:1,
            icon: "file-out.png",
            label: function() {
                if (this.overwriteFile === "delete") {
                    return this.name||this._("file.label.deletelabel",{file:this.filename});
                } else {
                    return this.name||this.filename||this._("file.label.filelabel");
                }
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            oneditprepare: function() {
                $("#node-input-overwriteFile").on("change",function() {
                    if (this.value === "delete") { $(".form-row-file-write-options").hide(); }
                    else { $(".form-row-file-write-options").show(); }
                });
            }
        });

        RED.nodes.registerType('file in',{
            category: 'storage-input',
            defaults: {
                name: {value:""},
                filename: {value:""},
                format: {value:"utf8"},
                chunk: {value:false},
                sendError: {value: false}
            },
            color:"BurlyWood",
            inputs:1,
            outputs:1,
            outputLabels: function(i) {
                return (this.format === "utf8") ? "UTF8 string" : "binary buffer";
            },
            icon: "file-in.png",
            label: function() {
                return this.name||this.filename||this._("file.label.filelabel");
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            oneditprepare: function() {
                if (this.sendError === undefined) {
                    $("#node-input-sendError").prop("checked",true);
                }
                $("#node-input-format").on("change",function() {
                    if ($("#node-input-format").val() === "utf8") {
                        $("#buffer-input-type").hide();
                        $("#line-input-type").show();
                    }
                    else {
                        $("#buffer-input-type").show();
                        $("#line-input-type").hide();
                    }
                });
            }
        });

        RED.nodes.registerType('test-node',{
            category: 'new',
            color: '#a6bbcf',
            defaults: {
                name: {value:""},
                nameFieldType: {value: ""},
            },
            inputs:1,
            outputs:1,
            icon: "file.png",
            label: function() {
                return this.name||"test-node";
            },
            oneditprepare: function() {
                $("#node-input-name").typedInput({
                    default: 'msg',
                    types: ['msg','flow','global'],
                    typeField: $("#node-input-nameFieldType")
                });
            }
        });

        RED.nodes.registerType('e-mail',{
            category: 'social-output',
            color:"#c7e9c0",
            defaults: {
                server: {value:"smtp.gmail.com",required:true},
                port: {value:"465",required:true},
                secure: {value: true},
                name: {value:""},
                dname: {value:""}
            },
            credentials: {
                userid: {type:"text"},
                password: {type: "password"},
                global: { type:"boolean"}
            },
            inputs:1,
            outputs:0,
            icon: "envelope.png",
            align: "right",
            paletteLabel: function() {
                return this._("email.email");
            },
            label: function() {
                return this.dname||this.name||"email";
            },
            labelStyle: function() {
                return (this.dname)?"node_label_italic":"";
            },
            oneditprepare: function() {
                if (this.credentials.global) {
                    $('#node-tip').show();
                } else {
                    $('#node-tip').hide();
                }
            }
        });

        RED.nodes.registerType('e-mail in',{
            category: 'social-input',
            color:"#c7e9c0",
            defaults: {
                name: {value:""},
                protocol: {value: "IMAP", required:true}, // Which protocol to use to connect to the mail server ("IMAP" or "POP3")
                server: {value:"imap.gmail.com",required:true},
                useSSL: {value: true},
                port: {value:"993",required:true},
                box: {value:"INBOX"}, // For IMAP, The mailbox to process
                disposition: { value: "Read" }, // For IMAP, the disposition of the read email
                repeat: {value:"300",required:true}
            },
            credentials: {
                userid: {type:"text"},
                password: {type: "password"},
                global: { type:"boolean"}
            },
            inputs:0,
            outputs:1,
            icon: "envelope.png",
            paletteLabel: function() {
                return this._("email.email");
            },
            label: function() {
                return this.name||this._("email.email");
            },
            labelStyle: function() {
                return (this.name)?"node_label_italic":"";
            },
            oneditprepare: function() {
                if (this.credentials.global) {
                    $('#node-tip').show();
                } else {
                    $('#node-tip').hide();
                }
                if (typeof this.box === 'undefined') {
                    $("#node-input-box").val("INBOX");
                    this.box = "INBOX";
                }
            }
        });

        RED.nodes.registerType('feedparse',{
            category: 'advanced-input',
            color:"#C0DEED",
            defaults: {
                name: {value:""},
                url: {value:"", required:true},
                interval: { value:15, required:true, validate:function(v) {return (!isNaN(parseInt(v)) && (parseInt(v) <= 35790))} }
            },
            inputs:0,
            outputs:1,
            icon: "feed.png",
            paletteLabel: function() {
                return this._("feedparse.feedparse");
            },
            label: function() {
                return this.name||this.url||this._("feedparse.feedparse");
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            }
        });

        RED.nodes.registerType("rbe", {
            color:"#E2D96E",
            category: 'function',
            defaults: {
                name: {value:""},
                func: {value:"rbe"},
                // gap: {value:"",validate:RED.validators.regex(/^(\d*[.]*\d*|)(%|)$/)},
                start: {value:""},
                inout: {value:"out"},
                property: {value:"payload",required:true}
            },
            inputs:1,
            outputs:1,
            icon: "rbe.png",
            label: function() {
                var ll = (this.func||"").replace("Eq","").replace("rbei","rbe")||this._("rbe.rbe");
                return this.name||ll||this._("rbe.rbe");
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            oneditprepare: function() {
                if (this.property === undefined) {
                    $("#node-input-property").val("payload");
                }
                $("#node-input-property").typedInput({default:'msg',types:['msg']});
                //$( "#node-input-gap" ).spinner({min:0});
                if ($("#node-input-inout").val() === null) {
                    $("#node-input-inout").val("out");
                }
                $("#node-input-func").on("change",function() {
                    if (($("#node-input-func").val() === "rbe")||($("#node-input-func").val() === "rbei")) {
                        $("#node-bandgap").hide();
                    } else {
                        $("#node-bandgap").show();
                    }
                    if ($("#node-input-func").val() === "narrowband") {
                        $("#node-startvalue").show();
                    } else {
                        $("#node-startvalue").hide();
                    }
                });
            }
        });

        var twitterConfigNodeId = null;
        var twitterConfigNodeIntervalId = null;

        RED.nodes.registerType('twitter-credentials',{
            category: 'config',
            defaults: {
                screen_name: {value:""}
            },
            credentials: {
                consumer_key: { type: "password"},
                consumer_secret: { type: "password" },
                access_token: {type: "password"},
                access_token_secret: {type:"password"}
            },
            label: function() {
                if (this.screen_name) {
                    return (this.screen_name[0]!=="@"?"@":"")+this.screen_name
                } else {
                    return "Twitter: "+this.id
                }
            },
            exportable: false,
            oneditsave: function() {
                var trimFields = [
                    "consumer_key",
                    "consumer_secret",
                    "access_token",
                    "access_token_secret"
                ];
                // Just in case any whitespace has crept in with the copy-paste of the fields
                trimFields.forEach(function(field) {
                    var v = $("#node-config-input-"+field).val();
                    v = v.trim();
                    $("#node-config-input-"+field).val(v);

                });
            }
        });

        RED.nodes.registerType('twitter in',{
            category: 'social-input',
            color:"#C0DEED",
            defaults: {
                twitter: {type:"twitter-credentials",required:true},
                tags: {value:""},
                user: {value:"false",required:true},
                name: {value:""},
                inputs: {value:0}
            },
            inputs: 0,
            outputs: 1,
            icon: "twitter.png",
            label: function() {
                if (this.name) {
                    return this.name;
                }
                var uname = RED.nodes.node(this.twitter);
                if (this.user == "dm") {
                    return (uname?uname.label()+" ":"")+this._("twitter.label.dmslabel");
                } else if (this.user == "event") {
                    var user = RED.nodes.node(this.twitter);
                    return (user?user.label()+" ":"")+this._("twitter.label.eventslabel");
                } else if (this.user == "user") {
                    return this.tags+" "+this._("twitter.label.tweetslabel");
                }
                else if (this.user == "true") {
                    return this._("twitter.label.followers") + (uname?(" "+uname.label()):"");
                }
                return "twitter";
            },
            labelStyle: function() {
                return this.name?"node_label_italic":"";
            },
            oneditprepare: function() {
                var userlabel = this._("twitter.label.user");
                var userph = this._("twitter.placeholder.user");
                var forlabel = this._("twitter.label.for");
                var forph = this._("twitter.placeholder.for");
                $("#node-input-user").change(function() {
                    var type = $("#node-input-user option:selected").val();
                    if (type == "user") {
                        $("#node-input-tags-row").show();
                        $("#node-input-tags-label").html(userlabel);
                        $("#node-input-tags").attr("placeholder",userph);
                    } else if ((type == "dm")||(type == "true")||(type == "event")) {
                        $("#node-input-tags-row").hide();
                    } else {
                        $("#node-input-tags-row").show();
                        $("#node-input-tags-label").html(forlabel);
                        $("#node-input-tags").attr("placeholder",forph);
                    }
                });
                $("#node-input-user").change();
            },
            oneditsave: function() {
                if ($('#node-input-tags').val() === '' && $("#node-input-user option:selected").val() === 'false') {
                    this.inputs = 1;
                }
                else {
                    //set back the default state of 0 inputs
                    //this.inputs = 0;
                }
            }
        });

        RED.nodes.registerType('twitter out',{
            category: 'social-output',
            color:"#C0DEED",
            defaults: {
                twitter: {type:"twitter-credentials",required:true},
                name: {value:"Tweet"}
            },
            inputs:1,
            outputs:0,
            icon: "twitter.png",
            align: "right",
            label: function() {
                return this.name;
            }
        });
    }

    return {
        init: function (red) {
            RED = red;
            register();
        }
    };
})();