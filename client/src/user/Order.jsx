import React from 'react'
import Layout from '../../components/layout/Layout'
import Usermenu from '../../components/layout/Usermenu'

const Order = () => {
  return (
    <div> <div>
    <Layout title={"Dashboard Create Product"}>
     
       <div className='row'>
           <div className='col-md-3'>
              <Usermenu/>
           </div>
           <div className='col-md-9'>
               <h1>order</h1>
           </div>
       </div>
       </Layout>
</div></div>
  )
}

export default Order