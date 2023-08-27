const getTotalPaths = (row, col, path = "") => {
    if(row === 1 && col === 1) {
        console.log(path)
        return 1
    }

    let left = 0 
    let right = 0

    if(row > 1) {
        left = getTotalPaths(row -1, col, path + "R")
    }
    
    if(col > 1) {
        right = getTotalPaths(row, col - 1, path + "D")
    }

    return left + right
}

console.log(getTotalPaths(3, 3))