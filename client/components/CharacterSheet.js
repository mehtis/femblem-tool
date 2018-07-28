import React from 'react'


const StatTable = (props) => (
  <div>
    <label>
      {props.label}
    </label>
    <table className='stat-table' >
      <thead>
        <tr>
          {props.value && Object.entries(props.value).map((row) =>
            <th key={row[0]}>
              {row[0]}
            </th>)}
        </tr>
      </thead>
      <tbody>
        <tr>
          {props.value && Object.entries(props.value).map((row) =>
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
  //TODO: Reset selection on state change?
  return (
    <div>
      <label>
        {props.label}
      </label>
      {props.choices &&
      <select onChange={props.onChange}>
        <option disabled selected value>{`Select ${props.label.toLowerCase()}`}</option>
        {Array.isArray(props.choices)
          ? props.choices.map((item) =>
            <option key={item} value={item}>{item}</option>)
          : <option value={props.choices}>{props.choices}</option>}
      </select>}
      <style jsx>{`
        label {
          margin: 5px;
        }
      `}</style>
    </div>
  )
}

class CharacterSheet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      character: {
        'growthRates': {
          'hp': '-',
          'str': '-',
          'mag': '-',
          'skl': '-',
          'spd': '-',
          'lck': '-',
          'def': '-',
          'res': '-'
        },
        'maxStatModifiers': {
          'str': '-',
          'mag': '-',
          'skl': '-',
          'spd': '-',
          'lck': '-',
          'def': '-',
          'res': '-'
        }
      }
    }
  }


  changeCharacter = (event) => {
    //TODO: Characters from Redux state?
    this.setState({character: this.props.characters[event.target.value]})
  }

  render() {
    return (
      <div className='character-sheet'>
        <button className='remove-button' onClick={() => this.props.removeSheet(this.props.id)}>
        x
        </button>
        <Selector
          label="Name"
          choices={Object.keys(this.props.characters)}
          onChange={this.changeCharacter}
        />
        <Selector
          label="Class"
          choices={this.state.character.baseClasses}
        />
        <StatTable
          label="Growth rates"
          value={this.state.character.growthRates}
        />
        <StatTable
          label="Max stat modifiers"
          value={this.state.character.maxStatModifiers}
        />
        <Selector
          label="Spouse"
          choices={this.state.character.romanticSupports}
        />
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