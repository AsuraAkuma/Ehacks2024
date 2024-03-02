#include "DrawStocks.h"
#include <random>
#include <cmath>

using namespace std;

random_device rd;
mt19937 gen(rd()); // seed the generator
uniform_int_distribution<> distr(0, 14);

const int defaultLength = 4;

StockLine::StockLine() {
    setSlope();
    setdeltaY();
}

void StockLine::drawLine(double slope, double tail_y_point) {

}

void StockLine::setSlope() {
    int randInt1 = rand();
    int randInt2 = rand();
    
    slope = sin(distr(gen));
}

void StockLine::setdeltaY() {
    deltaY = slope * defaultLength;
}

double StockLine::getSlope() {
    return slope;
}

double StockLine::getdeltaY() {
    return deltaY;
}