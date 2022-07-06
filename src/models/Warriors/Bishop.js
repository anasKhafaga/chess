/**
 * @class Bishop
 */

import white from '../../media/bishop.png';
import black from '../../media/bishopb.png';

import Warrior from '../Warrior';

class Bishop extends Warrior {
    constructor(props) {
        super({...props, white, black});
    }

    updateCoveredSqs(board) {
        let coveredCoords = [];
        const {col, row} = this.sq.coord;

        for(let i = row + 1, j = col; i <= board.rows.length && j < board.cols.length; i++, j++) {
            coveredCoords.push([{col: j, row: i}, 'forRt']);
        }

        for(let i = row - 1, j = col; i > 0 && j < board.cols.length; i--, j++){
            coveredCoords.push([{col: j, row: i}, 'backRt']);
        }

        for (let i = row + 1, j = col - 2; i <= board.rows.length && j >= 0; i++, j--) {
            coveredCoords.push([{col: j, row: i}, 'forLt']);
        }

        for (let i = row - 1, j = col - 2; i > 0 && j>= 0; i--, j--){
            coveredCoords.push([{col: j, row: i}, 'backLt']);
        }
        
        
        super.updateCoveredSqs(coveredCoords, board);
        return this.coveredSqs;
    }
    
}

export default Bishop;