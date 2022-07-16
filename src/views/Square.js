import {useState, useEffect} from 'react';
import Warrior from './Warrior';

export default function Square({model, activeWarrior, activateWarrior, boardModel, player, setPlayer, flip, prevWarrior, setPrevWarrior, prevSq, setPrevSq}) {

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
        if((activeWarrior && occupyingWarrior === activeWarrior) || (prevWarrior && occupyingWarrior === prevWarrior) || (prevSq && model === prevSq)){
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

        model.occupyView = function(warrior) {
            setOccupied(true);
            setOccupyingWarrior(warrior);
        }
    }, [])

    useEffect(()=> {

        if(prevWarrior && occupyingWarrior === prevWarrior) {
            setFocus(true);
        }
        
    }, [prevWarrior])

    useEffect(() => {

        if(prevSq && model === prevSq) {
            setFocus(true);
        }
        
    }, [prevSq])
    
    function occupy() {
        if(!activeWarrior || occupyingWarrior === activeWarrior || !activeWarrior.permittedSqs.includes(model) || (occupyingWarrior && occupyingWarrior.army === activeWarrior.army)) return;
        activeWarrior.move(model, boardModel, (warrior, pSq) => {
            setOccupied(true);
            setOccupyingWarrior(warrior);

            setPrevWarrior(activeWarrior);
            setPrevSq(pSq)
            
            activateWarrior(null);
            setPlayer(state => {
                return state === 'white'? 'black' : 'white';
            })
        })
    }
    
    return (
        <div className={`${model.color} ${focus? 'active' : ''} ${flip? 'flip' : ''}`} onClick={occupy}>
            {occupied? <Warrior model={occupyingWarrior} activateWarrior={activateWarrior} boardModel={boardModel} /> : null}
        </div>
    )
}