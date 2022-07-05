export default function Warrior({model, activateWarrior}) {
    return (
        <img src={model.ico} alt={model.name} onClick={activateWarrior.bind(null, model)} />
    )
}