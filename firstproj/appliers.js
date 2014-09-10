module.exports.applyTip = applyPercent;
module.exports.applyTax = applyPercent;
module.exports.applyPercent = applyPercent;

function applyPercent(quantity, percent) {
    return quantity * (1 + percent);
}
