/**
 * @class Knight
 */

import white from '../../media/knight.png';
import black from '../../media/knightb.png';

import Warrior from '../Warrior';

class Knight extends Warrior {
    constructor(props) {
        super({...props, white, black});
        this.king = props.king;
    }

    gotUpdate(sq) {
        if(this.name !== 'Ne') {
            return super.gotUpdate(sq);
        }

        super.gotUpdate(sq);

        let attackingKnight;

        main: for(let [k, v] of this.coveredSqs) {
            for (let sq of v) {
                if(sq.occupying && sq.occupying.army !== this.army && sq.occupying.rank === 'N') {
                    attackingKnight = sq.occupying;
                    break main;
                }
            }
        }

        if(attackingKnight) {
            this.king.setChecking(true, attackingKnight, attackingKnight.sq);
        }
    }

    updateCoveredSqs(board) {
        let coveredCoords = [];
        const {col, row} = this.sq.coord;

        const iter = this.coveredSqs.keys();
        for(let i = row - 2; i <= row + 2 && i <= board.rows.length; i++) {
            if( i <= 0 || i === row) continue;

            for(let j = col - 3; j <= col + 1 && j < board.cols.length; j++) {
                if(j < 0 || j === col - 1 || Math.abs(row - i) === Math.abs((col - 1) - j)) continue;

                coveredCoords.push([{col: j, row: i}, iter.next().value])
            }
            
        }

        super.updateCoveredSqs(coveredCoords, board);
        return this.coveredSqs;
    }
    
}

export default Knight;