# Node-RED flow drawer

A library and CLI for drawning Node-RED flows from JSON. *Work in progress.*

## CLI

### Installation

```
npm install -g
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

* TODO

## Knows issues:

* Some nodes have empty labels in some cases
* PNG support: https://github.com/Automattic/node-canvas/issues/1211
