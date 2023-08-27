const getTotalPaths = (board, row = board.length - 1, col = board.length - 1, path = "") => {

    if(!board[row][col]) return []

    if(row === 1 && col === 1) {
        return [path]
    }

    let result = []

    if(row > 1) {
        result.push(...getTotalPaths(row -1, col, path + "V"))
    }

    if(col > 1) {
        result.push(...getTotalPaths(row, col - 1, path + "H"))
    }

    // if(row > 1 && col > 1) {
    //     result.push(...getTotalPaths(row - 1, col - 1, path + "D"))
    // }

    return result
}

console.log(getTotalPaths(
    [
       [true, true, true], 
       [true, false, true], 
       [true, true, true], 
    ]
))