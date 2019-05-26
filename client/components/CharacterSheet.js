import React from 'react'
import PropTypes from 'prop-types'


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
            row[0] === 'weapons'
              ?
              <td className='weapons-td' key={row[0]}>
                <table>
                  <thead>
                    <tr>
                      {row[1].map((weapon) =>
                        <th key={weapon.weapon}>
                          {weapon.weapon}
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {row[1].map((weapon) =>
                        <td key={weapon.weapon}>
                          {weapon.rank}
                        </td>
                      )}
                    </tr>
                  </tbody>
                </table>
              </td>
              :
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
      .weapons-td {
        border: none;
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

const Portrait = (props) =>
  props.gameName && props.characterName
    ?
    <div>
      <img
        src={`/static/${props.gameName}/portraits/portrait_${props.characterName}.png`}
        alt={props.characterName}
        onError={props.error}
      />
      <style jsx>{`
        img {
          height: 80px;
          width: 80px;
        }
        div {
          height: 80px;
          width: 80px;
          float: left;
        }
      `}</style>
    </div>
    :
    null

const emptyGrowthRates = {
  'hp': '-',
  'str': '-',
  'mag': '-',
  'skl': '-',
  'spd': '-',
  'lck': '-',
  'def': '-',
  'res': '-'
}

const emptyMaxStats = {
  'str': '-',
  'mag': '-',
  'skl': '-',
  'spd': '-',
  'lck': '-',
  'def': '-',
  'res': '-'
}

class CharacterSheet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      growthRates: emptyGrowthRates,
      maxStats: emptyMaxStats,
      totalGrowthRates: emptyGrowthRates,
      totalMaxStats: emptyMaxStats,
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
        if (Number.isInteger(clss)) {
          totalGrowthRates[stat] = Number.isInteger(chr) ? `${chr + clss}%` : `${clss}%`
        } else {
          totalGrowthRates[stat] = '-'
        }
      })
      this.setState({totalGrowthRates})
    }
  }

  setTotalMaxStats = () => {
    if (this.state.maxStats && this.state.maxStatModifiers) {
      let totalMaxStats = {...this.state.maxStats}
      Object.keys(totalMaxStats).map((stat) => {
        if (stat === 'weapons') return
        const chr = parseInt(this.state.maxStatModifiers[stat], 10)
        const clss = parseInt(this.state.maxStats[stat], 10)
        if (Number.isInteger(clss)) {
          totalMaxStats[stat] = Number.isInteger(chr) ? chr + clss : clss
        } else {
          totalMaxStats[stat] = '-'
        }
      })
      this.setState({totalMaxStats})
    }
  }

  render() {
    return (
      <div className='character-sheet'>
        <div className='upper-row-div'>
          <button className='remove-button' onClick={() => this.props.removeSheet(this.props.id)}>
          x
          </button>
          <Portrait
            gameName={this.props.gameName}
            characterName={this.state.characterName}
            error={() => this.setState({portraitError: true})}
          />
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
        </div>
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
          .upper-row-div {
            height: 80px;
          }
        `}</style>
      </div>
    )
  }
}
CharacterSheet.propTypes = {
  characters: PropTypes.shape(PropTypes.shape({
    baseClasses: PropTypes.arrayOf(PropTypes.string.isRequired),
    characterName: PropTypes.string.isRequired,
    growthRates: PropTypes.arrayOf(PropTypes.object).isRequired,
    maxStatModifiers: PropTypes.arrayOf(PropTypes.object).isRequired,
    otherSupports: PropTypes.arrayOf(PropTypes.string),
    romanticSupports: PropTypes.arrayOf(PropTypes.string.isRequired),
    startingClass: PropTypes.string,
  })).isRequired,
  classes: PropTypes.shape(PropTypes.shape({
    baseStats: PropTypes.arrayOf(PropTypes.object).isRequired,
    classGrowthRates: PropTypes.arrayOf(PropTypes.object).isRequired,
    className: PropTypes.string.isRequired,
    classSkills: PropTypes.arrayOf(PropTypes.shape({
      skillName: PropTypes.string.isRequired,
      requirements: PropTypes.string.isRequired,
      //TODO: Effect
    })).isRequired,
    maxStats: PropTypes.arrayOf(PropTypes.object).isRequired,
    promotions: PropTypes.shape({
      classNames: PropTypes.arrayOf(PropTypes.string.isRequired),
      method: PropTypes.string.isRequired,
    })
  })),
  gameName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  removeSheet: PropTypes.func.isRequired,
}
export default CharacterSheet