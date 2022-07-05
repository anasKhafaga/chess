/**
 * @class King
 */

import white from '../../media/king.png';
import black from '../../media/kingb.png';

import Warrior from '../Warrior';

class King extends Warrior {
    constructor(props) {
        super({...props, white, black});
    }
}

export default King;