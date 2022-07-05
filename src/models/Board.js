/**
 * @class Board
 */

import Square from './Square';

class Board {

    constructor() {
        this.boardMap =  new Map();
        this.rows = [1, 2, 3, 4, 5, 6, 7, 8];
        this.cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    }

    generateSquares() {
        const iter = this[Symbol.iterator]();

        for(let [name, [col, row], color] of iter) {
            this.boardMap.set(name, new Square(name, this.cols.indexOf(col) + 1, row, color));
        }

        return this.boardMap;
    }
    
    *[Symbol.iterator]() {
        let color = true;
        for(let row of this.rows){
            for(let col of this.cols) {
                yield [`${col}${row}`, [col, row], color]
                color = !color
            }
            color = !color
        }
    }
}

export default new Board();