#!/usr/bin/env node
import fs from 'fs';
import program from 'commander';
import FlowDrawer from './../flow-drawer';

let inputFileValue;
let outputDirValue;

program
    .version('0.0.1', '-v, --version')
    .arguments('<inputFile> [outputDir]')
    .action((inputFile, outputDir) => {
        inputFileValue = inputFile;
        outputDirValue = outputDir;
    })
    // .option('-t, --type <type>', 'export image type (svg or png)', /^(svg|png)$/i, 'svg')
    .option('-f, --format <format>', 'export data format (html, json or images)', /^(html|json|images)$/i, 'html')
    .option('-n, --nodes <file>', 'path to file with custom node descriptions')
    .parse(process.argv);

if ((typeof inputFileValue) === 'undefined') {
    console.error('You need to specify an input file');
    process.exit(1);
}

if (program.format !== 'uri' && (typeof outputDirValue) === 'undefined') {
    // console.log('No outputDir provided. Export files will be saved in the current working dir')
    // TODO: set outputDirValue to cwd
}

fs.readFile(inputFileValue, (err, data) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    // TODO: validate data
    const flow = JSON.parse(data);
    const options = {};
    if (program.nodes) {
        options.nodes = program.nodes;
    }
    new FlowDrawer(flow, options)
        .draw(program.html ? 'svg': program.type)
        .then((images) => outputResult(images))
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });
});

function outputResult (images) {
    switch (program.format) {
        case 'html':
            for (let image of images) {
                console.log(`<img src="${image}"></img>`)
            }
            break;
        case 'json':
            console.log(JSON.stringify(images, null, 4));
            break;
        case 'images':
            // TODO
            console.log('Not implemented');
            break;
    }
}
