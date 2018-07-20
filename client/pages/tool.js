import GenericPage from '../components/GenericPage.js'
import Characters from '../components/Characters'
import characters from '../static/characters.json'

const Tool = (props) => (
  <GenericPage>
    <h1>{props.game}</h1>
    <Characters game={props.game}/>
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