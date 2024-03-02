#include <iostream>

class StockLine {
public:

    void drawLine(double slope, double tail_y_point);
    double getSlope();

private:

    double slope;
    double tail_y_point;

};