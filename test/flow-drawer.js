const chai = require("chai");
const assert = chai.assert;
const now = require("performance-now");
const FlowDrawer = require("./../src/flow-drawer");

const TEST_FLOWS = [{"id":"bfc121b1.6847","type":"tab","label":"Flow 2","disabled":false,"info":""},{"id":"c1f897dd.90a048","type":"http in","z":"bfc121b1.6847","name":"","url":"/in","method":"get","upload":false,"swaggerDoc":"","x":200,"y":540,"wires":[["9b1c0d8f.216f2"]]},{"id":"9b1c0d8f.216f2","type":"http response","z":"bfc121b1.6847","name":"","statusCode":"200","headers":{},"x":500,"y":540,"wires":[]}];

describe("FlowDrawer", function () {
    describe("cache", function () {
        it("second call to draw with the same params should return cached value", function (done) {
            this.timeout(60000);
            const flowDrawer = new FlowDrawer(TEST_FLOWS);
            flowDrawer.draw("svg").then((images) => {
                assert.isArray(images);
                assert.lengthOf(images, 1);
                const t0 = now();
                flowDrawer.draw("svg").then((i) => {
                    const t1 = now();
                    assert.equal(i, images);
                    assert.isBelow(t1 - t0, 1);
                    done();
                });
            });
        });
    });
});
