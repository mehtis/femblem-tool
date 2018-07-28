import CharacterSheet from '../components/CharacterSheet'
import characters from '../static/characters.json'
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
        ? {game: 'Awakening', name: 'Chrom', id: uuid()}
        : {game: 'Fates', name: 'Ryoma', id: uuid()}
    ]})
  }

  addCharacter = () => {
    //TODO: WIP
    this.setState({characterList: [ ...this.state.characterList,
      this.props.game === 'Awakening'
        ? {game: 'Awakening', name: 'Chrom', id: uuid()}
        : {game: 'Fates', name: 'Ryoma', id: uuid()}
    ]})
  }

  removeCharacter = (removedId) => {
    this.setState({
      characterList: this.state.characterList.filter(character => character.id !== removedId)
    })
  }

  render() {
    return (
      <div className="characters">
        <button className="plus-button" onClick={this.addCharacter}>
          +
        </button>
        {this.state.characterList.length > 0 && this.state.characterList.map((character) =>
          <CharacterSheet key={character.id} character={characters[character.game][character.name]} id ={character.id} removeCharacter={this.removeCharacter}
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