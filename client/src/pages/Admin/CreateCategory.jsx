import React from 'react'
import Layout from '../../../components/layout/Layout'
import AdminMenu from '../../../components/layout/AdminMenu'

const CreateCategory = () => {
  return (
    <div>
         <div>
        <Layout title={"Dashboard Create Category"}>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu/>
                </div>
                <div className='col-md-9'>
                    <h1>Create Category</h1>
                </div>
            </div>
        </Layout>
    </div>
    </div>
  )
}

export default CreateCategory
