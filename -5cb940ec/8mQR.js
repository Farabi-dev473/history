const getTotalPaths = (row, col, path = "") => {
    if(row === 1 && col === 1) {
        return path
    }

    let right = []
    let down = []

    if(row > 1) {
        right.push(getTotalPaths(row -1, col, path + "R"))
    }
    
    if(col > 1) {
        down.push(getTotalPaths(row, col - 1, path + "D"))
    }

    return [...right, ...down]

}

console.log(getTotalPaths(3, 3))