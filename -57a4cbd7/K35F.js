const decreasingPercentage = (current, previous) => {
    return (((current - previous) / previous) * 100).toFixed(2);
}

module.exports = {
    decreasingPercentage
}

console.log(decreasingPercentage(0.114, 0.0828))