#include <stdio.h>

// n = 1
void printNumbers(int n) {
    if(n > 5) {
        return 
    }

    printNumbers(n + 1);
    printf("%d", n)
}

int main() {
    printNumbers(1);
    printf("\n");
    
    return 0;
}

//  main
// printNumbers

