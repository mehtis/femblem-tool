import CharacterSheet from '../components/CharacterSheet'
import characters from '../static/characters.json'
import React from 'react'

const PlusButton = () => { 
  return (
    <button className="plus-button">
      +
      <style jsx>{`
        .plus-button {
          border-radius: 50%;
          float: right;
        }
      `}</style>
    </button>
  )
}
class Characters extends React.Component {

  constructor(props) {
    super(props)
    this.state = {characterNumber: 1}
  }

  addCharacter() {
    //TODO: Complete
    this.setState({characterNumber: this.state.characterNumber++})
  }

  render() {
    return (
      <div className="characters">
        <CharacterSheet character={this.props.game === 'Awakening' ? characters.Awakening.Chrom : characters.Fates.Ryoma} />
        <PlusButton />
      </div>)
  }
}

export default Characters