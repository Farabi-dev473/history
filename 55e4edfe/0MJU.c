#include <stdio.h>

int main() {
   int nums[5] = {2, 4, 6, 8, 10};
   
   int i = 0;
   ++i; // 1
   printf("%d\n", i);
   // i++ - post increment |  ++i pre increment
   // i-- post decrement   |  --i pre decrement
   

   for(int i = 0; i < 5; i++){
     printf("%d\n", nums[i]);
   }
   return 0;
}

