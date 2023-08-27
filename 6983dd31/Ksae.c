#include <stdio.h>

int main() {

 int a = 5;
 int b = 5;

 // compare memory address of a & b & print true or false
 if(&a == &b) {
    printf("true");
 }else{
    printf("false");
 }

 return 0;   
}