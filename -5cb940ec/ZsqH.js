const memoizeMap = {}

function uniquePathsWithObstacles(obstacleGrid, row = 0, col = 0) {
    if(obstacleGrid[row][col] === 1) return 0

    if(row === obstacleGrid.length - 1 || col === obstacleGrid[0].length - 1) return 1

    if(memoizeMap[`${row} - ${col}`]) return memoizeMap[`${row} - ${col}`]
    

memoizeMap[`${row} - ${col}`] = uniquePathsWithObstacles(obstacleGrid, row + 1, col) + uniquePathsWithObstacles(obstacleGrid, row, col + 1)
return memoizeMap[`${row} - ${col}`]
};

console.log(uniquePathsWithObstacles([
    [0, 1],
    [0, 0]
]))