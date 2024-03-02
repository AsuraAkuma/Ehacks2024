#include <iostream>
#include "DrawStocks.h"

using namespace std;

int main() {
    StockLine stock1;

    for (int i = 0; i < 10; ++i) {
        stock1.createSlope();
        cout << stock1.getSlope();
    }



    return 0;
}