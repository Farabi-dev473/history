const decreasingPercentage = (current, previous) => {
    return (((previous - current) / previous) * 100).toFixed(2);
}

module.exports = {
    decreasingPercentage
}