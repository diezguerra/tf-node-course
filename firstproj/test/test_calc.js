var should = require("chai").should();

describe('Calc', function(){
    describe('Appliers', function() {

        var appliers = require('../appliers');

        it('applyPercent should return the right amount', function(){
            parseInt(appliers.applyPercent(100, .09)).should.equal(109);
        });
        it('applyTax should return the right amount', function(){
            parseInt(appliers.applyTax(100, .05)).should.equal(105);
        });
        it('applyTip should return the right amount', function(){
            parseInt(appliers.applyTip(100, .07)).should.equal(107);
        });
    });
});
