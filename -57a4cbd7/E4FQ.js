const decreasingPercentage = (current, previous) => {
    return (((current - previous) / previous) * 100).toFixed(2);
}

module.exports = {
    decreasingPercentage
}

console.log(decreasingPercentage(1.35, 1.29))