function getEvenNumbers(a) {
  let evens = [];

  for (let i = 0; i < a.length; i++) {
    if (a[i] % 2 === 0) {
      evens.push(a[i]);
    }
  }

  return evens;
}

const sum = (arr) => arr.reduce((a, b) => a + b)

const Half = (arr) => {
  const evens = getEvenNumbers(arr)
  const halfs = evens.map(a => a / 2)
  const result = halfs.reduce((a, b) => a + b)

  return result
}

console.log(Half([1, 2, 3, 4, 5, 6]))