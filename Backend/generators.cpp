#include <iostream>
#include <iomanip>
#include "getText.cpp"
// #include <emscripten.h>
using namespace std;

string grabFromList(string *list, int listSize)
{
    int num = rand() % (listSize - 1);
    // string eventnames[3] = {"Wrath of the dragon", "The fiery giany strikes back", "How the midnight sky fell"};
    return list[num];
}

// int main()
// {
//     string *list = new string[112];
//     list = getResponses();
//     string response = grabFromList(list, 112);
//     cout << "Response: " << response << endl;
//     delete[] list;
//     return 0;
// }

// sample.cpp

// extern "C"
// {
//     EMSCRIPTEN_KEEPALIVE
//     int add(int a, int b)
//     {
//         return a + b;
//     }
// }
