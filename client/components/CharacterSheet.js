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

const SupportSelector = (props) => {
  return <select>
    <option value="" defaultValue disabled hidden>Choose here</option>
    {props.supports.map((character) =>
      <option key={character} value={character}>{character}</option>
    )}
  </select>
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
        <p>Romantic support:</p>
        <SupportSelector supports={this.props.romanticSupports} />
        <p>Other supports:</p>
        <SupportSelector supports={this.props.otherSupports} />
      </div>
    )
  }
}

export default CharacterSheet