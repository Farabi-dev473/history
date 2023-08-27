const decreasingPercentage = (current, previous) => {
    return (((previous - current) / previous) * 100).toFixed(2);
}

module.exports = {
    decreasingPercentage
}

console.log(decreasingPercentage(0.114, 0.0828))