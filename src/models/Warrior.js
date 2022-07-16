/**
 * @class Warrior
 */

class Warrior {
    constructor({name, rank, army, sq, white, black}) {
        this.name = name;
        this.rank = rank;
        this.army = army;
        this.ico = army === 'white'? white : black;
        this.sq = sq;
        sq && sq.occupy(this)
        this.firstMove = true;
        this.coveredSqs = new Map([['for', []], ['back', []], ['rt', []], ['lt', []], ['forRt', []], ['forLt', []], ['backLt', []], ['backRt', []]]);
        this.permittedSqs = [];
        this.killed = false;
    }

    updatePermittedSqs() {
        this.permittedSqs.length = 0;
        
        for(let [k, v] of this.coveredSqs) {
            dir: for(let sq of v) {
                if(sq.occupying) {
                    this.permittedSqs.push(sq);
                    if(sq.occupying.army !== this.army && sq.occupying.rank === 'K') {
                        continue dir;
                    }
                    break dir;
                }

                if(this.king && this.king.checked && !this.king.checkingPath.includes(sq)) {
                    continue dir;
                }
                this.permittedSqs.push(sq);
            }
        }

        return this.permittedSqs;
    }
    
    gotUpdate() {
        this.updatePermittedSqs()
    }
    
    updateCoveredSqs(coords, board) {

        for(let [k, v] of this.coveredSqs) {
            for(let sq of v) {
                sq.removeObserver(this);
            }
            v.length = 0;
        }
        
        for(let [{col, row}, dir] of coords) {
            const colLet = board.cols[col];
            const sq = board.boardMap.get(`${colLet}${row}`);
            sq.addObserver(this);
            
            this.coveredSqs.get(dir).push(sq);
        }

        this.updatePermittedSqs();
    }

    kill() {
        this.killed = true;
        for(let [k, v] of this.coveredSqs) {
            for(let sq of v) {
                sq.removeObserver(this);
            }
            v.length = 0;
        }

        this.permittedSqs.length = 0;
    }

    move(sq, board, cb) {
        this.firstMove = false;
        cb(this, this.sq);
        sq.occupying && sq.occupying.kill();
        this.sq.unOccupy();
        this.sq = sq;
        this.updateCoveredSqs(board);
        sq.occupy(this)

        for(let perSq of this.permittedSqs) {
            if(perSq.occupying && perSq.occupying.rank === 'K' && perSq.occupying.army !== this.army && perSq.occupying.name !== 'Qe'){
                perSq.occupying.setChecking(true, this, this.sq);
            }
        }

        if((this.king && this.king.checked) || this.checked) {
            if(this.rank === 'K') {
                this.unSetChecking();
            } else {
                this.king.unSetChecking();
            }
        }
    }
}

export default Warrior;