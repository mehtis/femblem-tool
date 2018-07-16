import GenericPage from '../components/GenericPage'
import Link from 'next/link'

const PartyLink = (props) => (
  <li>
    <Link href={`/tool?gameName=${props.gameName}`}>
      <a>{props.gameName}</a>
    </Link>
  </li>
)
export default () => (
  <GenericPage>
    <h1>To party builder</h1>
    <PartyLink gameName="Awakening" />
    <PartyLink gameName="Fates" />
  </GenericPage>
)
