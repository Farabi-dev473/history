const memoizeMap = {}
let count = 0

function uniquePaths(m: number, n: number): number {
    if(m === 1 || n === 1) return 1

    if(memoizeMap[`${m} - ${n}`]) return memoizeMap[`${m} - ${n}`]

    ++count

    memoizeMap[`${m} - ${n}`] = uniquePaths(m - 1, n) + uniquePaths(m, n - 1)
    return memoizeMap[`${m} - ${n}`]
};

uniquePaths(3, 3)

console.log(count)