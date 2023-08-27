const getTotalPaths = (row, col) => {
    if(row === 1 || col === 1) return 1

    const left = getTotalPaths(row -1, col)
    const right = getTotalPaths(row, col - 1)

    return left + right
}

console.log(getTotalPaths(4, 4))