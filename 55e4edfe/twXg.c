#include <stdio.h>

int main() {
   int nums[50] = {2, 4, 6, 8, 10};
   nums[5] = 1;
   nums[6] = 2;

   // Array Traversing / Iterating
   for(int i = 6; i >= 0; i--){
     printf("%d\n", nums[i]);
   }

   return 0;
}

