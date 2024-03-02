#include <iostream>

class StockLine {
public:
    StockLine();

    void drawLine(double slope, double tail_y_point);
    void setSlope();
    void setdeltaY();
    double getSlope();
    double getdeltaY();

private:

    double slope;
    double deltaY;

};