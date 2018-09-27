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
    .option('-t, --type <type>', 'export image type (svg or png)', /^(svg|png)$/i, 'svg')
    .option('-f, --format <format>', 'export data format (uri or image)', /^(uri|image)$/i, 'uri')
    .option('--html', 'export preview as html (other options will be ignored)')
    .parse(process.argv);

if ((typeof inputFileValue) === 'undefined') {
    console.error('You need to specify an input file');
    process.exit(1);
}

if (program.format !== 'uri' && (typeof outputDirValue) === 'undefined') {
    console.log('No outputDir provided. Export files will be saved in the current working dir')
    // TODO: set outputDirValue to cwd
}

fs.readFile(inputFileValue, (err, data) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    // TODO: validate data
    const flow = JSON.parse(data);
    new FlowDrawer()
        .draw(flow, program.html ? 'svg': program.type, program.html ? 'uri': program.format)
        .then((result) => outputResult(result))
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });
});

function outputResult (result) {
    if (program.html) {
        console.log('html');
        // TODO: save to html
        return;
    }
    if (program.format === 'uri') {
        console.log(result);
    } else {
        console.log('image');
        // TODO: save to file
    }
}
