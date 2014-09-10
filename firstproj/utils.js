module.exports.toHumanDollars = toHumanDollars;

function toHumanDollars(input) {
    return "$" + parseFloat(input).toFixed(2);
}
