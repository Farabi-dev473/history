const getSolAmount = (lamports = 0) => {
    const lamportsPerSol = 1000000000
    return (parseInt(lamports) / lamportsPerSol).toFixed(2)
}

export default getSolAmount