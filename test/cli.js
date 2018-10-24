const chai = require("chai");
const assert = chai.assert;
const exec = require("child_process").exec;
const fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const CLI = "node src/cli/flow-drawer.js";
const INPUT_FILE = "test/input/input.json";
const OUTPUT_DIR = "output";
const INPUT_DIR = "test/input/batch";

describe("CLI", function () {

    // General
    describe("--version", function () {
        it("should return a version that match the package version", function (done) {
            this.timeout(5000);
            exec(`${CLI} --version`, function (err, stdout, stderr) {
                assert.isNull(err);
                assert.equal(stdout.trim(), process.env.npm_package_version);
                assert.isEmpty(stderr);
                done();
            });
        });
    });
    describe("inputFileOrDir", function () {
        describe("inputFileOrDir isn't specified", function () {
            it("should return an error message", function (done) {
                this.timeout(5000);
                exec(`${CLI}`, function (err, stdout, stderr) {
                    assert.isNotNull(err);
                    assert.isEmpty(stdout);
                    assert.equal(stderr.trim(), "[flow-drawer] You need to specify an input file or a directory");
                    done();
                });
            });
        });
        describe("inputFileOrDir doesn't exist", function () {
            it("should return an error message", function (done) {
                this.timeout(5000);
                exec(`${CLI} does-not-exist`, function (err, stdout, stderr) {
                    assert.isNotNull(err);
                    assert.isEmpty(stdout);
                    assert.equal(stderr.trim(), "[flow-drawer] Input file or directory doesn't exist");
                    done();
                });
            });
        });
    });
    describe("outputDir doesn't exist", function () {
        it("should return an error message", function (done) {
            this.timeout(5000);
            exec(`${CLI} ${INPUT_FILE} does-not-exist`, function (err, stdout, stderr) {
                assert.isNotNull(err);
                assert.isEmpty(stdout);
                assert.equal(stderr.trim(), "[flow-drawer] Output directory not found");
                done();
            });
        });
    });
    describe("--nodes", function () {
        describe("file with custom nodes doesn't exist", function () {
            it("should return an error message", function (done) {
                this.timeout(5000);
                exec(`${CLI} ${INPUT_FILE} --nodes=does-not-exist`, function (err, stdout, stderr) {
                    assert.isNotNull(err);
                    assert.isEmpty(stdout);
                    assert.equal(stderr.trim(), "[flow-drawer] File with custom node definitions not found");
                    done();
                });
            });
        });
    });
    describe("--stdout and directory as input", function () {
        it("should return an error message", function (done) {
            this.timeout(5000);
            exec(`${CLI} ${INPUT_DIR} --stdout`, function (err, stdout, stderr) {
                assert.isNotNull(err);
                assert.isEmpty(stdout);
                assert.equal(stderr.trim(), "[flow-drawer] Option --stdout isn't supported for directory input");
                done();
            });
        });
    });

    function safeDelete (path) {
        if (fs.existsSync(path)) {
            const stat = fs.lstatSync(path);
            if (stat.isFile()) {
                fs.unlinkSync(path);
            } else if (stat.isDirectory()) {
                fs.rmdirSync(path);
            }
        }
    }

    // JSON
    describe("--format=json", function () {
        describe("file input", function () {
            var output;
            describe("--stdout", function () {
                it("should return an array of three items", function (done) {
                    this.timeout(60000);
                    exec(`${CLI} ${INPUT_FILE} --format=json --stdout`, { maxBuffer: 1024 * 1024 }, function (err, stdout, stderr) {
                        assert.isNull(err);
                        output = JSON.parse(stdout);
                        assert.isArray(output);
                        assert.lengthOf(output, 3);
                        assert.isEmpty(stderr);
                        done();
                    });
                });
            });
            describe("CWD", function () {
                after(function () {
                    safeDelete("input.json");
                });
                it("should be equal to the stdout output", function (done) {
                    this.timeout(60000);
                    exec(`${CLI} ${INPUT_FILE} --format=json`, function (err, stdout, stderr) {
                        assert.isNull(err);
                        assert.isEmpty(stdout);
                        assert.equal(stderr.trim(), "[flow-drawer] No outputDir provided. Exported files will be saved in the current working directory");
                        assert.deepEqual(JSON.parse(fs.readFileSync("input.json")), output);
                        done();
                    });
                });
            });
            describe("outputDir", function () {
                before(function () {
                    fs.mkdirSync(OUTPUT_DIR);
                });
                after(function () {
                    safeDelete(`${OUTPUT_DIR}/input.json`);
                    safeDelete(OUTPUT_DIR);
                });
                it("should be equal to the stdout output", function (done) {
                    this.timeout(60000);
                    exec(`${CLI} ${INPUT_FILE} ${OUTPUT_DIR} --format=json`, function (err, stdout, stderr) {
                        assert.isNull(err);
                        assert.isEmpty(stdout);
                        assert.isEmpty(stderr);
                        assert.deepEqual(JSON.parse(fs.readFileSync(`${OUTPUT_DIR}/input.json`)), output);
                        done();
                    });
                });
            });
        });
        describe("directory input", function () {
            after(function () {
                safeDelete("flow1.json");
                safeDelete("flow2.json");
            });
            describe("CWD", function () {
                it("should be two files in CWD with one and two item arrays", function (done) {
                    this.timeout(60000);
                    exec(`${CLI} ${INPUT_DIR} --format=json`, function (err, stdout, stderr) {
                        assert.isNull(err);
                        assert.isEmpty(stdout);
                        assert.equal(stderr.trim(), "[flow-drawer] No outputDir provided. Exported files will be saved in the current working directory");
                        const flow1 = JSON.parse(fs.readFileSync("flow1.json"));
                        assert.isArray(flow1);
                        assert.lengthOf(flow1, 1);
                        const flow2 = JSON.parse(fs.readFileSync("flow2.json"));
                        assert.isArray(flow2);
                        assert.lengthOf(flow2, 2);
                        done();
                    });
                });
            });
            describe("outputDir", function () {
                before(function () {
                    fs.mkdirSync(OUTPUT_DIR);
                });
                after(function () {
                    safeDelete(`${OUTPUT_DIR}/flow1.json`);
                    safeDelete(`${OUTPUT_DIR}/flow2.json`);
                    safeDelete(OUTPUT_DIR);
                });
                it("should be two files in outputDir with one and two item arrays", function (done) {
                    this.timeout(60000);
                    exec(`${CLI} ${INPUT_DIR} ${OUTPUT_DIR} --format=json`, function (err, stdout, stderr) {
                        assert.isNull(err);
                        assert.isEmpty(stdout);
                        assert.isEmpty(stderr.trim());
                        const flow1 = JSON.parse(fs.readFileSync(`${OUTPUT_DIR}/flow1.json`));
                        assert.isArray(flow1);
                        assert.lengthOf(flow1, 1);
                        const flow2 = JSON.parse(fs.readFileSync(`${OUTPUT_DIR}/flow2.json`));
                        assert.isArray(flow2);
                        assert.lengthOf(flow2, 2);
                        done();
                    });
                });
            });
        });
    });

    function assertImageTagCountInFile(file, count) {
        const { window } = new JSDOM(fs.readFileSync(file));
        const images = window.document.getElementsByTagName("img");
        assert.equal(images.length, count);
    }

    // HTML
    describe("--format=html", function () {
        describe("file input", function () {
            describe("--stdout", function () {
                it("should return an HTML page with three IMG blocks", function (done) {
                    this.timeout(60000);
                    exec(`${CLI} ${INPUT_FILE} --format=html --stdout`, { maxBuffer: 1024 * 1024 }, function (err, stdout, stderr) {
                        assert.isNull(err);
                        const { window } = new JSDOM(stdout);
                        const images = window.document.getElementsByTagName("img");
                        assert.lengthOf(images, 3);
                        assert.isEmpty(stderr);
                        done();
                    });
                });
            });
            describe("CWD", function () {
                after(function () {
                    safeDelete("input.html");
                });
                it("should save to CWD an HTML page with three IMG blocks", function (done) {
                    this.timeout(60000);
                    exec(`${CLI} ${INPUT_FILE} --format=html`, function (err, stdout, stderr) {
                        assert.isNull(err);
                        assert.isEmpty(stdout);
                        assert.equal(stderr.trim(), "[flow-drawer] No outputDir provided. Exported files will be saved in the current working directory");
                        assertImageTagCountInFile("input.html", 3);
                        done();
                    });
                });
            });
            describe("outputDir", function () {
                before(function () {
                    fs.mkdirSync(OUTPUT_DIR);
                });
                after(function () {
                    safeDelete(`${OUTPUT_DIR}/input.html`);
                    safeDelete(OUTPUT_DIR);
                });
                it("should save to outputDir an HTML page with three IMG blocks", function (done) {
                    this.timeout(60000);
                    exec(`${CLI} ${INPUT_FILE} ${OUTPUT_DIR} --format=html`, function (err, stdout, stderr) {
                        assert.isNull(err);
                        assert.isEmpty(stdout);
                        assert.isEmpty(stderr);
                        assertImageTagCountInFile(`${OUTPUT_DIR}/input.html`, 3);
                        done();
                    });
                });
            });
        });
        describe("directory input", function () {
            after(function () {
                safeDelete("flow1.html");
                safeDelete("flow2.html");
            });
            describe("CWD", function () {
                it("should be two HTML files in CWD with one and two IMG blocks", function (done) {
                    this.timeout(60000);
                    exec(`${CLI} ${INPUT_DIR} --format=html`, function (err, stdout, stderr) {
                        assert.isNull(err);
                        assert.isEmpty(stdout);
                        assert.equal(stderr.trim(), "[flow-drawer] No outputDir provided. Exported files will be saved in the current working directory");
                        assertImageTagCountInFile("flow1.html", 1);
                        assertImageTagCountInFile("flow2.html", 2);
                        done();
                    });
                });
            });
            describe("outputDir", function () {
                before(function () {
                    fs.mkdirSync(OUTPUT_DIR);
                });
                after(function () {
                    fs.unlinkSync(`${OUTPUT_DIR}/flow1.html`);
                    fs.unlinkSync(`${OUTPUT_DIR}/flow2.html`);
                    fs.rmdirSync(OUTPUT_DIR);
                });
                it("should be two HTML files in outputDir with one and two IMG blocks", function (done) {
                    this.timeout(60000);
                    exec(`${CLI} ${INPUT_DIR} ${OUTPUT_DIR} --format=html`, function (err, stdout, stderr) {
                        assert.isNull(err);
                        assert.isEmpty(stdout);
                        assert.isEmpty(stderr.trim());
                        assertImageTagCountInFile(`${OUTPUT_DIR}/flow1.html`, 1);
                        assertImageTagCountInFile(`${OUTPUT_DIR}/flow2.html`, 2);
                        done();
                    });
                });
            });
        });

        // IMG
        describe("--format=img", function () {
            describe("file input", function () {
                describe("--stdout", function () {
                    it("should return an error message", function (done) {
                        this.timeout(5000);
                        exec(`${CLI} ${INPUT_FILE} --format=img --stdout`, function (err, stdout, stderr) {
                            assert.isNotNull(err);
                            assert.isEmpty(stdout);
                            assert.equal(stderr.trim(), "[flow-drawer] Option --stdout isn't supported for img export format");
                            done();
                        });
                    });
                });
                describe("CWD", function () {
                    after(function () {
                        safeDelete("input-0.svg");
                        safeDelete("input-1.svg");
                        safeDelete("input-2.svg");
                    });
                    it("should save to CWD three SVG images", function (done) {
                        this.timeout(60000);
                        exec(`${CLI} ${INPUT_FILE} --format=img`, function (err, stdout, stderr) {
                            assert.isNull(err);
                            assert.isEmpty(stdout);
                            assert.equal(stderr.trim(), "[flow-drawer] No outputDir provided. Exported files will be saved in the current working directory");
                            assert.isTrue(fs.existsSync("input-0.svg"));
                            assert.isTrue(fs.existsSync("input-1.svg"));
                            assert.isTrue(fs.existsSync("input-2.svg"));
                            done();
                        });
                    });
                });
                describe("outputDir", function () {
                    before(function () {
                        fs.mkdirSync(OUTPUT_DIR);
                    });
                    after(function () {
                        safeDelete(`${OUTPUT_DIR}/input-0.svg`);
                        safeDelete(`${OUTPUT_DIR}/input-1.svg`);
                        safeDelete(`${OUTPUT_DIR}/input-2.svg`);
                        safeDelete(OUTPUT_DIR);
                    });
                    it("should save to outputDir three SVG images", function (done) {
                        this.timeout(60000);
                        exec(`${CLI} ${INPUT_FILE} ${OUTPUT_DIR} --format=img`, function (err, stdout, stderr) {
                            assert.isNull(err);
                            assert.isEmpty(stdout);
                            assert.isEmpty(stderr);
                            assert.isTrue(fs.existsSync(`${OUTPUT_DIR}/input-0.svg`));
                            assert.isTrue(fs.existsSync(`${OUTPUT_DIR}/input-1.svg`));
                            assert.isTrue(fs.existsSync(`${OUTPUT_DIR}/input-2.svg`));
                            done();
                        });
                    });
                });
            });
            describe("directory input", function () {
                describe("CWD", function () {
                    after(function () {
                        safeDelete("flow1-0.svg");
                        safeDelete("flow2-0.svg");
                        safeDelete("flow2-1.svg");
                    });
                    it("should be three SVG images in CWD", function (done) {
                        this.timeout(60000);
                        exec(`${CLI} ${INPUT_DIR} --format=img`, function (err, stdout, stderr) {
                            assert.isNull(err);
                            assert.isEmpty(stdout);
                            assert.equal(stderr.trim(), "[flow-drawer] No outputDir provided. Exported files will be saved in the current working directory");
                            assert.isTrue(fs.existsSync("flow1-0.svg"));
                            assert.isTrue(fs.existsSync("flow2-0.svg"));
                            assert.isTrue(fs.existsSync("flow2-1.svg"));
                            done();
                        });
                    });
                });
                describe("outputDir", function () {
                    before(function () {
                        fs.mkdirSync(OUTPUT_DIR);
                    });
                    after(function () {
                        safeDelete(`${OUTPUT_DIR}/flow1-0.svg`);
                        safeDelete(`${OUTPUT_DIR}/flow2-0.svg`);
                        safeDelete(`${OUTPUT_DIR}/flow2-1.svg`);
                        safeDelete(OUTPUT_DIR);
                    });
                    it("should be three SVG images in outputDir", function (done) {
                        this.timeout(60000);
                        exec(`${CLI} ${INPUT_DIR} ${OUTPUT_DIR} --format=img`, function (err, stdout, stderr) {
                            assert.isNull(err);
                            assert.isEmpty(stdout);
                            assert.isEmpty(stderr.trim());
                            assert.isTrue(fs.existsSync(`${OUTPUT_DIR}/flow1-0.svg`));
                            assert.isTrue(fs.existsSync(`${OUTPUT_DIR}/flow2-0.svg`));
                            assert.isTrue(fs.existsSync(`${OUTPUT_DIR}/flow2-1.svg`));
                            done();
                        });
                    });
                });
            });
        });

    });
});
