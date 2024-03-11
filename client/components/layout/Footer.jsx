import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import './Footer.css'
import { Link } from 'react-router-dom'
// import { FaFacebook } from "react-icons/fa";
// import { FaInstagramSquare } from "react-icons/fa";
// import { FaTwitter } from "react-icons/fa";
// import { FaYoutube } from "react-icons/fa";
// import { FaPhoneAlt } from "react-icons/fa";
// import { CiMail } from "react-icons/ci";
// import { FaMapMarkerAlt } from "react-icons/fa";
// import { FaCcVisa } from "react-icons/fa";
// import { CgPaypal } from "react-icons/cg";
// import { SiPaytm } from "react-icons/si";
// import { SiGooglepay } from "react-icons/si";
// import { SiAmazonpay } from "react-icons/si";

const Footer = () => {
  return (
    <div>
       <div className="container">
                <div className="row">
                    <div className="col-md-12" id='backgroundcolor'>
                        <div className="footer" >
                            <div className="row">
                                <div className="col-md-4" >
                                    {/* <h1 id='logo'>VStore</h1> */}
                                   
                                    <div className="main">
                                        {/* <div className="icons">
                                            <FaFacebook style={{ color: '3B5999', fontSize: '30px' }} />
                                        </div>
                                        <div className="icons">
                                            <FaInstagramSquare style={{ color: 'E4405F',fontSize: '30px' }} />
                                        </div>
                                        <div className="icons">
                                            <FaTwitter style={{ color: '55ACEE',fontSize: '30px' }} />
                                        </div>
                                        <div className="icons">
                                            <FaYoutube style={{ color: 'red',fontSize: '30px' }} />
                                        </div> */}
                                    </div>

                                </div>
                               <div className="col-md-4">

                                    <div className="headtitle">
                                       
                                          <h4>All Right Reserved 😃😃</h4>
                                          
                                          <Link style={{color:'black'}} to="/about">About |</Link>
                                          <Link  style={{color:'black'}} to="/contact">Contact |</Link>
                                          <Link  style={{color:'black'}} to="/Privacy">privacy |</Link>
                                          <Link   style={{color:'black'}} to="/policy">Policy </Link>



                                           
                                        
                                    </div>

                                </div>

                                <div className="col-md-4">
                                    {/* <h4>Contact</h4> */}
                                    {/* <FaMapMarkerAlt />&nbsp; kottayam,North Arppokara near medical college<br />
                                    <FaPhoneAlt />&nbsp;+91 9867456432<br />
                                    <CiMail />&nbsp;contact@vstore.com<br />
                                    <FaCcVisa style={{ fontSize: '30px' }} />
                                    <CgPaypal style={{ fontSize: '30px' }} />&nbsp;
                                    < SiPaytm style={{ fontSize: '30px' }} />&nbsp;
                                    <SiGooglepay style={{ fontSize: '30px' }} />&nbsp;
                                    <SiAmazonpay style={{ fontSize: '30px' }} /> */}

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

    </div>      
    
  )
}

export default Footer


