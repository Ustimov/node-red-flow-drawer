const chai = require('chai');
const assert = chai.assert;
const exec = require('child_process').exec;
const fs = require('fs');

const CLI = "node src/cli/flow-drawer.js";
const INPUT_FILE = "test/input/input.json";
const OUTPUT_DIR = "output";

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
  describe('--format=json', function () {
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
    describe('to file (default)', function () {
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
    describe('to file (with specified outputDir)', function () {
      describe("the outputDir doesn't exist", function () {
        it('should return an error message', function (done) {
          this.timeout(60000);
          exec(`${CLI} ${INPUT_FILE} ${OUTPUT_DIR} --format=json`, function (err, stdout, stderr) {
            assert.isNotNull(err);
            assert.isEmpty(stdout);
            assert.equal(stderr.trim(), '[flow-drawer] Output directory not found');
            done();
          });
        });
      });
      describe("the outputDir exists", function () {
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
      })
    });
  });
});