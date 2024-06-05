import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Dropdown from 'react-bootstrap/Dropdown';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaShoppingCart } from "react-icons/fa";
import './Header.css'
import { Link } from 'react-router-dom';
import { useAuth } from '../../src/context/Auth';
import SearchInput from '../Form/SearchInput';
import axios from 'axios';
import { useCart } from '../../src/context/Cart';





const Header = () => {


  const [categories, setCategories] = useState([])
  const [auth, setAuth] = useAuth()
  const [cart,setCart]=useCart()
 
  const handleLogout = () => {
    setAuth({
      ...auth, user: null,
    })
    localStorage.removeItem('token')
  }

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/category/get-category");

      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {

    getAllCategory();
  }, [])



  return (
    <div>
      <Navbar bg="" id='navcolor' variant="dark" expand="lg">
        <Container>
          <Navbar.Brand id='vstore'><FaShoppingCart />&nbsp;Ecommerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <GiHamburgerMenu style={{ color: 'black' }} /> {/* Navigation icon */}
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav" >


            <Nav className="ml-auto" >
              <SearchInput />
              <Link to='/' className='link' href="#home" style={{ marginLeft: '200px' }}>HOME</Link>

             
              <Dropdown>
                <Dropdown.Toggle variant="link" id="dropdown-categories"
                 style={{textDecoration:'none',color:'black',fontWeight:'bold', marginTop:'20px'}}>
                  CATEGORIES
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <li><Link to='/allcategories'>All Categories</Link></li>
                  {categories.map(item => (
                    <Dropdown.Item key={item._id}><Link to={`/categories/${item.slug}`}>{item.name}</Link></Dropdown.Item>
                  ))}

                </Dropdown.Menu>
              </Dropdown>
             




             

              <Link to='/cart' className='link' href="#services" >CART ( {cart?.length} )</Link>
              {
                !auth.user ? (<>

                  <Link to='/register' className='link' href="#about">REGISTER</Link>
                  <Link to='/login' className='link' href="#services">SIGN IN</Link>
                </>) : (<>
                  <li className='nav-item dropdown'>
                    <Link className="nav dropdown-toggle" href="#" role="button"
                      style={{
                        textDecoration: 'none',
                        color: 'black',
                        marginTop: '30px',
                        fontWeight: 'bold',
                        marginLeft: '10px'
                      }}
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
                        <Link onClick={handleLogout} to="/login" className="nav-link active" aria-current="page" style={{ color: 'black' }}>LOGOUT</Link>
                      </li>
                    </ul>
                  </li>
                </>)
              }
            </Nav>

            
          </Navbar.Collapse>

        </Container>
      </Navbar>
    </div>
  )
}

export default Header




