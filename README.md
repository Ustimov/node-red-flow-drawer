# Node-RED flow drawer

A library and CLI for drawning Node-RED flows from JSON. *Work in progress.*

## CLI

### Installation

```
npm install -g node-red-flow-drawer
```

### Usage

```
flow-drawer -h

Usage: flow-drawer [options] <inputFile> [outputDir]

Options:

  -v, --version          output the version number
  -f, --format <format>  export data format (html, json or images) (default: html)
  -n, --nodes <file>     path to file with custom node descriptions
  -h, --help             output usage information

flow-drawer --format=json input.json > output.json
```

### TODO

 - [x] SVG URI support
 - [ ] SVG file support
 - [ ] PNG URI support
 - [ ] PNG file support

## JavaScript API

```javascript
const FlowDrawer = require("node-red-flow-drawer");

const flow = []; // A flow in JSON format

new FlowDrawer()
  .draw(flow, 'svg')
  .then((images) => {
    // Handle array of URI encoded SVGs
  });
```

## Knows issues:

* PNG support: https://github.com/Automattic/node-canvas/issues/1211

## TODO

* Improve node's width calculation
* Remove redundant styles
* Use Node-RED fonts
* Solid frame around flow's nodes
* Proper handling of unnamed nodes
* Local state inside a FlowDrawer instance
 