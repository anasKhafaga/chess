import Square from './Square';
import { useState, useEffect } from 'react';
import model from '../models/Board';

export default function Board() {

    const [boardSqs, setBoardSqs] = useState([]);
    
    useEffect(() => {
        let boardMap = model.generateSquares();
        let boardSqsHolder = [];

        boardMap.forEach((v, k) => {
            boardSqsHolder.push({k, v})
        })

        setBoardSqs(boardSqsHolder);
        
    }, [])
    
    return (
        <div>
            {boardSqs.length && boardSqs.map(({k, v}) => {
                return (
                    <Square key={k} model={v}/>
                )
            })}
        </div>
    )
}