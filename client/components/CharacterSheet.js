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
            //TODO: Proper support for Weapons
            <td key={row[0]}>
              {(row[1][0] && row[1][0].rank) || row[1]}
            </td>
          )}
        </tr>
      </tbody>
    </table>
    <style jsx>{`
      th, td {
        border: 1px solid black;
        width: 30px;
      }
      label {
        margin: 5px;
      }
    `}</style>
  </div>
)

const Selector = (props) =>
  //TODO: Reset selection on state change?
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

class CharacterSheet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
      'maxStats': {
        'str': '-',
        'mag': '-',
        'skl': '-',
        'spd': '-',
        'lck': '-',
        'def': '-',
        'res': '-'
      },
      'totalGrowthRates': {
        'hp': '-',
        'str': '-',
        'mag': '-',
        'skl': '-',
        'spd': '-',
        'lck': '-',
        'def': '-',
        'res': '-'
      },
      'totalMaxStats': {
        'str': '-',
        'mag': '-',
        'skl': '-',
        'spd': '-',
        'lck': '-',
        'def': '-',
        'res': '-'
      },
    }
  }


  changeCharacter = (event) => {
    //TODO: Characters from Redux state?
    this.setState({...this.props.characters[event.target.value]}, this.setCombinedStats)
  }

  changeClassStats = (event) => {
    this.setState({...this.props.classes[event.target.value]}, this.setCombinedStats)
  }

  setCombinedStats = () => {
    this.setTotalGrowthRates()
    this.setTotalMaxStats()
  }

  setTotalGrowthRates = () => {
    if (this.state.classGrowthRates && this.state.growthRates) {
      let totalGrowthRates = {...this.state.growthRates}
      Object.keys(totalGrowthRates).map((stat) => {
        const chr = parseInt(this.state.growthRates[stat], 10)
        const clss = parseInt(this.state.classGrowthRates[stat], 10)
        totalGrowthRates[stat] = chr && clss ? `${chr + clss}%` : '-'
      })
      this.setState({totalGrowthRates})
    }
  }

  setTotalMaxStats = () => {
    //TODO: Weapons
    if (this.state.maxStats && this.state.maxStatModifiers) {
      let totalMaxStats = {...this.state.maxStats}
      Object.keys(totalMaxStats).map((stat) => {
        const chr = parseInt(this.state.maxStatModifiers[stat], 10)
        const clss = parseInt(this.state.maxStats[stat], 10)
        if (clss)
          totalMaxStats[stat] = chr ? chr + clss : clss
        else
          totalMaxStats[stat] = '-'
      })
      this.setState({totalMaxStats})
    }
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
          choices={this.state.baseClasses}
          onChange={this.changeClassStats}
        />
        <StatTable
          label="Growth rates"
          value={this.state.totalGrowthRates}
        />
        <StatTable
          label="Max stats"
          value={this.state.totalMaxStats}
        />
        <Selector
          label="Spouse"
          choices={this.state.romanticSupports}
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