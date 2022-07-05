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
}

export default Rook;