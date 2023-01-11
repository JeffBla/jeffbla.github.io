#include <iostream>
#include <list>
#include <string>

using namespace std;

// Define the structs Workshops and Available_Workshops.
// Implement the functions initialize and CalculateMaxWorkshops
struct Workshops {
    int start_time;
    int duration;
    int end_time;

    Workshops() = default;
    Workshops(int s, int d, int e) : start_time(s), duration(d), end_time(e) {}
};

struct Available_Workshops {
    int n;
    Workshops* ws = new Workshops[n];
};

Available_Workshops* initialize(int start_time[], int duration[], int n) {
    Available_Workshops* aWS = new Available_Workshops();
    aWS->n = n;

    for (int i = 0; i < n; i++) {
        aWS->ws[i].start_time = start_time[i];
        aWS->ws[i].duration = duration[i];
        aWS->ws[i].end_time = start_time[i] + duration[i];
    }
    return aWS;
}

int _CalculateMaxWorkshops(list<Workshops*> lst, Available_Workshops* ptr, int index) {
    if (index >= ptr->n) {
        return lst.size();
    }
    Workshops& ws = ptr->ws[index];

    bool isOverlay = false;
    for (auto w : lst) {
        if ((w->start_time < ws.start_time && w->end_time > ws.end_time) ||
            (w->start_time > ws.start_time && w->end_time > ws.end_time) ||
            (w->start_time < ws.start_time && w->end_time < ws.end_time) ||
            (w->start_time > ws.start_time && w->end_time < ws.end_time)) {
            isOverlay = true;
            break;
        }
    }
    if (isOverlay) {
        return _CalculateMaxWorkshops(lst, ptr, index + 1);
    } else {
        int num1 = _CalculateMaxWorkshops(lst, ptr, index + 1);
        lst.push_back(&ws);
        int num2 = _CalculateMaxWorkshops(lst, ptr, index + 1);
        return num2 > num1 ? num2 : num1;
    }
}

int CalculateMaxWorkshops(Available_Workshops* ptr) {
    list<Workshops*> lst;

    return _CalculateMaxWorkshops(lst, ptr, 0);

    // Workshops* ws = ptr->ws;
    // for (int i = 0; i < ptr->n; i++) {
    //     if (timeLst.empty()) {
    //         timeLst.push_front(ws[i]);
    //     } else {
    //         for(auto ite1r = timeLst.begin(); iter!=timeLst.end(); iter++){
    //             if(iter->start_time > ws[i].start_time
    //         }
    //     }
    // }
}

int main(int argc, char* argv[]) {
    int n;  // number of workshops
    cin >> n;
    // create arrays of unknown size n
    int* start_time = new int[n];
    int* duration = new int[n];

    for (int i = 0; i < n; i++) {
        cin >> start_time[i];
    }
    for (int i = 0; i < n; i++) {
        cin >> duration[i];
    }

    Available_Workshops* ptr;
    ptr = initialize(start_time, duration, n);
    cout << CalculateMaxWorkshops(ptr) << endl;
    return 0;
}
