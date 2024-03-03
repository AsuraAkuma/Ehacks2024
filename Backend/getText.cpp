
#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
using namespace std;
string *getResponses()
{
    ifstream inputFile;
    string myString;

    // Open the file.
    inputFile.open("responses.txt");

    // Read the numbers from the file and
    // display them.
    string *responses = new string[112];
    int index = 0;
    while (getline(inputFile, myString))
    {
        responses[index] = myString;
        cout << myString << endl;
    }

    // Close the file.
    inputFile.close();
    delete[] responses;
    return responses;
}
string *getCompanyNames()
{
    ifstream inputFile;
    string myString;

    // Open the file.
    inputFile.open("companyNames.txt");

    // Read the numbers from the file and
    // display them.
    string *responses = new string[91];
    int index = 0;
    while (getline(inputFile, myString))
    {
        responses[index] = myString;
        cout << myString << endl;
    }

    // Close the file.
    inputFile.close();
    delete[] responses;
    return responses;
}
