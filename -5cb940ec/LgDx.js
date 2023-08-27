const getTotalPaths = (row, col, path = "") => {
    if(row === 1 && col === 1) {
        return [path]
    }

    let result = []

    if(row > 1) {
        result.push(...getTotalPaths(row -1, col, path + "R"))
    }

    if(col > 1) {
        result.push(...getTotalPaths(row, col - 1, path + "D"))
    }

    if(row > 1 && col > 1) {
        result.push(...getTotalPaths(row, col - 1, path + "Diagonal"))
    }

    return result
}

console.log(getTotalPaths(3, 3))