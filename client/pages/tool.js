import GenericPage from '../components/GenericPage.js'
import CharacterSheet from '../components/CharacterSheet'
import characters from '../static/characters.json'

const Tool = (props) => (
  <GenericPage>
    <CharacterSheet {...props.character}/>
  </GenericPage>
)

Tool.getInitialProps = async (context) => {
  //TODO: Fetch classes
  const game = context.query.gameName
  const fetchedCharacter = game === 'Awakening'
    ? context.query.characterName || 'Chrom'
    : context.query.characterName || 'Ryoma'
  const character = characters[game][fetchedCharacter]
  return {
    character
  }
}

export default Tool