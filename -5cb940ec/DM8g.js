const getTotalPaths = (board, row = 0, col = 0, path = "") => {

    if(!board[row][col]) return []

    if(row === board.length - 1 && col === board[0].length - 1) {
        return [path]
    }

    let result = []

    if(row < board.length - 1) {
        result.push(...getTotalPaths(board, row + 1, col, path + "D"))
    }

    if(col < board[0].length - 1) {
        result.push(...getTotalPaths(board, row, col + 1, path + "R"))
    }

    if(row > 0) {
        result.push(...getTotalPaths(board, row - 1, col, path + "U"))
    }

    if(col > board[0].length - 1) {
        result.push(...getTotalPaths(board, row, col - 1, path + "L"))
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