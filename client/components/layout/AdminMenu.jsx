import React from 'react'
import { Link } from 'react-router-dom'

const AdminMenu = () => {
  return (
    <div>
        <div className="text-center">
            <div className="list-group">
                <h1>Admin pannel</h1>
                    <Link to="/dashbord/admin/create-category" className='list-group-item-action'>
                    Create Category</Link>

                    <Link to="/dashbord/admin/create-product" className='list-group-item-action'>
                    Create Product</Link>

                    <Link to="/dashbord/admin/users" className='list-group-item-action'>
                    Users</Link>
                   
                   

            </div>
        </div>
    </div>
  )
}

export default AdminMenu