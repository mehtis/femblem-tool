import GenericPage from '../components/GenericPage.js'
import CharacterSheet from '../components/CharacterSheet'
import characters from '../static/characters.json'

const Tool = (props) => (
  <GenericPage>
    <h1>{props.game}</h1>
    <CharacterSheet {...props.character}/>
  </GenericPage>
)

Tool.getInitialProps = async (context) => {
  //TODO: Fetch classes
  const game = context.query.gameName ||'Awakening'
  const fetchedCharacter = game === 'Awakening'
    ? context.query.characterName || 'Chrom'
    : context.query.characterName || 'Ryoma'
  const character = characters[game][fetchedCharacter]
  return {
    character,
    game
  }
}

export default Tool