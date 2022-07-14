import { useEffect } from "react";

export default function Warrior({model, activateWarrior, boardModel}) {
    useEffect(() => {
        model.updateCoveredSqs(boardModel);
    }, []);
    
    return (
        <img src={model.ico} alt={model.name} onClick={activateWarrior.bind(null, model)} />
    )
}