import Link from 'next/link'

const getFooterLinks = () => {
  return [
    {link: 'index', title: 'Home'},
    {link: 'tool', title: 'Tool'},
    {link: 'about', title: 'About'}
  ]
}

const FooterLink = (item) => {
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

const Footer = () => (
  <div>
    {getFooterLinks().map((footer) => (
      <FooterLink key={footer.link} {...footer} />
    ))}
    <p>Source: <a href="https://github.com/mehtis/femblem-tool">GitHub</a></p>
    < style jsx>{`
    div {
      border-top: 1px solid #DDD;
      padding: 10px;
    }
    `}</style>
  </div>
)

export default Footer