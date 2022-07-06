import Square from './Square';
import { useState, useEffect } from 'react';
import model from '../models/Board';

export default function Board() {

    const [boardSqs, setBoardSqs] = useState([]);
    const [activeWarrior, setActiveWarrior] = useState(null);

    function activateWarrior(warrior) {
        warrior && console.log(warrior.updateCoveredSqs(model));
        setActiveWarrior((state) => {
            if(state && state === warrior) return null;
            return warrior;
        });
    }
    
    useEffect(() => {
        let boardMap = model.generateSquares();
        let boardSqsHolder = [];

        boardMap.forEach((v, k) => {
            boardSqsHolder.push({k, v})
        })

        const whiteArmyMap = new Map();
        const blackArmyMap = new Map();

        whiteArmyMap
        .set('K', [boardMap.get('e1')])
        .set('Q', [boardMap.get('d1')])
        .set('B', [boardMap.get('c1'), boardMap.get('f1')])
        .set('N', [boardMap.get('b1'), boardMap.get('g1')])
        .set('R', [boardMap.get('a1'), boardMap.get('h1')])
        .set('P', [boardMap.get('a2'), boardMap.get('b2'), boardMap.get('c2'), boardMap.get('d2'), boardMap.get('e2'), boardMap.get('f2'), boardMap.get('g2'), boardMap.get('h2')])

        blackArmyMap
        .set('K', [boardMap.get('e8')])
        .set('Q', [boardMap.get('d8')])
        .set('B', [boardMap.get('c8'), boardMap.get('f8')])
        .set('N', [boardMap.get('b8'), boardMap.get('g8')])
        .set('R', [boardMap.get('a8'), boardMap.get('h8')])
        .set('P', [boardMap.get('a7'), boardMap.get('b7'), boardMap.get('c7'), boardMap.get('d7'), boardMap.get('e7'), boardMap.get('f7'), boardMap.get('g7'), boardMap.get('h7')])

        model.alignArmy(whiteArmyMap, 'white');
        model.alignArmy(blackArmyMap, 'black');
        
        setBoardSqs(boardSqsHolder);
        
    }, [])
    
    return (
        <div className="brd">
            {boardSqs.length && boardSqs.map(({k, v}) => {
                return (
                    <Square key={k} model={v} activateWarrior={activateWarrior} activeWarrior = {activeWarrior} />
                )
            })}
        </div>
    )
}