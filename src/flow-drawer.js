const { createCanvas, Image } = require('canvas');
const { JSDOM } = require('jsdom');
const SvgSaver = require('svg-saver-node');
const fs = require('fs');
const path = require('path');
const _RED = require('./red');

function applyTypes(path) {
    const types = fs.readFileSync(path);
    eval(types.toString('utf-8'));
}

function FlowDrawer(flow, options) {

    if (!flow) {
        throw new Error('Invalid flow');    
    }

    const RED = _RED();

    if (options && options.nodes) {
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

    function draw (type) {
        if (type !== 'svg' && type !== 'png') {
            throw new Error(`Not supported type: ${type}`);
        }
        return new Promise((resolve, reject) => {
            RED.nodes.import(flow);
    
            const images = [];

            // Timeout for styles loading
            const workspaceIds = Object.keys(RED.workspaces.tabs());
            setTimeout(() => drawWorkspacesWithIds(workspaceIds).catch((err) => console.log(err)), 100); 
            
            function drawWorkspacesWithIds (ids) {
                const id = ids.pop();
                if (!id) {
                    return;
                } else {
                    RED.workspaces.show(id);
                    const el = RED.view.redraw(true);
                    const callback = function (uri) {
                        images.push(uri);
                        const promise = drawWorkspacesWithIds(ids);
                        if (promise) {
                            promise.catch((err) => { reject(err); });
                        } else {
                            resolve(images);
                        }
                    };
                    if (type === 'svg') {
                        return svgSaver.svgAsDataUri(el).then(callback);
                    } else {
                        return svgSaver.svgAsPngUri(el).then(callback);
                    }
                }
            }
        })
    }

    return {
        draw
    };
}

module.exports = FlowDrawer;
