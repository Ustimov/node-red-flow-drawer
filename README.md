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
* Currently supports only default nodes

## TODO

* Custom node support
* Improve node width calculation
* Remove redundant styles
