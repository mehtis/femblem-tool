import GenericPage from '../components/GenericPage'
import Link from 'next/link'

const PartyLink = (props) => (
  <li>
    <Link href={`/tool?characterName=${props.characterName}`}>
      <a>{props.characterName}</a>
    </Link>
  </li>
)
export default () => (
  <GenericPage>
    <h1>To party builder</h1>
    <PartyLink characterName="Chrom" />
  </GenericPage>
)
