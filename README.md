[![Build Status](https://travis-ci.org/Ustimov/node-red-flow-drawer.svg?branch=master)](https://travis-ci.org/Ustimov/node-red-flow-drawer)

# Node-RED flow drawer

A library and CLI for drawning Node-RED flows from JSON files. *Work in progress.*

## JavaScript API

### Installation

```
npm install node-red-flow-drawer --save
```

### Troubleshooting

The library depends on [node canvas v2](https://github.com/Automattic/node-canvas). That's why you can face some issues during installation of the library in case if there are no prebuilt binaries for your system. In this case look at **Compiling** section of node canvas documentation [https://github.com/Automattic/node-canvas#compiling](https://github.com/Automattic/node-canvas#compiling).

### Usage

#### Source

```javascript
// index.js
const fs = require('fs');
const FlowDrawer = require("node-red-flow-drawer");
 
 
const flows = [{"id":"bfc121b1.6847","type":"tab","label":"Flow 2","disabled":false,"info":""},{"id":"c1f897dd.90a048","type":"http in","z":"bfc121b1.6847","name":"","url":"/in","method":"get","upload":false,"swaggerDoc":"","x":200,"y":540,"wires":[["9b1c0d8f.216f2"]]},{"id":"9b1c0d8f.216f2","type":"http response","z":"bfc121b1.6847","name":"","statusCode":"200","headers":{},"x":500,"y":540,"wires":[]}];
 
const options = {};
// options.nodes = "path/to/a/custom/node/file";
 
new FlowDrawer(flows, options)
    .draw("svg")
    .then((images) => {
        for (let image of images) {
            let [, data] = image.split("base64,");
            fs.writeFileSync("output.svg", new Buffer(data, "base64"));
        }
});
```

#### Running

```
node index.js
```

During running may appear next messages:

```
Invalid CSS selector "input::-webkit-input-placeholder,div[contenteditable="true"]::-webkit-input-placeholder,textarea::-webkit-input-placeholder" SyntaxError: unknown pseudo-class selector '::-webkit-input-placeholder'
    at emit (C:\Users\XI333901\Documents\Projects\flow-drawer-test\node_modules\nwsapi\src\nwsapi.js:559:17)
    at compileSelector (C:\Users\XI333901\Documents\Projects\flow-drawer-test\node_modules\nwsapi\src\nwsapi.js:1272:17)
    at compile (C:\Users\XI333901\Documents\Projects\flow-drawer-test\node_modules\nwsapi\src\nwsapi.js:753:23)
    at collect (C:\Users\XI333901\Documents\Projects\flow-drawer-test\node_modules\nwsapi\src\nwsapi.js:1516:18)
    at _querySelectorAll (C:\Users\XI333901\Documents\Projects\flow-drawer-test\node_modules\nwsapi\src\nwsapi.js:1456:18)
    at Object._querySelector [as first] (C:\Users\XI333901\Documents\Projects\flow-drawer-test\node_modules\nwsapi\src\nwsapi.js:1387:14)
    at SVGSVGElementImpl.querySelector (C:\Users\XI333901\Documents\Projects\flow-drawer-test\node_modules\jsdom\lib\jsdom\living\nodes\ParentNode-impl.js:63:44)
    at SVGSVGElement.querySelector (C:\Users\XI333901\Documents\Projects\flow-drawer-test\node_modules\jsdom\lib\jsdom\living\generated\Element.js:703:47)
    at query (C:\Users\XI333901\Documents\Projects\flow-drawer-test\node_modules\svg-saver-node\lib\svg-saver-node.js:102:17)
    at C:\Users\XI333901\Documents\Projects\flow-drawer-test\node_modules\svg-saver-node\lib\svg-saver-node.js:220:15
```

It's related to internal CSS styles, doesn't influence on the end result and will be removed in next releases.

#### Output

![Output](/docs/img/output.png)

#### Options

* **nodes** - path to a file with custom node descriptions

#### Custom node descriptions

Custom node descriptions is a file that contains a part of the Node-RED node [HTML file](https://nodered.org/docs/creating-nodes/node-html), namely the part with **RED.nodes.registerType** calls.

Look at the example for [node-red-contrib-cache](https://github.com/CANDY-LINE/node-red-contrib-cache):

*Note the first line of the file. It's required to get access to current context.*

### Custom node descriptions

This file should contain `RED.nodes.registerType` calls for your custom nodes and the line `const RED = this.RED;` at the top of the file. For instance:

```javascript
const RED = this.RED;
 
RED.nodes.registerType('Cache in',{
  category: 'input',
  defaults: {
    name: { name: '' },
    cache: { type: 'Cache', required: true },
    keyType: { value : 'msg' },
    keyProperty: { value: 'topic', required: true },
    valueType: { value : 'msg' },
    valueProperty: { value: 'payload', required: true },
    useString: { value: false, required: false }
  },
  color: 'Turquoise',
  inputs: 1,
  outputs: 1,
  icon: "db.png",
  label: function() {
    return this.name || 'Cache';
  },
  labelStyle: function() {
    return this.name ? 'node_label_italic' : '';
  },
  oneditprepare: function() {
    $("#node-input-keyProperty").typedInput({default:this.keyType||'msg',types:['msg']});
    $("#node-input-valueProperty").typedInput({default:this.valueType||'msg',types:['msg']});
  }
});
RED.nodes.registerType('Cache out',{
  category: 'output',
  defaults: {
    name: { name: '' },
    cache: { type: 'Cache', required: true },
    keyType: { value : 'msg' },
    keyProperty: { value: 'topic', required: true },
    valueType: { value : 'msg' },
    valueProperty: { value: 'payload', required: true },
    ttlType: { value : 'msg' },
    ttlProperty: { value: '', required: false },
    useString: { value: false, required: false }
  },
  color: 'Turquoise',
  inputs: 1,
  outputs: 0,
  icon: "db.png",
  align: 'right',
  label: function() {
    return this.name || 'Cache';
  },
  labelStyle: function() {
    return this.name ? 'node_label_italic' : '';
  },
  oneditprepare: function() {
    $("#node-input-keyProperty").typedInput({default:this.keyType||'msg',types:['msg']});
    $("#node-input-valueProperty").typedInput({default:this.valueType||'msg',types:['msg']});
    $("#node-input-ttlProperty").typedInput({default:this.ttlType||'msg',types:['msg']});
  }
});
RED.nodes.registerType('Cache',{
  category: 'config',
  defaults: {
    name: { value: '', required: false },
    defaultTtl: { value: '', required: false },
    checkPeriod: { value: '', required: false },
  },
  label: function() {
    return this.name;
  },
});
```

You can register in one file as much nodes as you want.

*Some node definitions may access context objects such as **RED.validators**. This can cause fail during usage of the library. If you faced such issue, it's recommended to replace this parts of the code.*

## CLI

### Installation

```
npm install -g node-red-flow-drawer
```

### Troubleshooting

See notes for JavaScript API.

### Usage

```
flow-drawer -h

Usage: flow-drawer [options] <inputFileOrDir> [outputDir]

Options:

  -v, --version          output the version number
  -f, --format <format>  export data format (html, json or img) (default: html)
  -n, --nodes <file>     path to a file with custom node descriptions
  -s, --stdout           print results to the stdout (will be ignored for batch processing)
  -h, --help             output usage information
```

### Batch processing

There are two options for input data:

* file

* directory

In the second case CLI searches for all files with **.json** extension in the directory tree starting from the input folder, tryes to draw flows from that files and saves drawnings to the **current working directory** or the **outputDir** (if provided).

### Export data formats

CLI supports three types of export data formats:

* **html** - flows save to a single HTML file (useful for previewing)

* **json** - flows save to a single JSON file (JSON array inside)

* **img** - each flow saves to a separate SVG file

Ouputs save to the **outputDir** (if provided) or the **current working directory** and name after the input file.

You can use **--stdout** option (only for **html** and **json**) to print results to the stdout instead of saving to files.

### Custom node descriptions

See JavaScript API section for details.

## Related issues:

* SVG support on Windows (a bloker for drawning to PNG) : https://github.com/Automattic/node-canvas/issues/1211

## TODO

* Improve node's width calculation
* Remove redundant styles
* Check why output has other fonts
* Make frame around flow's nodes solid
* Handle unnamed nodes
* Handle access to RED context from custom node descriptions
* PNG support
* Tests
 
 ## License

 [MIT](/LICENSE)
 