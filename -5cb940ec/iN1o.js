const getTotalPaths = (row, col, path = "") => {
    if(row === 1 && col === 1) {
        console.log(path)
        return 1
    }

    if(row > 1) {
        const right = getTotalPaths(row -1, col, path + "R")
    }
    
    if(col > 1) {
        const down = getTotalPaths(row, col - 1, path + "D")
    }

    return right + down
}

console.log(getTotalPaths(3, 3))