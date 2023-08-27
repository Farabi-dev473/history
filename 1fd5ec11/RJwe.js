const getSolAmount = (lamports = 0) => {
    const lamportsPerSol = 1000000000
    return parseInt(lamports) / lamportsPerSol
}

export default getSolAmount