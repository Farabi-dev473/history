const reverseArrayInPlace = (array = []) => {
    let length = array.length
    let n = length / 2
    let j = length - 1
    let temp = 0

    for(let i = 0; i < n; ++i) {
       temp = array[i]
       array[i] = array[j]
       array[j] = temp
       --j
    }

    return array
}

console.log(reverseArrayInPlace([1, 2, 3, 4, 5]))