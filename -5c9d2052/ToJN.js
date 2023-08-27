const solveProblem = (a, b, c) => {
    let r1, r2

    if(a == 0 || b * b - 4*a*c < 0) return " Impossivel calcular"

    r1 = (-b + Math.sqrt(b*b - 4*a*c))/ (2*a)
    r2 = (-b - Math.sqrt(b*b - 4*a*c)) / (2*a)

    return {r1, r2}
}

console.log(solveProblem(10.0, 20.1, 5.1))