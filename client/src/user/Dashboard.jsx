import React from 'react'
import Usermenu from '../../components/layout/Usermenu'
import Layout from '../../components/layout/Layout'
import { useAuth } from '../context/Auth'

const Dashboard = () => {
  const [auth]=useAuth()
  return (
    <div>
     <div>
     
     <Layout title={"User Dashboard"}>
     <div className='container-fluid m-10 p10'>
       <div className='row'>
         <div className='col-md-3'>
           <Usermenu/>
         </div>
         <div className='col-md-10' style={{display:"flex"}}>
           <div className='card w-75 p-3 m-7' style={{marginTop:"10px"}}>
             <h3>user Name : {auth?.user?.name}</h3>
             <h3> Email : {auth?.user?.email}</h3>
             <h3> Contact : {auth?.user?.phone}</h3>
           </div>
         </div>
       </div>
           </div>
 </Layout>
 </div>
    </div>
  )
}

export default Dashboard