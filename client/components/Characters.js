import CharacterSheet from '../components/CharacterSheet'
import characters from '../static/characters.json'
import classes from '../static/classes.json'
import React from 'react'
import uuid from 'uuid/v4'

class Characters extends React.Component {
  constructor(props) {
    super(props)
    this.state = {characterList: []}
  }

  componentDidMount() {
    //TODO: WIP
    this.setState({characterList: [ ...this.state.characterList,
      this.props.game === 'Awakening'
        ? {game: 'Awakening', id: uuid()}
        : {game: 'Fates', id: uuid()}
    ]})
  }

  addCharacter = () => {
    //TODO: WIP
    this.setState({characterList: [ ...this.state.characterList,
      this.props.game === 'Awakening'
        ? {game: 'Awakening', id: uuid()}
        : {game: 'Fates', id: uuid()}
    ]})
  }

  removeSheet = (removedId) => {
    this.setState({
      characterList: this.state.characterList.filter(character => character.id !== removedId)
    })
  }

  render() {
    return (
      <div className="characters-container">
        <button className="plus-button" onClick={this.addCharacter}>
          +
        </button>
        {this.state.characterList.length > 0 && this.state.characterList.map((character) =>
          <CharacterSheet
            key={character.id}
            characters={characters[character.game]}
            classes={classes[character.game]}
            id ={character.id}
            removeSheet={this.removeSheet}
          />
        )}
        <style jsx>{`
          .plus-button {
            border-radius: 50%;
            float: left;
          }
        `}</style>
      </div>
    )
  }
}

Characters.defaultProps = {
  game: 'Awakening'
}

export default Characters