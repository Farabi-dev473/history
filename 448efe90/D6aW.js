// Quick Sort Algorithm - In Place

const partition = (array, low, high) => {
   let pivot = array[0]
   let i = 0
   let j = high

   while(array[i] <= pivot) ++i
   while(array[j] > pivot) --j

   let temp = array[i]
   array[i] = array[j]
   array[j] = temp

   if(i < j) {
       partition(array, low, high)
       return    
   }
   return
}

const quickSort = (array, low, high) => {

    if(low < high) {
        let j = partition(array,low, high)
        quickSort(array, low, j - 1)
        quickSort(array, j + 1, high)
    }

    return
}