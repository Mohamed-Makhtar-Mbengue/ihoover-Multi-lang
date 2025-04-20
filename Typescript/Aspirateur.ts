type Orientation = 'N' | 'E' | 'W' | 'S';
type Command = 'D' | 'G' | 'A';

interface Position {
    x: number;
    y: number;
    orientation: Orientation;
}

interface Grid {
    xMax: number;
    yMax: number;
}

class MyVacuumCleaner {
    private position: Position;
    private grid: Grid;

    constructor(grid: Grid, initialPosition: Position) {
        this.validatePosition(grid, initialPosition);
        this.grid = grid;
        this.position = { ...initialPosition };
    }

    private validatePosition(grid: Grid, position: Position): void {
        if (position.x < 0 || position.x > grid.xMax || 
            position.y < 0 || position.y > grid.yMax) {
            throw new Error('Initial position is outside the grid boundaries');
        }
    }

    public executeCommands(commands: string): Position {
        const commandList = commands.split('') as Command[];
        
        for (const command of commandList) {
            this.executeCommand(command);
        }

        return this.getCurrentPosition();
    }

    private executeCommand(command: Command): void {
        switch (command) {
            case 'D':
                this.turnRight();
                break;
            case 'G':
                this.turnLeft();
                break;
            case 'A':
                this.moveForward();
                break;
            default:
                throw new Error(`Invalid command: ${command}`);
        }
    }

    private turnRight(): void {
        const rotationMap: Record<Orientation, Orientation> = {
            'N': 'E',
            'E': 'S',
            'S': 'W',
            'W': 'N'
        };
        this.position.orientation = rotationMap[this.position.orientation];
    }

    private turnLeft(): void {
        const rotationMap: Record<Orientation, Orientation> = {
            'N': 'W',
            'W': 'S',
            'S': 'E',
            'E': 'N'
        };
        this.position.orientation = rotationMap[this.position.orientation];
    }

    private moveForward(): void {
        const movementMap: Record<Orientation, {x: number, y: number}> = {
            'N': { x: 0, y: 1 },
            'E': { x: 1, y: 0 },
            'S': { x: 0, y: -1 },
            'W': { x: -1, y: 0 }
        };

        const movement = movementMap[this.position.orientation];
        const newX = this.position.x + movement.x;
        const newY = this.position.y + movement.y;

        // Check boundaries
        if (newX >= 0 && newX <= this.grid.xMax && newY >= 0 && newY <= this.grid.yMax) {
            this.position.x = newX;
            this.position.y = newY;
        }
        // If the movement would take the vacuum out of the grid, it stays in place
    }

    public getCurrentPosition(): Position {
        return { ...this.position };
    }
}

// Test case from the example
function runVacuumTest(): void {
    const grid: Grid = { xMax: 10, yMax: 10 };
    const initialPosition: Position = { x: 5, y: 5, orientation: 'N' };
    const commands = 'DADADADAA';

    const vacuum = new VacuumCleaner(grid, initialPosition);
    const finalPosition = vacuum.executeCommands(commands);

    console.log('Final position:', finalPosition);
    // Expected: { x: 5, y: 6, orientation: 'N' }
}

// Execute the test
runTest();