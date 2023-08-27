// #include <stdio.h>

// float calculate_average(float x, float y, float z) {
//    float average = (x + y + z) / 3.0;
//    return average;
// }

// int main() {
//    float x, y, z, average;
//    printf("Enter three numbers: ");
//    scanf("%f %f %f", &x, &y, &z);
//    average = calculate_average(x, y, z);
//    printf("The average is %.2f", average);
//    return 0;
// }


// 


#include <stdio.h>
#include <ctype.h>

int main() {
   char input;
   printf("Enter an alphabet character: ");
   scanf("%c", &input);
   
   input = tolower(input);
   
   if (input == 'a' || input == 'e' || input == 'i' || input == 'o' || input == 'u') {
      printf("vowel\n");
   } else {
      printf("consonant\n");
   }
   
   return 0;
}
