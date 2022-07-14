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
    }

    updatePermittedSqs() {
        this.permittedSqs.length = 0;
        
        for(let [k, v] of this.coveredSqs) {
            dir: for(let sq of v) {
                if(sq.occupying) {
                    if(sq.occupying.army !== this.army) {
                        this.permittedSqs.push(sq);
                    }
                    break dir;
                }
                this.permittedSqs.push(sq);
            }
        }

        return this.permittedSqs;
    }
    
    updateCoveredSqs(coords, board) {

        for(let [k, v] of this.coveredSqs) {
            v.length = 0;
        }
        
        for(let [{col, row}, dir] of coords) {
            const colLet = board.cols[col];
            const sq = board.boardMap.get(`${colLet}${row}`);

            this.coveredSqs.get(dir).push(sq);
        }
    }
}

export default Warrior;