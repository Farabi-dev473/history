#include <stdio.h>

void sendMoney(int* userMoney, int sendingAmount) {
   userMoney = userMoney - sendingAmount;
}

int main() {

 int rafiu = 100;
 sendMoney(&rafiu, 50);
 printf("Rafiu = %d\n", rafiu);
 return 0;   
}