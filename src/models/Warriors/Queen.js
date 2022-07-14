/**
 * @class Queen
 */

import white from '../../media/queen.png';
import black from '../../media/queenb.png';
import { Bishop, Rook } from './';

import Warrior from '../Warrior';

class Queen extends Warrior {
    constructor(props) {
        super({...props, white, black});
        this.bishopModel = new Bishop({});
        this.rookModel = new Rook({});
    }

    updateCoveredSqs(board) {
        let coveredCoords = [...this.bishopModel.getCoords.call(this, board), ...this.rookModel.getCoords.call(this, board)];

        super.updateCoveredSqs(coveredCoords, board);
        
        return this.coveredSqs;
    }
}

export default Queen;