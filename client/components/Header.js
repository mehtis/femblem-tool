import Link from 'next/link'

const getHeaders = () => {
  return [
    {link: 'index', title: 'Home'},
    {link: 'tool', title: 'Tool'},
    {link: 'about', title: 'About'}
  ]
}

const HeaderItem = (item) => {
  return <div>
    <Link href={`/${item.link}`}>
      <a>{item.title}</a>
    </Link>
    <style jsx>{`
      a {
        margin-right: 15px;
      }
      div {
        display: inline-block;
      }
      `}</style>
  </div>
}

const Header = () => (
  <div>
    {getHeaders().map((header) => (
      <HeaderItem {...header} />
    ))}
  </div>
)

export default Header