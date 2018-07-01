import GenericPage from '../components/GenericPage.js'
import CharacterSheet from '../components/CharacterSheet'
import fetch from 'isomorphic-unfetch'

const Tool = (props) => (
  <GenericPage>
    <CharacterSheet {...props.character}/>
  </GenericPage>
)

Tool.getInitialProps = async (context) => {
  //TODO: Fetch classes
  const fetchedCharacter = context.query.characterName || 'Chrom'
  const res = await fetch(`http://localhost:8081/?characterName=${fetchedCharacter}`)
  const character = await res.json()
  return {
    character
  }
}

export default Tool