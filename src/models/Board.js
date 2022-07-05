/**
 * @class Board
 */

import Square from './Square';
import {Bishop, King, Queen, Pawn, Rook, Knight} from './Warriors'

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

    alignArmy(map, armyColor) {
        const army = new Map();

        function setElem(sqs, WarClass, rank, name) {
            sqs.forEach((sq, idx) => {
                let finalName = name || `${rank}${++idx}`;
                army.set(finalName, new WarClass({name, finalName, rank, army: armyColor, sq}))
            })
        }
        
        for(let [rank, sqs] of map) {
            switch(rank){
                case 'K':
                    setElem(sqs, King, 'K', 'K');
                    break;
                case 'Q':
                    setElem(sqs, Queen, 'Q', 'Q');
                    break;
                case 'B':
                    setElem(sqs, Bishop, 'B');
                    break;
                case 'R':
                    setElem(sqs, Rook, 'R');
                    break;
                case 'N':
                    setElem(sqs, Knight, 'N');
                    break;
                case 'P':
                    setElem(sqs, Pawn, 'P');
                    break;
            }
        }

        return army;
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