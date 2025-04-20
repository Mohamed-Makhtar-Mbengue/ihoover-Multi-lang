#include <iostream>
#include <string>

using namespace std;

class Aspirateur {
private:
    int x_max;
    int y_max;
    int x;
    int y;
    char orientation;

public:
    Aspirateur(int xm, int ym, int x_pos, int y_pos, char orient) 
        : x_max(xm), y_max(ym), x(x_pos), y(y_pos), orientation(orient) {}

    void executerCommandes(const string& commandes) {
        for (char cmd : commandes) {
            switch (cmd) {
                case 'D': tournerDroite(); break;
                case 'G': tournerGauche(); break;
                case 'A': avancer(); break;
                default: throw invalid_argument("Commande invalide");
            }
        }
    }

    void tournerDroite() {
        switch (orientation) {
            case 'N': orientation = 'E'; break;
            case 'E': orientation = 'S'; break;
            case 'S': orientation = 'W'; break;
            case 'W': orientation = 'N'; break;
        }
    }

    void tournerGauche() {
        switch (orientation) {
            case 'N': orientation = 'W'; break;
            case 'W': orientation = 'S'; break;
            case 'S': orientation = 'E'; break;
            case 'E': orientation = 'N'; break;
        }
    }

    void avancer() {
        int new_x = x, new_y = y;
        switch (orientation) {
            case 'N': new_y++; break;
            case 'E': new_x++; break;
            case 'S': new_y--; break;
            case 'W': new_x--; break;
        }

        if (new_x >= 0 && new_x <= x_max && new_y >= 0 && new_y <= y_max) {
            x = new_x;
            y = new_y;
        }
    }

    void afficherPosition() const {
        cout << "Position finale: (" << x << ", " << y << ", " << orientation << ")" << endl;
    }
};

int main() {
    Aspirateur asp(10, 10, 5, 5, 'N');
    asp.executerCommandes("DADADADAA");
    asp.afficherPosition(); // Position finale: (5, 6, N)
    return 0;
}