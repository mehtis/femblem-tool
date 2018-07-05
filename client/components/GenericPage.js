import Header from './Header'



const Layout = (props) => (
  <div className='generic-page' >
    <Header />
    {props.children}
    <style jsx>{`
      .generic-page {
        margin: 20px;
        padding: 20px;
        border: 1px solid #DDD;
      }
    `}</style>
  </div>
)

export default Layout