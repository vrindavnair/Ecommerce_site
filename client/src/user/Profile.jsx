import React from 'react'
import Layout from '../../components/layout/Layout'
import Usermenu from '../../components/layout/Usermenu'


const Profile = () => {
  return (
    <div>
         <Layout title={"Dashboard Create Product"}>
          
            <div className='row'>
                <div className='col-md-3'>
                   <Usermenu/>
                </div>
                <div className='col-md-9'>
                    <h1>profile</h1>
                </div>
            </div>
        </Layout>
    </div>
  )
}

export default Profile