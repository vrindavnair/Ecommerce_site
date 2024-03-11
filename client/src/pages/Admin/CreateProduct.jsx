import React from 'react'
import Layout from '../../../components/layout/Layout'
import AdminMenu from '../../../components/layout/AdminMenu'

const CreateProduct = () => {
  return (
    <div>
        <Layout title={"Dashboard Create Product"}>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu/>
                </div>
                <div className='col-md-9'>
                    <h1>Create Product</h1>
                </div>
            </div>
        </Layout>
    </div>
  )
}

export default CreateProduct