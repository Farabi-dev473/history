const mergeSort = (array) => {
    if(array.length === 1) {
        return array
    }

    let leftHalf = mergeSort(array.slice(0, array.length / 2))
    let rightHalf = mergeSort(array.slice(array.length/2, array.length))

    console.log(leftHalf, rightHalf)
    // merge leftHalf & right Half
    let i = 0
    let j = 0
    let answer = []
    while(i < leftHalf.length && j < rightHalf.length) {
        if(leftHalf[i] < rightHalf[j]) {
            answer.push(leftHalf[i])
            i++
        }else{
            answer.push(rightHalf[j])
            j++
        }
    }

    if(i < leftHalf.length) {
        answer.push(...leftHalf.slice(i, leftHalf.length))
    }

    if(j < rightHalf.length) {
        answer.push(...rightHalf.slice(j, rightHalf.length))
    }

    return answer
}

console.log(mergeSort([5, 4, 3,2, 1]))