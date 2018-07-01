import React from 'react'

const HorizontalList = (value) => {
  return <li>
    {`${value[0]}: ${value[1]}`}
    <style jsx>{`
      li {
        list-style: none;
      }
    `}</style>
  </li>
}

const SupportList = (props) => {
  return <li>
    {`${props.character}`}
    <style jsx>{`
      li {
        list-style: none;
      }
    `}</style>
  </li>
}

class CharacterSheet extends React.Component {


  render() {
    return(
      <div className='character-sheet'>
        <h1>{`Character name: ${this.props.characterName}`}</h1>
        <p>{`Starting class: ${this.props.startingClass}`}</p>
        <p>Base classes:</p>
        <ul>
          {this.props.baseClasses.map((value) => {
            return <li>{`${value}`}</li>
          })}
        </ul>
        <p>Growth rates:</p>
        <ul>
          {this.props.growthRates.map((value) => {
            return <HorizontalList key={value[0]} {...value} />
          })}
        </ul>
        <p>Max stat modifiers:</p>
        <ul>
          {this.props.maxStatModifiers.map((value) => {
            return <HorizontalList key={value[0]} {...value} />
          })}
        </ul>
        <p>Romantic supports:</p>
        <ul>
          {this.props.romanticSupports.map((character) => {
            return <SupportList key={character} character={character} />
          })}
        </ul>
        <p>Other supports:</p>
        <ul>
          {this.props.otherSupports.map((character) => {
            return <SupportList key={character} character={character} />
          })}
        </ul>
      </div>
    )
  }
}

export default CharacterSheet