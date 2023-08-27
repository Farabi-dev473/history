#include <stdio.h>

int main() {
   int nums[5] = {2, 4, 6, 8, 10};
   nums[1] = 500;

   // Array Traversing / Iterating
   for(int i = 4; i >= 0; i--){
     printf("%d\n", nums[i]);
   }

   return 0;
}

