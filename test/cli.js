var chai = require('chai');
var assert = chai.assert;
var exec = require('child_process').exec;

const CLI = "node src/cli/flow-drawer.js";

describe('CLI', function() {
  describe('--version', function() {
    it('should return a version that match the package version', function(done) {
      this.timeout(5000);
      exec(`${CLI} --version`, function (err, stdout, stderr) {
        assert.isNull(err);
        assert.equal(stdout.trim(), process.env.npm_package_version);
        assert.isEmpty(stderr);
        done();
      });
    });
  });
});