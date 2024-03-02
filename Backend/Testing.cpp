#include <iostream>
#include "DrawStocks.h"

using namespace std;

int main() {
    StockLine stock1;

    for (int i = 0; i < 20; ++i) {
        stock1.setSlope();
        stock1.setdeltaY();
        cout << stock1.getSlope() << endl;
        cout << stock1.getdeltaY() << endl << endl;
    }

    return 0;
}