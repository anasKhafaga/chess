import Square from './Square';
import { useState } from 'react';

export default function Board() {

    const [boardSqs, setBoardSqs] = useState([]);
    
    return (
        <div>
            <Square />
        </div>
    )
}