import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from 'react-helmet'

const Layout = ({children,title}) => {
  return (
    <div>
        <Header/>
            <div >{children}</div>
            <Helmet>
            <title>{title}</title>
            </Helmet>
        <Footer/>
       
    </div>
  )
}
Layout.defaultProps={
  title:'E-commerceapp'
}

export default Layout