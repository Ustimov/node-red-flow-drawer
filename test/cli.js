const chai = require('chai');
const assert = chai.assert;
const exec = require('child_process').exec;
const fs = require('fs');

const CLI = "node src/cli/flow-drawer.js";
const INPUT_FILE = "test/input/input.json";
const OUTPUT_DIR = "output";
const INPUT_DIR = "test/input/batch";

describe('CLI', function () {
  describe('--version', function () {
    it('should return a version that match the package version', function (done) {
      this.timeout(5000);
      exec(`${CLI} --version`, function (err, stdout, stderr) {
        assert.isNull(err);
        assert.equal(stdout.trim(), process.env.npm_package_version);
        assert.isEmpty(stderr);
        done();
      });
    });
  });
  describe('inputFileOrDir', function (err, stdout, stderr) {
    describe("inputFileOrDir isn't specified", function () {
      it('should return an error message', function (done) {
        this.timeout(5000);
        exec(`${CLI}`, function (err, stdout, stderr) {
          assert.isNotNull(err);
          assert.isEmpty(stdout);
          assert.equal(stderr.trim(), '[flow-drawer] You need to specify an input file or a directory');
          done();
        });
      });
    });
    describe("inputFileOrDir doesn't exist", function () {
      it('should return an error message', function (done) {
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
    it('should return an error message', function (done) {
      this.timeout(5000);
      exec(`${CLI} ${INPUT_FILE} does-not-exist`, function (err, stdout, stderr) {
        assert.isNotNull(err);
        assert.isEmpty(stdout);
        assert.equal(stderr.trim(), '[flow-drawer] Output directory not found');
        done();
      });
    });
  });
  describe('--format=json', function () {
    describe('file input', function () {
      var output;
      describe('--stdout', function () {
        it('should return an array of three items', function (done) {
          this.timeout(60000);
          exec(`${CLI} ${INPUT_FILE} --format=json --stdout`, {maxBuffer: 1024 * 1024}, function (err, stdout, stderr) {
            assert.isNull(err);
            output = JSON.parse(stdout);
            assert.isArray(output);
            assert.lengthOf(output, 3)
            // TODO: fix css errors
            // assert.isEmpty(stderr);
            done();
          });
        });
      });
      describe('CWD', function () {
        it('should be equal to the stdout output', function (done) {
          this.timeout(60000);
          exec(`${CLI} ${INPUT_FILE} --format=json`, function (err, stdout, stderr) {
            assert.isNull(err);
            assert.isEmpty(stdout);
            // TODO: fix css errors
            // assert.isEmpty(stderr);
            assert.deepEqual(JSON.parse(fs.readFileSync('input.json')), output);
            fs.unlinkSync('input.json');
            done();
          });
        });
      });
      describe('outputDir', function () {
        it('should be equal to the stdout output', function (done) {
          this.timeout(60000);
          fs.mkdirSync(OUTPUT_DIR);
          exec(`${CLI} ${INPUT_FILE} ${OUTPUT_DIR} --format=json`, function (err, stdout, stderr) {
            assert.isNull(err);
            assert.isEmpty(stdout);
            // TODO: fix css errors
            // assert.isEmpty(stderr);
            assert.deepEqual(JSON.parse(fs.readFileSync(`${OUTPUT_DIR}/input.json`)), output);
            fs.unlinkSync(`${OUTPUT_DIR}/input.json`);
            fs.rmdirSync(OUTPUT_DIR);
            done();
          });
        });
      });
    });
    describe('directory input', function () {
      describe('--stdout', function () {
        it('should return an error message', function (done) {
          this.timeout(5000);
          exec(`${CLI} ${INPUT_DIR} --format=json --stdout`, function (err, stdout, stderr) {
            assert.isNotNull(err);
            assert.isEmpty(stdout);
            assert.equal(stderr.trim(), "[flow-drawer] Option --stdout isn't supported for directory input");
            done();
          });
        });
      });

      describe('CWD', function () {
        it('should be two files in CWD with arrays of one item', function (done) {
          this.timeout(60000);
          exec(`${CLI} ${INPUT_DIR} --format=json`, function (err, stdout, stderr) {
            assert.isNull(err);
            assert.isEmpty(stdout);
            // TODO: fix css errors
            // assert.isEmpty(stderr);
            const flow1 = JSON.parse(fs.readFileSync('flow1.json'));
            assert.isArray(flow1);
            assert.lengthOf(flow1, 1);
            const flow2 = JSON.parse(fs.readFileSync('flow2.json'));
            assert.isArray(flow2);
            assert.lengthOf(flow2, 1);
            fs.unlinkSync('flow1.json');
            fs.unlinkSync('flow2.json');
            done();
          });
        });
      });
      describe("outputDir", function () {
        it('should be two files in outputDir with arrays of one item', function (done) {
          this.timeout(60000);
          fs.mkdirSync(OUTPUT_DIR);
          exec(`${CLI} ${INPUT_DIR} ${OUTPUT_DIR} --format=json`, function (err, stdout, stderr) {
            assert.isNull(err);
            assert.isEmpty(stdout);
            // TODO: fix css errors
            // assert.isEmpty(stderr);
            const flow1 = JSON.parse(fs.readFileSync(`${OUTPUT_DIR}/flow1.json`));
            assert.isArray(flow1);
            assert.lengthOf(flow1, 1);
            const flow2 = JSON.parse(fs.readFileSync(`${OUTPUT_DIR}/flow2.json`));
            assert.isArray(flow2);
            assert.lengthOf(flow2, 1);
            fs.unlinkSync(`${OUTPUT_DIR}/flow1.json`);
            fs.unlinkSync(`${OUTPUT_DIR}/flow2.json`);
            fs.rmdirSync(OUTPUT_DIR);
            done();
          });
        });
      });
    });
  });
});
