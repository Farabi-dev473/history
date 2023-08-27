let rob = function(nums) {
    let previous = 0;
    let current = 0;
    let temp; 
    for (let x of nums) {
        temp = current; 
        current = Math.max(x+previous, current);
        previous = temp;
    }
    return current;
}

console.log(rob([1, 2, 3, 4]))