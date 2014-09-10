var prompt = require('prompt');
var appliers = require('./appliers');
var toHumanDollars = require('./utils').toHumanDollars;

prompt.start();

var bill, tipPct, taxPct;

prompt.get(['bill', 'tip', 'tax'], function(err, result) {
    bill = result.bill;
    tipPct = result.tip;
    taxPct = result.tax;

    var withTax = appliers.applyTax(bill, taxPct);
    var withTip = appliers.applyTip(withTax, tipPct);

    console.log("Base bill is:\t\t\t", toHumanDollars(bill));
    console.log(
        "Bill is with taxes:\t\t", toHumanDollars(withTax),
        "(" + toHumanDollars(withTax - bill), "worth of taxes)");
    console.log(
        "Bill is with taxes and tip:\t", toHumanDollars(withTip),
        "(" + toHumanDollars(withTip - withTax), "worth of tip)");
});
