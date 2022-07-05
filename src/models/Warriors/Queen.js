/**
 * @class Queen
 */

import white from '../../media/queen.png';
import black from '../../media/queenb.png';

import Warrior from '../Warrior';

class Queen extends Warrior {
    constructor(props) {
        super({...props, white, black});
    }
}

export default Queen;