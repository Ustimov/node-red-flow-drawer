[![Build Status](https://travis-ci.org/Ustimov/node-red-flow-drawer.svg?branch=master)](https://travis-ci.org/Ustimov/node-red-flow-drawer)

# Node-RED flow drawer

A library and CLI for drawning [Node-RED](https://github.com/node-red/node-red) flows from JSON files.

## Table of contents

* [Prerequisites](#prerequisites)
* [JavaScript API](#javascript-api)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Settings](#settings)
* [CLI](#cli)
  * [Installation](#installation-1)
  * [Usage](#usage-1)
  * [Batch processing](#batch-processing)
  * [Export data formats](#export-data-formats)
* [How to install external nodes](#how-to-install-external-nodes)
* [Known issues](#known-issues)
* [Troubleshooting](#troubleshooting)
* [License](#license)

## Prerequisites

* Node.js 6+

## JavaScript API

### Installation

```
npm install node-red-flow-drawer --save
```

### Usage

#### Source

```javascript
// index.js
const fs = require("fs");
const FlowDrawer = require("node-red-flow-drawer");
 
const flows = [{"id":"bfc121b1.6847","type":"tab","label":"Flow 2","disabled":false,"info":""},{"id":"c1f897dd.90a048","type":"http in","z":"bfc121b1.6847","name":"","url":"/in","method":"get","upload":false,"swaggerDoc":"","x":200,"y":540,"wires":[["9b1c0d8f.216f2"]]},{"id":"9b1c0d8f.216f2","type":"http response","z":"bfc121b1.6847","name":"","statusCode":"200","headers":{},"x":500,"y":540,"wires":[]}];

// Optional settings (here are defaults)
const settings = {
    httpNodeRoot: "/",      // Root for http nodes
    userDir: process.cwd()  // A directory with extenal node installations
};

new FlowDrawer(flows, settings)
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

### Settings

* **httpNodeRoot** - root for http nodes
* **userDir** - a directory with external node installations

## CLI

### Installation

```
npm install -g node-red-flow-drawer
```

### Usage

```
flow-drawer -h

Usage: flow-drawer [options] <inputFileOrDir> [outputDir]

Options:
  -v, --version          output the version number
  -f, --format <format>  export data format (html, json or img) (default: "html")
  -n, --nodes <dir>      path to a directory with installed as npm packages external nodes (CWD by default)
  -s, --stdout           print results to the stdout (only for file input and html/json output)
  -h, --help             output usage information
```

### Batch processing

There are two options for input data:
* file
* directory

In the second case CLI searches for all files with **.json** extension in the directory tree starting from the input folder, tries to draw flows from that files and saves drawnings to the **CWD** or to the **outputDir** (if provided).

### Export data formats

CLI supports three kinds of export data format:
* **html** - all flows save to a single HTML file (useful for previewing)
* **json** - all flows save to a single JSON file (with JSON array inside)
* **img** - each flow saves to a separate SVG file

Ouputs save to the **outputDir** (if provided) or to the **CWD** and name after the input file.

You can use **--stdout** option (only for **html** and **json** formats) to print results to the stdout instead of saving to files.

## How to install external nodes

In order to install an external node, you need to install its **npm package** to a directory and provide the path to the directory as **userDir** setting in **JavaScript API** or as **--nodes** option for **CLI**.

## Known issues:

* It's not possible to use SVG icons for nodes and to save flows as PNG on Windows (https://github.com/Automattic/node-canvas/issues/1211)
* Exported images use another font

## Troubleshooting

The library depends on [node-canvas](https://github.com/Automattic/node-canvas) library. That's why you can face some issues during installation of the library in case if there are no prebuilt binaries for your system. In this case look at **Compiling** section of node-canvas documentation [https://github.com/Automattic/node-canvas#compiling](https://github.com/Automattic/node-canvas#compiling).

## License

[MIT](/LICENSE)
