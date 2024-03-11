
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { useState } from 'react'
import { useAuth } from '../../context/Auth'
import Layout from '../../../components/layout/Layout'


const Login = () => {

  const[email,setEmail]=useState()
  const[password,setPassword]=useState()
  const navigate=useNavigate()
  const [auth,setAuth]=useAuth()


  const handleSubmit=(e)=>{
      e.preventDefault()
      axios.post("http://localhost:8080/api/v1/auth/login",{
        email,
        password})
      .then(res=>{
       
            setAuth({
                ...auth,
                user:res.data.user,
                token:res.data.token,

            })
             localStorage.setItem("auth",JSON.stringify(res.data))
    
                  navigate(location.state?.from || '/')
          
      }).catch(err=>console.log(err))
  }

  const handleEmail=(e)=>{
      let em=e.target.value
      setEmail(em)
  }
  const handlePassword=(e)=>{
      let p=e.target.value
      setPassword(p)
  }
  return (
    <div>
    <Layout>

        <div className="container loginbody">
        <div className="row">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-4 loginbox">
                        <h4>SIGN IN</h4>
                          <form onSubmit={handleSubmit}>
                        
                           
                            <input type='email' placeholder='EMAIL' onChange={handleEmail}
                            style={{marginLeft:'30px', marginTop:'20px'}}/>
                            <input type='password' placeholder='PASSWORD' onChange={handlePassword}
                            style={{marginLeft:'30px', marginTop:'20px'}}/>
                            <button className='btn' 
                            style={{marginTop:'20px', marginLeft:'50px', width:'130px' ,backgroundColor:'teal', color:'white'}}>Login </button>
                            <Link to="/register" style={{textDecoration:'none'}}>Register</Link>
                            <Link to="/forgotpassword" style={{textDecoration:'none'}} >FrogotPassword</Link>

                        </form>
                        </div>
                </div>
            </div>
        </div>
    </div>
    </Layout>
    
</div>
        
 
  )
}

export default Login





