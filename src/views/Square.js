import {useState, useEffect} from 'react';
import Warrior from './Warrior';

export default function Square({model, activeWarrior, activateWarrior, boardModel}) {

    const [occupied, setOccupied] = useState(false);
    const [occupyingWarrior, setOccupyingWarrior] = useState(null)
    const [focus, setFocus] = useState(false);
    
    useEffect(() => {
        if(model.occupying){
            setOccupied(true);
            setOccupyingWarrior(model.occupying);
        }
    }, [])

    useEffect(()=> {
        if(activeWarrior && occupyingWarrior === activeWarrior){
            setFocus(true);
        }else {
            setFocus(false);
        }
    }, [activeWarrior])

    useEffect(() => {
        model.unOccupyView = function() {
            setOccupied(false);
            setOccupyingWarrior(null);
        }
    }, [])
    
    function occupy() {
        if(!activeWarrior || occupyingWarrior === activeWarrior || !activeWarrior.permittedSqs.includes(model)) return;
        activeWarrior.move(model, boardModel, (warrior) => {
            setOccupied(true);
            setOccupyingWarrior(warrior);
            activateWarrior(null);
        })
    }
    
    return (
        <div className={`${model.color} ${focus? 'active' : ''}`} onClick={occupy}>
            {occupied? <Warrior model={occupyingWarrior} activateWarrior={activateWarrior} boardModel={boardModel} /> : null}
        </div>
    )
}