#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const program = require('commander');
const FlowDrawer = require('./../flow-drawer');

let inputFileOrDirValue;
let outputDirValue;

program
    .version('0.0.3', '-v, --version')
    .arguments('<inputFileOrDir> [outputDir]')
    .action((inputFileOrDir, outputDir) => {
        inputFileOrDirValue = inputFileOrDir;
        outputDirValue = outputDir;
    })
    //.option('-t, --type <type>', 'export image type (svg or png)', /^(svg|png)$/i, 'svg')
    .option('-f, --format <format>', 'export data format (html, json or img)', /^(html|json|img)$/i, 'html')
    .option('-n, --nodes <file>', 'path to a file with custom node descriptions')
    .option('-s, --stdout', "print results to the stdout (only for file input and html/json output)")
    .parse(process.argv);

program.type = 'svg';

if (typeof inputFileOrDirValue === 'undefined') {
    console.error('[flow-drawer] You need to specify an input file or a directory');
    process.exit(1);
}

if (!fs.existsSync(inputFileOrDirValue)) {
    console.error("[flow-drawer] Input file or directory doesn't exist");
    process.exit(1);
}

const options = {};
if (program.nodes) {
    if (!fs.existsSync(program.nodes)) {
        console.error('[flow-drawer] File with custom node definitions not found');
        process.exit(1);
    } else {
        options.nodes = program.nodes;
    }
}

if (program.format === 'img' && program.stdout) {
    console.error("[flow-drawer] Option --stdout isn't supported for img export format");
    process.exit(1);
}

const stat = fs.lstatSync(inputFileOrDirValue);

if (stat.isDirectory() && program.stdout) {
    console.error("[flow-drawer] Option --stdout isn't supported for directory input");
    process.exit(1);
}

if (typeof outputDirValue === 'undefined') {
    if (!program.stdout) {
        console.error('[flow-drawer] No outputDir provided. Exported files will be saved in the current working directory');
    }
    outputDirValue = '';
} else if (!fs.existsSync(outputDirValue)) {
    console.error('[flow-drawer] Output directory not found');
    process.exit(1);
}

if (stat.isFile()) {
    processFile(inputFileOrDirValue);
} else if (stat.isDirectory()) {
    walk(inputFileOrDirValue, (err, results) => {
        if (err) {
            console.error(err);
            process.exit(1);
        } else {
            draw(results);
        }
    });
} else {
    console.error('[flow-drawer] Input is neither a file nor a directory');
    process.exit(1);
}

function draw (files) {
    let file = files.pop();
    if (path.extname(file) === '.json') {
        processFile(file).then(() => {
            if (files.length > 0) {
                draw(files);
            }
        });
    }
}

function processFile (inputPath) {
    const flows = JSON.parse(fs.readFileSync(inputPath).toString('utf-8'));
    return new FlowDrawer(flows, options)
        .draw(program.type)
        .then((images) => outputResult(images, inputPath))
        .catch((err) => {
            console.error(err);
        });
}

function outputResult (images, inputPath) {
    const outputPath = path.join(outputDirValue, path.basename(inputPath, '.json'));
    switch (program.format) {
        case 'html':
            exportAsHtml(images, `${outputPath}.${program.format}`)
            break;
        case 'json':
            exportAsJson(images, `${outputPath}.${program.format}`)
            break;
        case 'img':
            exportAsImages(images, outputPath);
            break;
    }
}

function exportAsHtml (images, outputPath) {
    let output = '';
    for (let image of images) {
        output += `<img src="${image}"></img>`;
    }
    write (output, outputPath);
}

function exportAsJson (images, outputPath) {
    let output = JSON.stringify(images, null, 4);
    write(output, outputPath);
}

function write (output, outputPath) {
    if (stat.isFile() && program.stdout) {
        console.log(output);
    } else {
        fs.writeFileSync(outputPath, output);
    }
}

const regex = /^data:.+\/(.+);base64,(.*)$/;
function exportAsImages (images, outputPath) {
    const digitCount = String(images.length).length;
    const padding = "0".repeat(digitCount);
    for (let i = 0; i < images.length; i++) {
        const matches = images[i].match(regex);
        const data = matches[2];
        const number = (padding + i).slice(-digitCount);
        fs.writeFileSync(`${outputPath}-${number}.${program.type}`, new Buffer(data, 'base64'));
    }
}

function walk (dir, done) {
    let results = [];
    fs.readdir(dir, function (err, list) {
        if (err) {
            return done(err);
        }
        let pending = list.length;
        if (!pending) {
            return done(null, results);
        }
        list.forEach(function (file) {
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function(err, res) {
                        results = results.concat(res);
                        if (!--pending) {
                            done(null, results);
                        }
                    });
                } else {
                    results.push(file);
                    if (!--pending)
                    {
                        done(null, results);
                    }
                }
            });
        });
    });
};
