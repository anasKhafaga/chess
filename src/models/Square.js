/**
 * @class Square
 */

class Square {
    constructor(name, col, row, color) {
        this.name = name;
        this.color = color? 'dark' : 'light';
        this.coord = new Coord(col, row)
        this.occupying = null;
    }
}

class Coord {
    constructor(col, row) {
        this.col = col;
        this.row = row;
    }
}

export default Square;