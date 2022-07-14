/**
 * @class Rook
 */

import white from '../../media/rook.png';
import black from '../../media/rookb.png';

import Warrior from '../Warrior';

class Rook extends Warrior {
    constructor(props) {
        super({...props, white, black});
    }

    getCoords(board) {
        let coveredCoords = [];
        const {col, row} = this.sq.coord;

        for(let i = row + 1; i <= board.rows.length; i++) {
            coveredCoords.push([{col: col - 1, row: i}, 'for']);
        }

        for(let i = row - 1; i > 0; i--) {
            coveredCoords.push([{col: col - 1, row: i}, 'back']);
        }

        for(let j = col; j < board.cols.length; j++) {
            coveredCoords.push([{col: j, row}, 'rt']);
        }

        for(let j = col - 2; j >= 0; j--) {
            coveredCoords.push([{col: j, row}, 'lt']);
        }
        return coveredCoords;
    }

    updateCoveredSqs(board) {
        let coveredCoords = this.getCoords(board);

        super.updateCoveredSqs(coveredCoords, board);
        return this.coveredSqs;
    }
}

export default Rook;