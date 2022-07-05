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
}

export default Bishop;