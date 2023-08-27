#include <stdio.h>

int sendMoney(int userMoney, int sendingAmount) {
    return userMoney - sendingAmount
}

int main() {

 int rafiu = 100;
 rafiu = sendMoney(rafiu, 50);
 printf("Rafiu = %d\n", rafiu);
 return 0;   
}