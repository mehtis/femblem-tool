import React from 'react'

const StatTable = (props) => {
  return <table>
    <thead>
      <tr>
        {props.value.map((row) =>
          <th key={row[0]}>
            {row[0]}
          </th>)}
      </tr>
    </thead>
    <tbody>
      <tr>
        {props.value.map((row) =>
          <td key={row[0]}>
            {row[1]}
          </td>
        )}
      </tr>
    </tbody>
  </table>
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
        <StatTable value={this.props.growthRates} />
        <p>Max stat modifiers:</p>
        <StatTable value={this.props.maxStatModifiers} />
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