import React  from 'react'
 import Layout from '../../../components/layout/Layout'
import { useAuth } from '../../context/Auth'
 import AdminMenu from '../../../components/layout/AdminMenu'


const AdminDashbord = () => {
  const [auth]=useAuth()

  return (
    <div>
     
    <Layout title={"Admin Dashboard"}>
    <div className='container-fluid m-10 p10'>
      <div className='row'>
        <div className='col-md-3'>
          <AdminMenu/>
        </div>
        <div className='col-md-10' style={{display:"flex"}}>
          <div className='card w-75 p-3 m-7' style={{marginTop:"10px",backgroundColor:'Lavender'}}>
            <h3>Admin Name : {auth?.user?.name}</h3>
            <h3>Admin Email : {auth?.user?.email}</h3>
            <h3>Admin Contact : {auth?.user?.phone}</h3>
          </div>
        </div>
      </div>
</div>
</Layout>
</div>



   
   
  

  )
}

export default AdminDashbord