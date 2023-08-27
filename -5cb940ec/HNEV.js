const getTotalPaths = (board, row = 0, col = 0, path = "") => {

    if(!board[row][col]) return []

    if(row === board.length && col === board[0].length) {
        return [path]
    }

    let result = []

    if(row < board.length) {
        result.push(...getTotalPaths(board, row + 1, col, path + "V"))
    }

    if(col < board[0].length) {
        result.push(...getTotalPaths(board, row, col + 1, path + "H"))
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