/**
 * @class King
 */

import white from '../../media/king.png';
import black from '../../media/kingb.png';

import Warrior from '../Warrior';
import {Knight, Queen} from '.';

class King extends Warrior {
    constructor(props) {
        super({...props, white, black});
        this.dirs = {
            [Symbol.for(`(0, -1)`)]: 'for',
            [Symbol.for(`(0, 1)`)]: 'back',
            [Symbol.for(`(-1, 0)`)]: 'rt',
            [Symbol.for(`(1, 0)`)]: 'lt',
            [Symbol.for(`(-1, -1)`)]: 'forRt',
            [Symbol.for(`(-1, 1)`)]: 'backRt',
            [Symbol.for(`(1, -1)`)]: 'forLt',
            [Symbol.for(`(1, 1)`)]: 'backLt',
        }
        this.queenEye = new Queen({army: this.army, name: 'Qe', king: this});
        this.knightEye = new Knight({army: this.army, name: 'Ne', king: this});

        this.checked = false;
        this.checking = null;
        this.checkingPath = [];
        this.pinningPaths = new Map();
        this.pinnedList = new Set();
    }

    checkMate() {
        this.updatePermittedSqs();

        for(let sq of this.permittedSqs) {
            if(!sq.occupying || sq.occupying.army !== this.army) {
                return false;
            }
        }

        if(this.checkingPath.length === 0) return true;

        for (let sq of this.checkingPath){
            for(let obs of sq.observers) {
                if(obs.army === this.army && obs.rank !== 'K' && obs.name !== 'Qe' && obs.name !== 'Ne'){
                    obs.updatePermittedSqs();
                    if(obs.permittedSqs.includes(sq)) return false;
                }
            }
        }

        return true;
    }
    
    setChecking(state, enemy, enemySq) {
        this.checked = state;
        this.checking = enemy;

        if(this.checked) {
            this.checkingPath.length = 0;
            if(this.checkMate()) {
                this.endGame(this.army === 'white'? 'black' : 'white');
            }
            return;
        }

        if(enemy.rank === 'N') {
            this.checkingPath.push(enemySq);
            if(this.checkMate()) {
                this.endGame(this.army === 'white'? 'black' : 'white');
            }
            return;
        }
        
        let checkingDirName;

        main: for(let [k, v] of this.queenEye.coveredSqs) {
            for(let sq of v) {
                if(sq === enemySq) {
                    checkingDirName = k;
                    break main;
                }
            }
        }

        main: for(let sq of this.queenEye.coveredSqs.get(checkingDirName)) {
            this.checkingPath.push(sq);
            if(sq.occupying === enemy) {
                break main;
            }
        }

        if(this.checkMate()) {
            this.endGame(this.army === 'white'? 'black' : 'white');
        }
        
    }

    unSetChecking() {
        this.checked = false;
        this.checking = null;
        this.checkingPath.length = 0;
    }

    discoverSqs(board) {
        this.queenEye.sq = this.sq;
        this.knightEye.sq = this.sq;
        this.queenEye.updateCoveredSqs(board);
        this.knightEye.updateCoveredSqs(board);
    }

    updatePermittedSqs() {
        const intial = super.updatePermittedSqs();
        const final = [];

        main: for(let sq of intial) {
            for(let obs of sq.observers) {
                if(obs.army === this.army) continue;

                if(obs.name === 'Qe' || obs.name === 'Ne') continue;
                
                if(obs.rank === 'P') {
                    if(obs.coveredSqs.get('forLt')[0] === sq || obs.coveredSqs.get('forRt')[0] === sq) {
                        continue main;
                    }

                    continue;
                }
                
                for(let obSq of obs.permittedSqs) {
                    if(sq === obSq) continue main;
                }
            }

            final.push(sq);
        }

        this.permittedSqs = [...final];
        return this.permittedSqs;
    }
    
    updateCoveredSqs(board) {
        let coveredCoords = [];
        const {col, row} = this.sq.coord;

        for(let i = row - 1; i <= row + 1 && i <= board.rows.length; i++) {
            if(i <= 0) continue;
            for(let j = col - 2; j <= col && j < board.cols.length; j++) {
                if(j < 0 || (j === col - 1 && i === row)) continue;
                const dir = this.dirs[Symbol.for(`(${col - 1 - j}, ${row - i})`)];
                coveredCoords.push([{col: j, row: i}, dir]);
            }
        }

        if (this.firstMove) {
            coveredCoords.push([{col: col - 3, row}, 'lt']);
            coveredCoords.push([{col: col + 1, row}, 'rt']);
        }
        

        super.updateCoveredSqs(coveredCoords, board);
        this.discoverSqs(board);
        return this.coveredSqs
    }

    move(...params) {

        if(this.firstMove && !this.checked) {
            const [sq, board] = params;
            const [aSq, cSq, dSq, fSq, gSq, hSq] = ['a', 'c', 'd', 'f', 'g', 'h'].map(col => {
                return board.boardMap.get(`${col}${this.sq.coord.row}`);
            })

            if(sq === gSq) {
                const rookSq = hSq;
                const rook = hSq.occupying;

                if(rook && rook.firstMove && rook.permittedSqs.includes(sq) && this.permittedSqs.includes(fSq)){
                    const castleSq = fSq;
                    rook.firstMove = false;
                    castleSq.occupyView(rook);
                    castleSq.occupy(rook);
                    rook.sq.unOccupy();
                    rook.sq = castleSq;
                    rook.updateCoveredSqs(board);
                } else {
                    return;
                }
            } else if (sq === cSq) {
                const rookSq = aSq;
                const rook = rookSq.occupying;
                if(rook && rook.firstMove && rook.permittedSqs.includes(sq) && this.permittedSqs.includes(dSq)) {
                    const castleSq = dSq;
                    rook.firstMove = false;
                    castleSq.occupyView(rook);
                    castleSq.occupy(rook);
                    rook.sq.unOccupy();
                    rook.sq = castleSq;
                    rook.updateCoveredSqs(board);
                } else {
                    return;
                }
            }
        }
        

        super.move(...params);

        for(let warrior of this.pinnedList) {
            warrior.pinned = false;
        }
        this.pinnedList.clear();
        this.pinningPaths.clear();
        
    }
    
}

export default King;