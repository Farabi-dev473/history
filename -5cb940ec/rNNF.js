const memoizeMap = {}
let count = 0

function uniquePaths(m, n) {
    if(m === 1 || n === 1) return 1

    if(memoizeMap[`${m} - ${n}`]) return memoizeMap[`${m} - ${n}`]

    count += 2

    memoizeMap[`${m} - ${n}`] = uniquePaths(m - 1, n) + uniquePaths(m, n - 1)
    return memoizeMap[`${m} - ${n}`]
};

uniquePaths(3, 6)

console.log(count)