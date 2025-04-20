class Aspirateur:
    def __init__(self, x_max, y_max, x, y, orientation):
        self.x_max = x_max
        self.y_max = y_max
        self.x = x
        self.y = y
        self.orientation = orientation
    
    def executer_commandes(self, commandes):
        for cmd in commandes:
            if cmd == 'D':
                self.tourner_droite()
            elif cmd == 'G':
                self.tourner_gauche()
            elif cmd == 'A':
                self.avancer()
    
    def tourner_droite(self):
        rotations = {'N': 'E', 'E': 'S', 'S': 'W', 'W': 'N'}
        self.orientation = rotations[self.orientation]
    
    def tourner_gauche(self):
        rotations = {'N': 'W', 'W': 'S', 'S': 'E', 'E': 'N'}
        self.orientation = rotations[self.orientation]
    
    def avancer(self):
        deplacements = {
            'N': (0, 1),
            'E': (1, 0),
            'S': (0, -1),
            'W': (-1, 0)
        }
        dx, dy = deplacements[self.orientation]
        new_x, new_y = self.x + dx, self.y + dy
        
        if 0 <= new_x <= self.x_max and 0 <= new_y <= self.y_max:
            self.x, self.y = new_x, new_y
    
    def position_actuelle(self):
        return (self.x, self.y, self.orientation)

# Test
aspirateur = Aspirateur(10, 10, 5, 5, 'N')
aspirateur.executer_commandes('DADADADAA')
print(aspirateur.position_actuelle())  # (5, 6, 'N')