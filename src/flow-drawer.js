import { createCanvas, Image } from 'canvas';
import { JSDOM } from 'jsdom';
import SvgSaver from 'svg-saver-node';
import fs from 'fs';
import path from 'path';
import _RED from './red';

function applyTypes(path) {
    const types = fs.readFileSync(path);
    eval(types.toString('utf-8'));
}

function FlowDrawer(options) {

    const RED = _RED();

    if (options && options.types) {
        applyTypes.call({RED}, options.types);
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

    function draw (flow, type) {
        // TODO: use type
        return new Promise((resolve, reject) => {
            if (flow) {
                RED.nodes.import(flow);
            } else {
                reject("A flow for drawing isn't provided");  
            }
    
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
        })
    }

    return {
        draw
    };
}

module.exports = FlowDrawer;
