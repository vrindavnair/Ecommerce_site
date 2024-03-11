import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { GiHamburgerMenu } from 'react-icons/gi'; 
import { FaShoppingCart } from "react-icons/fa";
import './Header.css'
import { Link } from 'react-router-dom';
import { useAuth } from '../../src/context/Auth';

const Header = () => {

const [auth,setAuth]=useAuth()
const handleLogout=()=>{
  setAuth({
    ...auth,user:null,
  })
  localStorage.removeItem('token')
}
  return (
    <div>
      <Navbar bg="" id='navcolor' variant="dark" expand="lg">
      <Container>
        <Navbar.Brand  id='vstore'><FaShoppingCart/>&nbsp;Ecommerce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <GiHamburgerMenu style={{color:'black'}}/> {/* Navigation icon */}
        </Navbar.Toggle>
        
        <Navbar.Collapse id="basic-navbar-nav" >
       
        
          <Nav className="ml-auto" >
            <Link to='/'className='link' href="#home" style={{marginLeft:'300px'}}>HOME</Link>
           <Link to='/' className='link' href="#services">CAREGORIES</Link>
          <Nav.Link  className='link' href="#services">CART</Nav.Link>
 {
  !auth.user?(<>

            <Link to='/register' className='link' href="#about">REGISTER</Link>
            <Link to='/login' className='link' href="#services">SIGN IN</Link>
            </>):(<>
              <li className='nav-item dropdown'>
                                    <Link className="nav dropdown-toggle" href="#" role="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">
                                        {auth.user?.name}
                                    </Link>
                                    <ul className='dropdown-menu'>
                                        <li>
                                            <Link to={`/dashbord/${auth?.user?.role === 1 ? "admin" : "user"}`}
                                                className="dropdown-item">
                                                Dashboard
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link onClick={handleLogout} to="/login" className="nav-link active" aria-current="page" style={{color:'black'}}>LOGOUT</Link>
                                        </li>
                                    </ul>
                                </li>
           </>)
 }
      </Nav>
      
       {/* <button class="btn  dropdown-toggle" type="button" style={{padding:'30px'}}></button> */}
    </Navbar.Collapse>
      
      </Container>
    </Navbar>
    </div>
  )
}

export default Header


