import Link from 'next/link'

const getHeaders = () => {
  return [
    {link: 'index', title: 'Home'},
    {link: 'tool', title: 'Tool'},
    {link: 'about', title: 'About'}
  ]
}

const HeaderItem = (item) => {
  return (
    <div>
      <Link key={item.link} href={`/${item.link}`}>
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
  )
}

const Header = () => (
  <div>
    {getHeaders().map((header) => (
      <HeaderItem key={header.link} {...header} />
    ))}
    < style jsx>{`
    div {
      border-bottom: 1px solid #DDD;
      padding: 10px;
      margin: 10px;
    }
    `}</style>
  </div>
)

export default Header