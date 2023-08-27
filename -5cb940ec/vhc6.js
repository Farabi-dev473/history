const getTotalPaths = (row, col, path = "") => {
    if(row === 1 || col === 1) {
        console.log(path)
        return 1
    }

    const right = getTotalPaths(row -1, col, path + "R")
    const down = getTotalPaths(row, col - 1, path + "D")

    return left + right
}

console.log(getTotalPaths(3, 3))