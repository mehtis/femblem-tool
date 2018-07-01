import React from 'React'

class CharacterSheet extends React.Component {
  render() {
    <div className='character-sheet'>
      <h1>{`Character name: ${this.props.characterName}`}</h1>
      <p>{`Starting class: ${this.props.startingClass}`}</p>
      <p>Base classes:</p>
      <ul>
        {this.props.baseClasses.map((value) => {
          return <li>{`${value[0]}: ${value[1]}`}</li>
        })}
      </ul>
      <p>Growth rates:</p>
      <ul>
        {this.props.growthRates.map((value) => {
          return <li>{`${value[0]}: ${value[1]}`}</li>
        })}
      </ul>
      <p>Max stat modifiers:</p>
      <ul>
        {this.props.maxStatModifiers.map((value) => {
          return <li>{`${value[0]}: ${value[1]}`}</li>
        })}
      </ul>
      <p>Romantic supports:</p>
      <ul>
        {this.props.romanticSupports.map((value) => {
          return <li>{`${value}`}</li>
        })}
      </ul>
      <p>Other supports:</p>
      <ul>
        {this.props.otherSupports.map((value) => {
          return <li>{`${value}`}</li>
        })}
      </ul>
    </div>
  }
}

export default CharacterSheet