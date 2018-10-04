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

Usage: flow-drawer [options] <inputFileOrDir> [outputDir]

Options:

  -v, --version          output the version number
  -f, --format <format>  export data format (html, json or img) (default: html)
  -n, --nodes <file>     path to a file with custom node descriptions
  -s, --stdout           print results to the stdout (will be ignored for batch processing)
  -h, --help             output usage information
```

### Custom node descriptions

This file should contain `RED.nodes.registerType` calls for your custom nodes and the line `const RED = this.RED;` at the top of the file. For instance:

```javascript
const RED = this.RED;

RED.nodes.registerType('Cache in',{
    category: 'input',
    defaults: {
      name: { name: '' },
    },
    color: 'Turquoise',
    inputs: 1,
    outputs: 1,
    icon: "db.png",
});
```

### TODO

 - [x] SVG URI support
 - [ ] SVG file support
 - [ ] PNG URI support
 - [ ] PNG file support

## JavaScript API

### Installation

```
npm install node-red-flow-drawer --save
```

### Usage

```javascript
const FlowDrawer = require("node-red-flow-drawer");

const flows = []; // Flows in JSON format

// In case you use custom nodes
const options = {
  nodes: "path to a file with custom node definitions"
};

new FlowDrawer(flows, options)
  .draw('svg')
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
* Tests
 
 ## License

 [MIT](/LICENSE)
 