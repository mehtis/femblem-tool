import React from 'react'


const StatTable = (props) => (
  <div>
    <label>
      {props.label}
    </label>
    <table className='stat-table' >
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
    </table>
    <style jsx>{`
      th, td {
        border: 1px solid black;
      }
      td {
        text-align: right;
      }

      label {
        margin: 5px;
      }
    `}</style>
  </div>
)

const Selector = (props) => {
  return (
    <div>
      <label>
        {props.label}
      </label>
      <select>
        <option value="" defaultValue disabled hidden>Choose here</option>
        {Array.isArray(props.choices)
          ? props.choices.map((item) =>
            <option key={item} value={item}>{item}</option>)
          : <option value={props.choices}>{props.choices}</option>}
      </select>
      <style jsx>{`
        label {
          margin: 5px;
        }
      `}</style>
    </div>
  )
}

class CharacterSheet extends React.Component {
  render() {
    return (
      <div className='character-sheet'>
        <button className='remove-button' onClick={() => this.props.removeCharacter(this.props.id)}>
        x
        </button>
        <p>{`Name: ${this.props.character.characterName}`}</p>
        <Selector label="Class" choices={this.props.character.baseClasses} />
        <StatTable label="Growth rates" value={this.props.character.growthRates} />
        <StatTable label="Max stat modifiers" value={this.props.character.maxStatModifiers} />
        <Selector label="Spouse" choices={this.props.character.romanticSupports} />
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
          .remove-button {
            border-radius: 50%;
            float: right;
          }
        `}</style>
      </div>
    )
  }
}

export default CharacterSheet