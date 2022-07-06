/**
 * @class King
 */

import white from '../../media/king.png';
import black from '../../media/kingb.png';

import Warrior from '../Warrior';

class King extends Warrior {
    constructor(props) {
        super({...props, white, black});
        this.dirs = {
            [Symbol.for(`(0, -1)`)]: 'for',
            [Symbol.for(`(0, 1)`)]: 'back',
            [Symbol.for(`(-1, 0)`)]: 'rt',
            [Symbol.for(`(1, 0)`)]: 'lt',
            [Symbol.for(`(-1, -1)`)]: 'forRt',
            [Symbol.for(`(-1, 1)`)]: 'backRt',
            [Symbol.for(`(1, -1)`)]: 'forLt',
            [Symbol.for(`(1, 1)`)]: 'backLt',
        }
    }

    updateCoveredSqs(board) {
        let coveredCoords = [];
        const {col, row} = this.sq.coord;

        for(let i = row - 1; i <= row + 1 && i <= board.rows.length; i++) {
            if(i <= 0) continue;
            for(let j = col - 2; j <= col && j < board.cols.length; j++) {
                if(j < 0 || (j === col - 1 && i === row)) continue;
                const dir = this.dirs[Symbol.for(`(${col - 1 - j}, ${row - i})`)];
                coveredCoords.push([{col: j, row: i}, dir]);
            }
        }

        if (this.firstMove) {
            coveredCoords.push([{col: col - 3, row}, 'lt']);
            coveredCoords.push([{col: col + 1, row}, 'rt']);
        }
        

        super.updateCoveredSqs(coveredCoords, board);
        return this.coveredSqs
    }
}

export default King;