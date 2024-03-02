#include "DrawStocks.h"
#include <random>
#include <cmath>

using namespace std;

random_device rd;
mt19937 gen(rd()); // seed the generator
uniform_int_distribution<> distr(0, 14);

void StockLine::drawLine(double slope, double tail_y_point) {

}

double StockLine::getSlope() {
    int randInt = rand();
    
    slope = sin(distr(gen));

    return slope;
}