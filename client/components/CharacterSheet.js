const CharacterSheet = (props) => (
  <div className='character-sheet'>
    <h1>{`Character name: ${props.characterName}`}</h1>
    <p>{`Starting class: ${props.startingClass}`}</p>
    <p>Base classes:</p>
    <ul>
      {props.baseClasses.map((value) => {
        return <li>{`${value[0]}: ${value[1]}`}</li>
      })}
    </ul>
    <p>Growth rates:</p>
    <ul>
      {props.growthRates.map((value) => {
        return <li>{`${value[0]}: ${value[1]}`}</li>
      })}
    </ul>
    <p>Max stat modifiers:</p>
    <ul>
      {props.maxStatModifiers.map((value) => {
        return <li>{`${value[0]}: ${value[1]}`}</li>
      })}
    </ul>
    <p>Romantic supports:</p>
    <ul>
      {props.romanticSupports.map((value) => {
        return <li>{`${value}`}</li>
      })}
    </ul>
    <p>Other supports:</p>
    <ul>
      {props.otherSupports.map((value) => {
        return <li>{`${value}`}</li>
      })}
    </ul>
  </div>
)

export default CharacterSheet