#include <iostream>

class StockLine {
public:
    StockLine();

    void drawLine(double slope, double tail_y_point);
    double createSlope();
    double getSlope();

private:

    double slope;
    double deltaY;

};