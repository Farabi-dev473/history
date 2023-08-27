const solveProblem = (a, b, c) => {
    let r1, r2

    if(a == 0 || b * b - 4*a*c < 0) return " Impossivel calcular"

    r1 = ( (-b + Math.sqrt(b*b - 4*a*c))/ (2*a) ).toFixed(5)
    r2 = ( (-b - Math.sqrt(b*b - 4*a*c)) / (2*a) ).toFixed(5)

    return {r1, r2}
}

console.log(solveProblem( 0.0, 20.0, 5.0))