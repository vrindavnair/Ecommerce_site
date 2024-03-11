import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './Register.css'
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Register = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [answer, setAnswer] = useState();



    const navigate = useNavigate();
  
    const onSubmitAll = (e) => {
      e.preventDefault();
      axios.post('http://localhost:8080/api/v1/auth/register', {
          name,
          email,
          password,
          address,
          phone,
          answer
        })
        .then((res) => {
          navigate('/login');
        })
        .catch((err) => console.log(err));
     
    };
  
    const handleName = (e) => {
      let em = e.target.value;
      setName(em);
    };
  
    const handleEmail = (e) => {
      let em = e.target.value;
      setEmail(em);
    };
  
    const handlePassword = (e) => {
      let p = e.target.value;
      setPassword(p);
    };
    const handlePhone = (e) => {
        let ph = e.target.value;
        setPhone(ph);
      };
      const handleAddress = (e) => {
        let add = e.target.value;
        setAddress(add);
      };
      const handleAnswer = (e) => {
        let ans = e.target.value;
        setAnswer(ans);
      };
  
    return (
        <div>
            <Header />
            <div>
                <div className="container body">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-2"></div>
                                <div className="col-md-5 box">
                                    <h4>CREATE AN ACCOUNT</h4>
                                    <form onSubmit={onSubmitAll}>
                                        <input type='text'onChange={handleName} className='inputbox' 
                                        placeholder='NAME'/><br/><br/>
                                        
                                        <input type='email' onChange={handleEmail} 
                                        className='inputbox' placeholder='EMAIL' /><br/><br/>
                                        <input type='password' onChange={handlePassword}
                                         className='inputbox' placeholder='PASSWORD' /><br/><br/>
                                        <input type='text' className='inputbox'
                                         onChange={handlePhone} placeholder='PHONE'  /><br/><br/>
                                        <textarea name="address" className='inputbox' 
                                        onChange={handleAddress} placeholder='ADDRESS' /><br/><br/>
                                        <input type='text' className='inputbox' placeholder='Answer' 
                                        onChange={handleAnswer} /><br/><br/>


                                        <button className='btn btn-danger' style={{marginLeft:'120px'}}>CREATE </button>&nbsp;<a href='Login'style={{textDecoration:'none', color:'black'}}>Signin</a>

                                    </form>
                                </div>
                                <div className="col-md-5"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>

    )
}

export default Register




