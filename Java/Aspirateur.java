public class Aspirateur {
    private int x;
    private int y;
    private char orientation;
    private final int xMax;
    private final int yMax;

    public Aspirateur(int xMax, int yMax, int x, int y, char orientation) {
        if (x < 0 || x > xMax || y < 0 || y > yMax) {
            throw new IllegalArgumentException("Position initiale invalide");
        }
        if (!"NESW".contains(String.valueOf(orientation))) {
            throw new IllegalArgumentException("Orientation initiale invalide");
        }
        
        this.xMax = xMax;
        this.yMax = yMax;
        this.x = x;
        this.y = y;
        this.orientation = orientation;
    }

    public void executerCommandes(String commandes) {
        for (char cmd : commandes.toCharArray()) {
            switch (cmd) {
                case 'D': tournerDroite(); break;
                case 'G': tournerGauche(); break;
                case 'A': avancer(); break;
                default: 
                    throw new IllegalArgumentException("Commande invalide: " + cmd);
            }
        }
    }

    private void tournerDroite() {
        switch (orientation) {
            case 'N': orientation = 'E'; break;
            case 'E': orientation = 'S'; break;
            case 'S': orientation = 'W'; break;
            case 'W': orientation = 'N'; break;
        }
    }

    private void tournerGauche() {
        switch (orientation) {
            case 'N': orientation = 'W'; break;
            case 'W': orientation = 'S'; break;
            case 'S': orientation = 'E'; break;
            case 'E': orientation = 'N'; break;
        }
    }

    private void avancer() {
        int newX = x, newY = y;
        switch (orientation) {
            case 'N': newY++; break;
            case 'E': newX++; break;
            case 'S': newY--; break;
            case 'W': newX--; break;
        }

        if (newX >= 0 && newX <= xMax && newY >= 0 && newY <= yMax) {
            x = newX;
            y = newY;
        }
    }

    public String positionActuelle() {
        return String.format("(%d, %d, %c)", x, y, orientation);
    }

    public static void main(String[] args) {
        try {
            Aspirateur aspirateur = new Aspirateur(10, 10, 5, 5, 'N');
            aspirateur.executerCommandes("DADADADAA");
            System.out.println(aspirateur.positionActuelle()); // (5, 6, N)
        } catch (Exception e) {
            System.err.println("Erreur: " + e.getMessage());
        }
    }
}