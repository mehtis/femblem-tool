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
  const res = await fetch(`http://localhost:8081/?characterName=${context.query.characterName}`)
  const character = await res.json()
  return {
    character
  }
}

export default Tool