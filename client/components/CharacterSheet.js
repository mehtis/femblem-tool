import React from 'react'


const StatTable = (props) => {
  return <table className='stat-table' >
    <thead>
      <tr>
        {Object.entries(props.value).map((row) =>
          <th key={row[0]}>
            {row[0]}
          </th>)}
      </tr>
    </thead>
    <tbody>
      <tr>
        {Object.entries(props.value).map((row) =>
          <td key={row[0]}>
            {row[1]}
          </td>
        )}
      </tr>
    </tbody>
    <style jsx>{`
      th, td {
        border: 1px solid black;
      }
      td {
        text-align: right;
      }
    `}</style>
  </table>
}

const Selector = (props) => {
  return <select>
    <option value="" defaultValue disabled hidden>Choose here</option>
    {Array.isArray(props.choices)
      ? props.choices.map((character) =>
        <option key={character} value={character}>{character}</option>)
      : <option value={props.choices}>{props.choices}</option>}
  </select>
}

class CharacterSheet extends React.Component {
  render() {
    return(
      <div className='character-sheet'>
        <p>{`Name: ${this.props.characterName}`}</p>
        <p>{'Class:'}</p>
        <Selector choices={this.props.baseClasses} />
        <p>Growth rates:</p>
        <StatTable value={this.props.growthRates} />
        <p>Max stat modifiers:</p>
        <StatTable value={this.props.maxStatModifiers} />
        <p>Spouse:</p>
        <Selector choices={this.props.romanticSupports} />
        <style jsx>{`
        .character-sheet {
          margin: 20px;
          padding: 20px;
          border: 1px solid #DDD;
          display: inline-block;
        }
        p {
          margin: 5px;
        }
        `}</style>
      </div>
    )
  }
}

export default CharacterSheet