const decreasingPercentage = (current, previous) => {
    let res = (((current - previous) / previous) * 100).toFixed(2);
    return res > 0 ? '+' + res : '-' + res
}

module.exports = {
    decreasingPercentage
}

console.log(decreasingPercentage(0.114, 0.0828))