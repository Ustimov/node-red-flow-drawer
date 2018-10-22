const { createCanvas, Image } = require('canvas');
const { JSDOM } = require('jsdom');
const SvgSaver = require('svg-saver-node');
const fs = require('fs');
const path = require('path');
const mute = require('mute');
const _RED = require('./red');

function applyTypes(path) {
    const types = fs.readFileSync(path);
    eval(types.toString('utf-8'));
}

function applyTypes2(types) {
    try {
        eval(types.toString('utf-8'));
    } catch (err) {
        console.log('***');
        console.log(types);
        console.log(err);
        console.log('***');
    }
}

function FlowDrawer(flow, options) {
    if (!flow) {
        throw new Error('Invalid flow');    
    }
    
    const defaults = {
        // empty
    };
    options = Object.assign(defaults, options);

    const RED = _RED();

    if (options.nodes) {
        applyTypes.call({RED}, options.nodes);
    }

    const stylePath = path.join(__dirname, '/../css/style.min.css');
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

    const onLoadPromise = new Promise((resolve, reject) => {
        RED.loader.load().then((x) => {
            console.log(x['node-red']['nodes']['mqtt'].js);
            try {
                for (let package in x) {
                    for (let node in x[package]['nodes']) {
                        const js = 'const RED = this.RED;' + x[package]['nodes'][node].js;
                        applyTypes2.call({RED}, js);
                    }
                }
            } catch (err) {
                console.log(err);
            }

            if (!loaded) {
                window.onload = () => {
                    console.log('Resolve1');
                    resolve();
                };
            } else {
                console.log('Resolve2');
                resolve();
            }

        }).catch((err) => {
            console.log(err);
        });
    });

    var oldCreateElement = window.document.createElement;
    window.document.createElement = function (el) {
        if (el === 'canvas') {
            return createCanvas(500, 500);
        } else {
            return oldCreateElement.bind(window.document)(el);
        }
    }
    window.Image = Image;

    const svgSaver = new SvgSaver(window);
    let cache = null;

    function draw (type) { // TODO: use type
        if (cache !== null) {
            return new Promise((resolve, reject) => {
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
