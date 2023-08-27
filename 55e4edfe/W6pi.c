#include <stdio.h>

// void printArray(int *nums) {
//   for(int i = 0; i < sizeof(nums) / sizeof(nums[0]); i++) {
//     printf("%d ", nums[i]);
//   };
// }

// int findMissingNumber(int *nums) {
//   int realNums[sizeof(nums)/sizeof(nums[0])];

//   for(int i = 0; i <= sizeof(nums) / sizeof(nums[0]) + 1; i++) {
//     realNums[i] = nums[i];
//   }
//   printArray(&nums);
//   return 0;
// };

int main() {
   int nums[] = {1, 2, 3, 4, 6, 7, 8}; // Ans: 5
  //  findMissingNumber(&nums);
  int size = sizeof(nums) / sizeof(nums[0]);
  printf("%d\n", size);
   return 0;
}

