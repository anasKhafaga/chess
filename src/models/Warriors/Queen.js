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
        this.king = props.king;
        this.bishopModel = new Bishop({});
        this.rookModel = new Rook({});
    }

    gotUpdate(sq) {
        if(this.name !== 'Qe'){
            return super.gotUpdate(sq);
        }

        super.gotUpdate(sq);
        let pinningDir = [];
        main: for(let [k, v] of this.coveredSqs) {
            for(let cSq of v) {
                if(cSq !== sq) continue;

                pinningDir = [...this.coveredSqs.get(k)];
                break main;
            }
        }

        let pinnedWarrior, attackingWarrior;

        main: for(let pSq of pinningDir) {
            if(pSq.occupying) {
                if(pSq.occupying.army === this.army) {
                    if(!pinnedWarrior) {
                        pinnedWarrior = pSq.occupying
                    }

                    pSq.occupying.pinned = false;
                }else {
                    attackingWarrior = pSq.occupying;
                    break main;
                }
            } 
        }
        
        if(pinnedWarrior && attackingWarrior && attackingWarrior.rank !== 'N') {
            if(attackingWarrior.permittedSqs.includes(pinnedWarrior.sq) && this.permittedSqs.includes(pinnedWarrior.sq)){
                this.king.pinningPaths.set(pinnedWarrior, pinningDir);
                pinnedWarrior.pinned = true;
                this.king.pinnedList.add(pinnedWarrior);
            } else {
                this.king.pinningPaths.delete(pinnedWarrior);
                this.king.pinnedList.delete(pinnedWarrior);
            }
        } else if(!attackingWarrior) {
            this.king.pinningPaths.delete(pinnedWarrior);
            this.king.pinnedList.delete(pinnedWarrior);

        } else if(!pinnedWarrior && attackingWarrior) {
            if(attackingWarrior.permittedSqs.includes(this.king.sq)) {
                this.king.setChecking(true, attackingWarrior, attackingWarrior.sq);
            }
        }
    }

    updateCoveredSqs(board) {
        let coveredCoords = [...this.bishopModel.getCoords.call(this, board), ...this.rookModel.getCoords.call(this, board)];

        super.updateCoveredSqs(coveredCoords, board);
        
        return this.coveredSqs;
    }
}

export default Queen;