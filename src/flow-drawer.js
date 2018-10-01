import { createCanvas, Image } from 'canvas';
import { JSDOM } from 'jsdom';
import SvgSaver from 'svg-saver-node';
import fs from 'fs';
import RED from './red';

function NodeRedFlowDrawer(options) {
    const nodeList = [{"id":"node-red/sentiment","name":"sentiment","types":["sentiment"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/inject","name":"inject","types":["inject"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/catch","name":"catch","types":["catch"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/status","name":"status","types":["status"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/debug","name":"debug","types":["debug"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/link","name":"link","types":["link in","link out"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/exec","name":"exec","types":["exec"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/function","name":"function","types":["function"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/template","name":"template","types":["template"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/delay","name":"delay","types":["delay"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/trigger","name":"trigger","types":["trigger"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/comment","name":"comment","types":["comment"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/unknown","name":"unknown","types":["unknown"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/rpi-gpio","name":"rpi-gpio","types":["rpi-gpio in","rpi-gpio out","rpi-mouse","rpi-keyboard"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/tls","name":"tls","types":["tls-config"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/mqtt","name":"mqtt","types":["mqtt in","mqtt out","mqtt-broker"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/httpin","name":"httpin","types":["http in","http response"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/httprequest","name":"httprequest","types":["http request"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/websocket","name":"websocket","types":["websocket in","websocket out","websocket-listener","websocket-client"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/watch","name":"watch","types":["watch"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/tcpin","name":"tcpin","types":["tcp in","tcp out","tcp request"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/udp","name":"udp","types":["udp in","udp out"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/switch","name":"switch","types":["switch"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/change","name":"change","types":["change"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/range","name":"range","types":["range"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/split","name":"split","types":["split","join"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/sort","name":"sort","types":["sort"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/batch","name":"batch","types":["batch"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/CSV","name":"CSV","types":["csv"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/HTML","name":"HTML","types":["html"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/JSON","name":"JSON","types":["json"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/XML","name":"XML","types":["xml"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/YAML","name":"YAML","types":["yaml"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red/tail","name":"tail","types":["tail"],"enabled":true,"local":false,"module":"node-red","err":"Not currently supported on Windows.","version":"0.19.4-git"},{"id":"node-red/file","name":"file","types":["file","file in"],"enabled":true,"local":false,"module":"node-red","version":"0.19.4-git"},{"id":"node-red-node-rbe/rbe","name":"rbe","types":["rbe"],"enabled":true,"local":false,"module":"node-red-node-rbe","version":"0.2.3"},{"id":"node-red-node-email/email","name":"email","types":["e-mail","e-mail in"],"enabled":true,"local":false,"module":"node-red-node-email","version":"0.1.29"},{"id":"node-red-node-feedparser/feedparse","name":"feedparse","types":["feedparse"],"enabled":true,"local":false,"module":"node-red-node-feedparser","version":"0.1.14"},{"id":"node-red-node-twitter/twitter","name":"twitter","types":["twitter-credentials","twitter in","twitter out"],"enabled":true,"local":false,"module":"node-red-node-twitter","version":"1.1.2"},{"id":"node-red-contrib-test-node/test-node","name":"test-node","types":["test-node"],"enabled":true,"local":true,"module":"node-red-contrib-test-node","version":"0.0.2"}];
    RED.nodes.setNodeList(nodeList);

    const c = fs.readFileSync('lib/red/types.js');
    eval(c.toString('utf-8'));

    const { window } = new JSDOM(`
        <html>
            <link rel="stylesheet" href="file://css/style.min.css">
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

module.exports = NodeRedFlowDrawer;
