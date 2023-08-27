const x = 10
const y = 18

const smallNum = Math.min(x, y)
const bigNum = Math.max(x, y)
const data = [2, 3]
for(let i = smallNum + 1; i < bigNum; i++) {

    if(i % 5 === 2 || i % 5 === 3) {
        console.log(i)
    }
}

