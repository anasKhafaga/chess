/**
 * @class Square
 */

class Square {
    constructor(name, col, row, color) {
        this.name = name;
        this.color = color? 'dark' : 'light';
        this.coord = new Coord(col, row)
        this.occupying = null;
        this.observers = new Set();
    }

    occupy(warrior) {
        this.occupying = warrior;
        this.notifyObservers();
    }

    unOccupy() {
        this.occupying = null;
        this.notifyObservers();
        this.unOccupyView();
    }
    
    addObserver(warrior) {
        this.observers.add(warrior);
    }

    removeObserver(warrior) {
        this.observers.delete(warrior);
    }

    notifyObservers() {
        let kingEyes = [];
        for(let observer of this.observers) {
            if(observer.name === 'Qe' || observer.name === 'Ne') {
                kingEyes.push(() => observer.gotUpdate(this));
                continue
            }
            observer.gotUpdate(this);
        }

        for (let update of kingEyes) {
            if(typeof update === 'function') {
                update();
            }
        }
    }
}

class Coord {
    constructor(col, row) {
        this.col = col;
        this.row = row;
    }
}

export default Square;