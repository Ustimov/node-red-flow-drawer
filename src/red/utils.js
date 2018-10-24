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

module.exports = (function() {

    const path = require("path");

    let RED;

    function normalisePropertyExpression(str) {
        // This must be kept in sync with validatePropertyExpression
        // in editor/js/ui/utils.js

        var length = str.length;
        if (length === 0) {
            throw new Error("Invalid property expression: zero-length");
        }
        var parts = [];
        var start = 0;
        var inString = false;
        var inBox = false;
        var quoteChar;
        var v;
        for (var i=0;i<length;i++) {
            var c = str[i];
            if (!inString) {
                if (c === "'" || c === "\"") {
                    if (i != start) {
                        throw new Error("Invalid property expression: unexpected "+c+" at position "+i);
                    }
                    inString = true;
                    quoteChar = c;
                    start = i+1;
                } else if (c === ".") {
                    if (i===0) {
                        throw new Error("Invalid property expression: unexpected . at position 0");
                    }
                    if (start != i) {
                        v = str.substring(start,i);
                        if (/^\d+$/.test(v)) {
                            parts.push(parseInt(v));
                        } else {
                            parts.push(v);
                        }
                    }
                    if (i===length-1) {
                        throw new Error("Invalid property expression: unterminated expression");
                    }
                    // Next char is first char of an identifier: a-z 0-9 $ _
                    if (!/[a-z0-9$_]/i.test(str[i+1])) {
                        throw new Error("Invalid property expression: unexpected "+str[i+1]+" at position "+(i+1));
                    }
                    start = i+1;
                } else if (c === "[") {
                    if (i === 0) {
                        throw new Error("Invalid property expression: unexpected "+c+" at position "+i);
                    }
                    if (start != i) {
                        parts.push(str.substring(start,i));
                    }
                    if (i===length-1) {
                        throw new Error("Invalid property expression: unterminated expression");
                    }
                    // Next char is either a quote or a number
                    if (!/["'\d]/.test(str[i+1])) {
                        throw new Error("Invalid property expression: unexpected "+str[i+1]+" at position "+(i+1));
                    }
                    start = i+1;
                    inBox = true;
                } else if (c === "]") {
                    if (!inBox) {
                        throw new Error("Invalid property expression: unexpected "+c+" at position "+i);
                    }
                    if (start != i) {
                        v = str.substring(start,i);
                        if (/^\d+$/.test(v)) {
                            parts.push(parseInt(v));
                        } else {
                            throw new Error("Invalid property expression: unexpected array expression at position "+start);
                        }
                    }
                    start = i+1;
                    inBox = false;
                } else if (c === " ") {
                    throw new Error("Invalid property expression: unexpected ' ' at position "+i);
                }
            } else {
                if (c === quoteChar) {
                    if (i-start === 0) {
                        throw new Error("Invalid property expression: zero-length string at position "+start);
                    }
                    parts.push(str.substring(start,i));
                    // If inBox, next char must be a ]. Otherwise it may be [ or .
                    if (inBox && !/\]/.test(str[i+1])) {
                        throw new Error("Invalid property expression: unexpected array expression at position "+start);
                    } else if (!inBox && i+1!==length && !/[[.]/.test(str[i+1])) {
                        throw new Error("Invalid property expression: unexpected "+str[i+1]+" expression at position "+(i+1));
                    }
                    start = i+1;
                    inString = false;
                }
            }

        }
        if (inBox || inString) {
            throw new Error("Invalid property expression: unterminated expression");
        }
        if (start < length) {
            parts.push(str.substring(start));
        }
        return parts;
    }

    function validatePropertyExpression(str) {
        try {
            normalisePropertyExpression(str);
            return true;
        } catch(err) {
            return false;
        }
    }

    function separateIconPath(icon) {
        var result = {module: "", file: ""};
        if (icon) {
            var index = icon.indexOf("/");
            if (index !== -1) {
                result.module = icon.slice(0, index);
                result.file = icon.slice(index + 1);
            } else {
                result.file = icon;
            }
        }
        return result;
    }

    function getDefaultNodeIcon(def,node) {
        var icon_url;
        if (node && node.type === "subflow") {
            icon_url = "node-red/subflow.png";
        } else if (typeof def.icon === "function") {
            try {
                icon_url = def.icon.call(node);
            } catch(err) {
                console.error("Definition error: "+def.type+".icon",err);
                icon_url = "arrow-in.png";
            }
        } else {
            icon_url = def.icon;
        }

        var iconPath = separateIconPath(icon_url);
        if (!iconPath.module) {
            if (def.set) {
                iconPath.module = def.set.module;
            } else {
                // Handle subflow instance nodes that don't have def.set
                iconPath.module = "node-red";
            }
        }
        return iconPath;
    }

    function isIconExists(iconPath) {
        var iconSets = RED.nodes.getIconSets();
        var iconFileList = iconSets[iconPath.module];
        if (iconFileList && iconFileList.indexOf(iconPath.file) !== -1) {
            return true;
        } else {
            return false;
        }
    }

    function getNodeIcon(def, node) {
        if (def.category === "config") {
            return path.join(__dirname, "/../../icons/cog.png");
        } else if (node && node.type === "tab") {
            return path.join(__dirname, "/../../icons/subflow.png");
        } else if (node && node.type === "unknown") {
            return path.join(__dirname, "/../../icons/alert.png");
        } else if (node && node.icon) {
            var iconPath = separateIconPath(node.icon);
            if (isIconExists(iconPath)) {
                return path.join(__dirname, "/../../icons", node.icon);
            }
        }

        iconPath = getDefaultNodeIcon(def, node);
        if (def.category === "subflows") {
            if (!isIconExists(iconPath)) {
                return path.join(__dirname, "/../../icons/subflow.png");
            }
        }
        return path.join(__dirname, "/../../icons", iconPath.file);
    }

    function getNodeLabel(node,defaultLabel) {
        defaultLabel = defaultLabel||"";
        var l;
        if (node.type === "tab") {
            l = node.label || defaultLabel;
        } else {
            l = node._def.label;
            try {
                l = (typeof l === "function" ? l.call(node) : l)||defaultLabel;
            } catch(err) {
                console.error("Definition error: "+node.type+".label",err);
                l = defaultLabel;
            }
        }
        return RED.text.bidi.enforceTextDirectionWithUCC(l);
    }

    var nodeColorCache = {};
    function getNodeColor(type, def) {
        var result = def.color;
        var paletteTheme = [];
        if (paletteTheme.length > 0) {
            if (!nodeColorCache.hasOwnProperty(type)) {
                nodeColorCache[type] = def.color;
                var l = paletteTheme.length;
                for (var i = 0; i < l; i++ ){
                    var themeRule = paletteTheme[i];
                    if (themeRule.hasOwnProperty("category")) {
                        if (!themeRule.hasOwnProperty("_category")) {
                            themeRule._category = new RegExp(themeRule.category);
                        }
                        if (!themeRule._category.test(def.category)) {
                            continue;
                        }
                    }
                    if (themeRule.hasOwnProperty("type")) {
                        if (!themeRule.hasOwnProperty("_type")) {
                            themeRule._type = new RegExp(themeRule.type);
                        }
                        if (!themeRule._type.test(type)) {
                            continue;
                        }
                    }
                    nodeColorCache[type] = themeRule.color || def.color;
                    break;
                }
            }
            result = nodeColorCache[type];
        }
        if (result) {
            return result;
        } else {
            return "#ddd";
        }
    }

    function parseContextKey(key) {
        var parts = {};
        var m = /^#:\((\S+?)\)::(.*)$/.exec(key);
        if (m) {
            parts.store = m[1];
            parts.key = m[2];
        } else {
            parts.key = key;
            if (RED.settings && RED.settings.context) {
                parts.store = RED.settings.context.default;
            }
        }
        return parts;
    }

    return {
        init: function (red) {
            RED = red;
        },
        validatePropertyExpression: validatePropertyExpression,
        getNodeIcon: getNodeIcon,
        getNodeLabel: getNodeLabel,
        getNodeColor: getNodeColor,
        parseContextKey: parseContextKey
    };
})();
