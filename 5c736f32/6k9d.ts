const extractStringInsideCurlyBraces = (str: string) =>  {
    let firstIndex = str.indexOf('{') + 1
    let lastIndex = str.indexOf('}')
    let extractedString = ''
    let results = []
    let count = 0
    while(firstIndex < lastIndex && lastIndex <= str.length) {
         extractedString += str[firstIndex]
         ++firstIndex

         if(firstIndex === lastIndex) {
            results.push(extractedString)
            extractedString = ''
            str = str.slice(lastIndex + 1)
            firstIndex = str.indexOf('{') + 1
            lastIndex  = str.indexOf('}')
            ++count
         }

         if(count === 2) break
    }
     
    return results
}

console.log(extractStringInsideCurlyBraces("{Farabi} - {Love}"))

export default extractStringInsideCurlyBraces