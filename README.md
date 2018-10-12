[![Build Status](https://travis-ci.org/Ustimov/node-red-flow-drawer.svg?branch=master)](https://travis-ci.org/Ustimov/node-red-flow-drawer)

# Node-RED flow drawer

A library and CLI for drawning Node-RED flows from JSON files. *Work in progress.*

## Table of contents

* [JavaScript API](#javascript-api)
  * [Installation](#installation)
  * [Troubleshooting](#troubleshooting)
  * [Usage](#usage)
  * [Options](#options)
  * [Custom node descriptions](#custom-node-descriptions)
* [CLI](#cli)
  * [Installation](#installation-1)
  * [Troubleshooting](#troubleshooting-1)
  * [Usage](#usage-1)
  * [Batch processing](#batch-processing)
  * [Export data formats](#export-data-formats)
  * [Custom node descriptions](#custom-node-descriptions-1)
* [Related issues](#related-issues)
* [TODO](#todo)
* [License](#license)

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
const fs = require("fs");
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

#### Output

![Output](/docs/img/output.png)

### Options

* **nodes** - path to a file with custom node descriptions

### Custom node descriptions

Custom node descriptions is a file that contains a part of the Node-RED node [HTML file](https://nodered.org/docs/creating-nodes/node-html), namely the part with **RED.nodes.registerType** calls.

Look at the example for [node-red-contrib-cache](https://github.com/CANDY-LINE/node-red-contrib-cache):
<details>
<summary>example</summary>

*Note the first line of the file. It's required to get access to current context.*

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

</details>

You can register in one file as much nodes as you want.

*Some node definitions may access context objects such as **RED.validators**. This can cause fail during usage of the library. If you faced such issue, it's recommended to replace this parts of the code.*

## CLI

### Installation

```
npm install -g node-red-flow-drawer
```

### Troubleshooting

See notes for [JavaScript API](#troubleshooting).

### Usage

```
flow-drawer -h

Usage: flow-drawer [options] <inputFileOrDir> [outputDir]

Options:

  -v, --version          output the version number
  -f, --format <format>  export data format (html, json or img) (default: html)
  -n, --nodes <file>     path to a file with custom node descriptions
  -s, --stdout           print results to the stdout (only for file input and html/json output)
  -h, --help             output usage information
```

### Batch processing

There are two options for input data:
* file
* directory

In the second case CLI searches for all files with **.json** extension in the directory tree starting from the input folder, tries to draw flows from that files and saves drawnings to the **current working directory** or the **outputDir** (if provided).

### Export data formats

CLI supports three types of export data formats:
* **html** - flows save to a single HTML file (useful for previewing)
* **json** - flows save to a single JSON file (JSON array inside)
* **img** - each flow saves to a separate SVG file

Ouputs save to the **outputDir** (if provided) or the **current working directory** and name after the input file.

You can use **--stdout** option (only for **html** and **json**) to print results to the stdout instead of saving to files.

### Custom node descriptions

See [JavaScript API](#custom-node-descriptions) section for details.

## Related issues:

* SVG support on Windows (a bloker for drawning to PNG) : https://github.com/Automattic/node-canvas/issues/1211

## TODO

* Check why output has other fonts
* Handle unnamed nodes
* Handle access to RED context from custom node descriptions
* PNG support
 
## License

[MIT](/LICENSE)
