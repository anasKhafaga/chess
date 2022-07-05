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
        this.coveredSqs = [];
    }
}

export default Warrior;