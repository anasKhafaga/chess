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

    updatePermittedSqs() {
        this.permittedSqs.length = 0;
        const forward = this.coveredSqs.get('for');
        const [diag1] = this.coveredSqs.get('forLt');
        const [diag2] = this.coveredSqs.get('forRt');
        const dias = [diag1, diag2];

        for(let forSq of forward) {
            if(!forSq.occupying) {
                this.permittedSqs.push(forSq);
            }
        }

        for(let diaSq of dias) {
            if(diaSq && diaSq.occupying && diaSq.occupying.army !== this.army) {
                this.permittedSqs.push(diaSq);   
            }
        }

        if(this.king.checked) {
            this.permittedSqs = this.permittedSqs.filter(sq => {
                return this.king.checkingPath.includes(sq);
            })
        }

        if(this.pinned) {
            this.permittedSqs = this.permittedSqs.filter( sq => {
                return this.king.pinningPaths.get(this).includes(sq);
            })
        }

        return this.permittedSqs;
    }
    
    updateCoveredSqs(board) {
        let coveredCoords = [];
        const {col, row} = this.sq.coord;
        let marchingRow;

        if(this.army === 'white'){
            if(row === 8) return;
            marchingRow = row + 1;
            if (this.firstMove){
                coveredCoords.push([{col: col - 1, row: row + 2}, 'for'])
            }
        } else {
            if(row === 1) return;
            marchingRow = row - 1;
            if(this.firstMove){
                coveredCoords.push([{col: col - 1, row: row - 2}, 'for'])
            }
        }

        if(col !== 1){
            coveredCoords.push([{col: col - 2, row: marchingRow}, 'forLt'])
        }
        if(col !== 8) {
            coveredCoords.push([{col: col, row: marchingRow}, 'forRt']);
        }

        coveredCoords.push([{col: col - 1, row: marchingRow}, 'for']);

        super.updateCoveredSqs(coveredCoords, board);
        return this.coveredSqs;
    }
}

export default Pawn;