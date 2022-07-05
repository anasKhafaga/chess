/**
 * @class Pawn
 */

import white from '../../media/pawn.png';
import black from '../../media/pawnb.png';

import Warrior from '../Warrior';

class Pawn extends Warrior {
    constructor(props) {
        super({...props, white, black});
    }
}

export default Pawn;