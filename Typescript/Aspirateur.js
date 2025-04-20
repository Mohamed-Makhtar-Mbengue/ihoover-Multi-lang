var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var VacuumCleaner = /** @class */ (function () {
    function VacuumCleaner(grid, initialPosition) {
        this.validatePosition(grid, initialPosition);
        this.grid = grid;
        this.position = __assign({}, initialPosition);
    }
    VacuumCleaner.prototype.validatePosition = function (grid, position) {
        if (position.x < 0 || position.x > grid.xMax ||
            position.y < 0 || position.y > grid.yMax) {
            throw new Error('Initial position is outside the grid boundaries');
        }
    };
    VacuumCleaner.prototype.executeCommands = function (commands) {
        var commandList = commands.split('');
        for (var _i = 0, commandList_1 = commandList; _i < commandList_1.length; _i++) {
            var command = commandList_1[_i];
            this.executeCommand(command);
        }
        return this.getCurrentPosition();
    };
    VacuumCleaner.prototype.executeCommand = function (command) {
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
                throw new Error("Invalid command: ".concat(command));
        }
    };
    VacuumCleaner.prototype.turnRight = function () {
        var rotationMap = {
            'N': 'E',
            'E': 'S',
            'S': 'W',
            'W': 'N'
        };
        this.position.orientation = rotationMap[this.position.orientation];
    };
    VacuumCleaner.prototype.turnLeft = function () {
        var rotationMap = {
            'N': 'W',
            'W': 'S',
            'S': 'E',
            'E': 'N'
        };
        this.position.orientation = rotationMap[this.position.orientation];
    };
    VacuumCleaner.prototype.moveForward = function () {
        var movementMap = {
            'N': { x: 0, y: 1 },
            'E': { x: 1, y: 0 },
            'S': { x: 0, y: -1 },
            'W': { x: -1, y: 0 }
        };
        var movement = movementMap[this.position.orientation];
        var newX = this.position.x + movement.x;
        var newY = this.position.y + movement.y;
        // Check boundaries
        if (newX >= 0 && newX <= this.grid.xMax && newY >= 0 && newY <= this.grid.yMax) {
            this.position.x = newX;
            this.position.y = newY;
        }
        // If the movement would take the vacuum out of the grid, it stays in place
    };
    VacuumCleaner.prototype.getCurrentPosition = function () {
        return __assign({}, this.position);
    };
    return VacuumCleaner;
}());
// Test case from the example
function runTest() {
    var grid = { xMax: 10, yMax: 10 };
    var initialPosition = { x: 5, y: 5, orientation: 'N' };
    var commands = 'DADADADAA';
    var vacuum = new VacuumCleaner(grid, initialPosition);
    var finalPosition = vacuum.executeCommands(commands);
    console.log('Final position:', finalPosition);
    // Expected: { x: 5, y: 6, orientation: 'N' }
}
runTest();
