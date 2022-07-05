/**
 * @class Knight
 */

import white from '../../media/knight.png';
import black from '../../media/knightb.png';

import Warrior from '../Warrior';

class Knight extends Warrior {
    constructor(props) {
        super({...props, white, black});
    }
}

export default Knight;