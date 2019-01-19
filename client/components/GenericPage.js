import Header from './Header'
import Footer from './Footer'



const Layout = (props) => (
  <div className='generic-page' >
    <Header />
    {props.children}
    <Footer />
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