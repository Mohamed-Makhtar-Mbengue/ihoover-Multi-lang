Simulation d'un aspirateur autonome implémentée en Python, Java, C et C++

## 📋 Description
Ce projet implémente la simulation d'un aspirateur intelligent capable de:
- Se déplacer dans une grille rectangulaire
- Exécuter des séquences de commandes (D: Droite, G: Gauche, A: Avancer)
- Communiquer sa position finale (x, y, orientation)
- 
## 🚀 Comment exécuter

### Python
```bash
cd python
python aspirateur.py

cd java
mvn compile exec:java -Dexec.mainClass="Aspirateur"

cd c
make && ./aspirateurcd cpp
mkdir build && cd build
cmake .. && make
./aspirateur
