const { createCanvas, Image } = require("canvas");
const { JSDOM } = require("jsdom");
const SvgSaver = require("svg-saver-node");
const fs = require("fs");
const path = require("path");
const _RED = require("./red");

function applyTypes(types) {
    try {
        eval(types.toString("utf-8"));
    } catch (err) {
        console.error(err);
    }
}

function applyLocale(RED, path) {
    if (!path) {
        return;
    }
    try {
        const locale = JSON.parse(fs.readFileSync(path));
        RED.i18n.apply(locale);
    } catch (err) {
        console.error(err);
    }
}

function registerNode(RED, node) {
    const js = "const RED = this.RED;" + node.js;
    applyTypes.call({RED}, js);
}

function copyIcons(nodeFile) {
    for (let iconGroup of nodeFile.icons) {
        for (let icon of iconGroup.icons) {
            const image = path.join(iconGroup.path, icon);
            if (fs.existsSync(image)) {
                fs.copyFileSync(image, path.join(__dirname, "../icons", icon));
            }
        }
    }
}

function FlowDrawer(flow, settings) {
    if (!flow || !Array.isArray(flow)) {
        throw new Error("Invalid flow");    
    }
    
    const defaults = {
        httpNodeRoot: "/",
        userDir: process.cwd()
    };
    settings = Object.assign(defaults, settings);
    settings.userDir = path.resolve(settings.userDir);

    const RED = _RED(settings);

    const stylePath = path.join(__dirname, "../css/style.min.css");
    const { window } = new JSDOM(`
        <html>
            <head>
                <link rel="stylesheet" href="file://${stylePath}">
            </head>
            <body>
                <div id="body"></div>
            </body>
        </html>`, {
        resources: "usable"
    });

    const onLoadPromise = new Promise((resolve) => {
        const windowLoad = new Promise((r) => {
            window.onload = () => {
                r();
            };
        });
        const nodeLoad = RED.loader.load().then((nodeFiles) => {
            for (let nodeFile in nodeFiles) {
                const nodes = nodeFiles[nodeFile]["nodes"];
                for (let node in nodes) {
                    registerNode(RED, nodes[node]);
                    applyLocale(RED, nodes[node].i18n);
                }
                copyIcons(nodeFiles[nodeFile]);
            }
        });
        Promise.all([windowLoad, nodeLoad]).then(() => {
            resolve();
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

    // eslint-disable-next-line
    function draw (type) { // TODO: use type
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
                drawWorkspacesWithIds(workspaceIds).catch((err) => { console.error(err); });
            });
            
            function drawWorkspacesWithIds (ids) {
                const id = ids.pop();
                if (!id) {
                    return;
                } else {
                    RED.workspaces.show(id);
                    const el = RED.view.redraw(true);
                    return svgSaver.svgAsDataUri(el).then(function (uri) {
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
