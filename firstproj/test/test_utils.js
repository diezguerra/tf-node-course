require('chai').should();
var toHumanDollars = require('../utils').toHumanDollars;

describe('Utils', function() {
    describe('toHumanDollars', function() {
        it('should humanize 0.050000128 properly', function() {
            toHumanDollars(0.050000128).should.equal('$0.05');
        });
    });
});
