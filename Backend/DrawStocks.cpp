#include "DrawStocks.h"
#include <random>
#include <cmath>

using namespace std;

double low = 0;
double high = 7;
normal_distribution<double> unif(low, high);
default_random_engine re;

const int defaultLength = 4;

StockLine::StockLine() {
    setSlope();
    setdeltaY();
}

void StockLine::drawLine(double slope, double deltaY) {

}

void StockLine::setSlope() {
    slope = sin(unif(re));
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