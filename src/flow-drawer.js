const { createCanvas, Image } = require("canvas");
const { JSDOM } = require("jsdom");
const SvgSaver = require("svg-saver-node");
const fs = require("fs");
const path = require("path");
const mute = require("mute");
const _RED = require("./red");

function applyTypes(path) {
    const types = fs.readFileSync(path);
    eval(types.toString("utf-8"));
}

function applyTypes2(types) {
    try {
        eval(types.toString("utf-8"));
    } catch (err) {
        console.error(types);
        console.error(err);
    }
}

function applyLocale(RED, path) {
    if (fs.existsSync(path)) {
        const locale = JSON.parse(fs.readFileSync(path));
        RED.i18n.apply(locale);
    } else {
        console.error("Doesn't exist: " + path);
    }
}

function FlowDrawer(flow, options) {
    if (!flow) {
        throw new Error("Invalid flow");    
    }
    
    const defaults = {
        // empty
    };
    options = Object.assign(defaults, options);

    const RED = _RED();

    if (options.nodes) {
        applyTypes.call({RED}, options.nodes);
    }

    const stylePath = path.join(__dirname, "../css/style.min.css");
    const { window } = new JSDOM(`
        <html>
            <link rel="stylesheet" href="file://${stylePath}">
            <body>
                <div id="body"></div>
            </body>
        </html>`, {
        resources: "usable"
    });

    let loaded = false;
    window.onload = () => {
        loaded = true;
    };

    const onLoadPromise = new Promise((resolve) => {
        RED.loader.load().then((nodeFiles) => {
            // console.log(nodeFiles['node-red']['icons']);
            try {
                for (let nodeFile in nodeFiles) {
                    for (let node in nodeFiles[nodeFile]["nodes"]) {
                        const js = "const RED = this.RED;" + nodeFiles[nodeFile]["nodes"][node].js;
                        applyTypes2.call({RED}, js);
                        const i18n = nodeFiles[nodeFile]["nodes"][node]["i18n"];
                        if (i18n) {
                            applyLocale(RED, i18n);
                        }
                        for (let iconGroup of nodeFiles[nodeFile]["icons"]) {
                            for (let icon of iconGroup["icons"]) {
                                const image = path.join(iconGroup.path, icon);
                                if (fs.existsSync(image)) {
                                    fs.copyFileSync(image, path.join(__dirname, "../icons", icon));
                                }
                            }
                        }
                    }
                }
            } catch (err) {
                console.error(err);
            }

            if (!loaded) {
                window.onload = () => {
                    resolve();
                };
            } else {
                resolve();
            }

        }).catch((err) => {
            console.error(err);
        });
    });

    var oldCreateElement = window.document.createElement;
    window.document.createElement = function (el) {
        if (el === "canvas") {
            return createCanvas(500, 500);
        } else {
            return oldCreateElement.bind(window.document)(el);
        }
    };
    window.Image = Image;

    const svgSaver = new SvgSaver(window);
    let cache = null;

    /* eslint-disable no-unused-vars */
    function draw (type) { // TODO: use type
    /* eslint-enable no-unused-vars */
        if (cache !== null) {
            return new Promise((resolve) => {
                resolve(cache);
            });
        }
        return new Promise((resolve, reject) => {
            const images = [];

            // Wait for resourse loading
            onLoadPromise.then(() => {
                RED.nodes.import(flow);
                const workspaceIds = Object.keys(RED.workspaces.tabs());
                drawWorkspacesWithIds(workspaceIds).catch((err) => console.error(err));
            });
            
            function drawWorkspacesWithIds (ids) {
                const id = ids.pop();
                if (!id) {
                    return;
                } else {
                    RED.workspaces.show(id);
                    const el = RED.view.redraw(true);
                    const unmute = mute();
                    return svgSaver.svgAsDataUri(el).then(function (uri) {
                        unmute();
                        images.push(uri);
                        const promise = drawWorkspacesWithIds(ids);
                        if (promise) {
                            promise.catch((err) => { reject(err); });
                        } else {
                            resolve(images);
                        }
                    });
                }
            }
        }).then((results) => cache = results);
    }

    return {
        draw
    };
}

module.exports = FlowDrawer;
