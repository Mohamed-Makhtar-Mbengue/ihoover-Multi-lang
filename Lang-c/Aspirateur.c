#include <stdio.h>
#include <stdbool.h>

typedef struct {
    int x;
    int y;
    char orientation;
} Position;

typedef struct {
    int x_max;
    int y_max;
    Position pos;
} Aspirateur;

void tourner_droite(Aspirateur *asp) {
    switch (asp->pos.orientation) {
        case 'N': asp->pos.orientation = 'E'; break;
        case 'E': asp->pos.orientation = 'S'; break;
        case 'S': asp->pos.orientation = 'W'; break;
        case 'W': asp->pos.orientation = 'N'; break;
    }
}

void tourner_gauche(Aspirateur *asp) {
    switch (asp->pos.orientation) {
        case 'N': asp->pos.orientation = 'W'; break;
        case 'W': asp->pos.orientation = 'S'; break;
        case 'S': asp->pos.orientation = 'E'; break;
        case 'E': asp->pos.orientation = 'N'; break;
    }
}

bool avancer(Aspirateur *asp) {
    int new_x = asp->pos.x;
    int new_y = asp->pos.y;
    
    switch (asp->pos.orientation) {
        case 'N': new_y++; break;
        case 'E': new_x++; break;
        case 'S': new_y--; break;
        case 'W': new_x--; break;
    }
    
    if (new_x >= 0 && new_x <= asp->x_max && new_y >= 0 && new_y <= asp->y_max) {
        asp->pos.x = new_x;
        asp->pos.y = new_y;
        return true;
    }
    return false;
}

void executer_commandes(Aspirateur *asp, const char *commandes) {
    for (int i = 0; commandes[i] != '\0'; i++) {
        switch (commandes[i]) {
            case 'D': tourner_droite(asp); break;
            case 'G': tourner_gauche(asp); break;
            case 'A': avancer(asp); break;
        }
    }
}

int main() {
    Aspirateur asp = {10, 10, {5, 5, 'N'}};
    executer_commandes(&asp, "DADADADAA");
    printf("Position finale: (%d, %d, %c)\n", asp.pos.x, asp.pos.y, asp.pos.orientation);
    return 0;
}