import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from 'react-helmet'
 import { Toaster } from 'react-hot-toast'
 import 'react-toastify/dist/ReactToastify.css'

const Layout = ({children,title}) => {
  return (
    <div>
       
        <Helmet>

           
      <title>{title}</title>
            </Helmet>
            <Header/>
            <Toaster/>
           {children}
        <Footer/>
       
    </div>
  )
}
Layout.defaultProps={
  title:'E-commerceapp'
}

export default Layout