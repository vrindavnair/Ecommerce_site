import React from 'react'
import Layout from '../../components/layout/Layout'
import { MdEmail } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa";
const Contact = () => {
  return (
    <div>
        <Layout>
          <div className="container">
            <div className="row">
              <div className="col-md-12" style={{height:'500px'}}>
                <div className="row">
                  <div className="col-md-6">
                    <img src='contactus.jpeg' className='img-fluid'/>
                  </div>
                  <div className="col-md-6">
                  <div className="box" style={{width:'300px',height:'50px', backgroundColor:'rgb(17, 17, 18)'}}>
                    <h4 style={{color:'white',fontWeight:'bold', marginLeft:'50px', marginTop:'50px', fontSize:'35px'}}>CONTACT US</h4>
                     </div>
                <p>Any query and info about product feel free to call anytime we 24x7 available</p>
                <MdEmail/>&nbsp;:&nbsp;vstore@gmail.com<br/>
                <FaPhoneVolume />&nbsp;:&nbsp;012-345765<br/>
                <FaHeadphones />&nbsp;:&nbsp;1800-0000-0000(toll free)<br/>


                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
    </div>
  )
}

export default Contact