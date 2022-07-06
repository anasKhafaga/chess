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
        this.bishopModel.updateCoveredSqs.call(this, board);
        this.rookModel.updateCoveredSqs.call(this, board);

        return this.coveredSqs;
    }
}

export default Queen;