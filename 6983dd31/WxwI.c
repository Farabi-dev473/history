#include <stdio.h>

int main() {

 int a = 5;
 int* b = &a;



 // compare memory address of a & b & print true or false
 if(&a == b) {
    printf("true");
 }else{
    printf("false");
 }

 return 0;   
}