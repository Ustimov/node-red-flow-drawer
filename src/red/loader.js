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

var when = require("when");
var fs = require("fs");
var path = require("path");

var localfilesystem = require("./localfilesystem");

var settings;
var runtime;

function init(_runtime) {
    runtime = _runtime;
    settings = runtime.settings;
    localfilesystem.init(settings);
}

function load(defaultNodesDir,disableNodePathScan) {
    var nodeFiles = localfilesystem.getNodeFiles(defaultNodesDir,disableNodePathScan);
    return loadNodeFiles(nodeFiles);
}

function loadNodeFiles(nodeFiles) {
    var promises = [];
    var nodes = [];
    for (var module in nodeFiles) {
        if (nodeFiles.hasOwnProperty(module)) {
            var first = true;
            for (var node in nodeFiles[module].nodes) {
                if (nodeFiles[module].nodes.hasOwnProperty(node)) {
                    if (module != "node-red" && first) {
                        // Check the module directory exists
                        first = false;
                        var fn = nodeFiles[module].nodes[node].file;
                        var parts = fn.split("/");
                        var i = parts.length-1;
                        for (;i>=0;i--) {
                            if (parts[i] == "node_modules") {
                                break;
                            }
                        }
                        var moduleFn = parts.slice(0,i+2).join("/");

                        try {
                            fs.statSync(moduleFn);
                        } catch(err) {
                            // Module not found, don't attempt to load its nodes
                            break;
                        }
                    }

                    try {
                        promises.push(loadNodeConfig(nodeFiles[module].nodes[node]).then((function() {
                            var m = module;
                            var n = node;
                            return function(nodeSet) {
                                nodeFiles[m].nodes[n] = nodeSet;
                                nodes.push(nodeSet);
                            };
                        })()));
                    } catch(err) {
                        console.error(err);
                    }
                }
            }
        }
    }
    return when.settle(promises).then(function() {
        return nodeFiles;
    });
}

function loadNodeConfig(fileInfo) {
    return new Promise(function(resolve) {
        var file = fileInfo.file;
        var module = fileInfo.module;
        var name = fileInfo.name;
        var version = fileInfo.version;

        var id = module + "/" + name;
        var isEnabled = true;

        var node = {
            id: id,
            module: module,
            name: name,
            file: file,
            template: file.replace(/\.js$/,".html"),
            enabled: isEnabled,
            loaded:false,
            version: version,
            local: fileInfo.local
        };
        if (fileInfo.hasOwnProperty("types")) {
            node.types = fileInfo.types;
        }

        fs.readFile(node.template,"utf8", function(err,content) {
            if (err) {
                node.types = [];
                if (err.code === "ENOENT") {
                    if (!node.types) {
                        node.types = [];
                    }
                    node.err = "Error: "+node.template+" does not exist";
                } else {
                    node.types = [];
                    node.err = err.toString();
                }
                resolve(node);
            } else {
                var types = [];

                var regExp = /<script (?:[^>]*)data-template-name\s*=\s*['"]([^'"]*)['"]/gi;
                var match = null;

                while ((match = regExp.exec(content)) !== null) {
                    types.push(match[1]);
                }
                node.types = types;

                var langRegExp = /^<script[^>]* data-lang\s*=\s*['"](.+?)['"]/i;
                regExp = /(<script[^>]* data-help-name=[\s\S]*?<\/script>)/gi;
                match = null;
                var mainContent = "";
                var helpContent = {};
                var index = 0;
                while ((match = regExp.exec(content)) !== null) {
                    mainContent += content.substring(index,regExp.lastIndex-match[1].length);
                    index = regExp.lastIndex;
                    var help = content.substring(regExp.lastIndex-match[1].length,regExp.lastIndex);

                    var lang = "en-US";
                    if ((match = langRegExp.exec(help)) !== null) {
                        lang = match[1];
                    }
                    if (!helpContent.hasOwnProperty(lang)) {
                        helpContent[lang] = "";
                    }

                    helpContent[lang] += help;
                }
                mainContent += content.substring(index);

                node.config = mainContent;
                node.help = helpContent;

                var jsRegex = /<script[^>]* type="text\/javascript">([\s\S]*?)<\/script>/gi;
                node.js = "";
                /* eslint-disable no-cond-assign */
                while (match = jsRegex.exec(content)) {
                    /* eslint-enable no-cond-assign */
                    node.js += match[1];
                }

                if (node.module === "node-red") {
                    // do not look up locales directory for core nodes
                    node.namespace = node.module;
                    resolve(node);
                    return;
                }
                fs.stat(path.join(path.dirname(file),"locales"),function(err) {
                    if (!err) {
                        node.namespace = node.id;
                        node.i18n = path.join(path.dirname(file),"locales", "en-US", path.basename(file,".js")+".json");
                        resolve(node);
                    } else {
                        node.namespace = node.module;
                        resolve(node);
                    }
                });
            }
        });
    });
}

module.exports = {
    init: init,
    load: load,
};
