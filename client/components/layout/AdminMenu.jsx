import React from 'react'
import { Link } from 'react-router-dom'

const AdminMenu = () => {
  return (
    <div>
        <div className="text-center">
            <div className="list-group">
                <h1>Admin pannel</h1>
                    <Link to="/dashbord/admin/create-category" className='list-group-item-action'
                     style={{textDecoration:'none',
                     color:'black',
                     marginTop:'30px', 
                     fontWeight:'bold',
                     marginLeft:'10px',
                     backgroundColor:'Plum'}}>
                    CREATE CATEGORY</Link>

                    <Link to="/dashbord/admin/create-product" className='list-group-item-action'
                     style={{textDecoration:'none',
                     color:'black',
                     marginTop:'30px', 
                     fontWeight:'bold',
                     marginLeft:'10px',
                     backgroundColor:'Plum'}}>
                    CREATE PRODUCT</Link>

                    <Link to="/dashbord/admin/products" className='list-group-item-action'
                     style={{textDecoration:'none',
                     color:'black',
                     marginTop:'30px', 
                     fontWeight:'bold',
                     marginLeft:'10px',
                     backgroundColor:'Plum'}}>
                    PRODUCT</Link>

                    <Link to="/dashbord/admin/product/:slug" className='list-group-item-action'
                     style={{textDecoration:'none',
                     color:'black',
                     marginTop:'30px', 
                     fontWeight:'bold',
                     marginLeft:'10px',
                     backgroundColor:'Plum'}}>
                    Update Product</Link>

                    <Link to="/dashbord/admin/users" className='list-group-item-action'
                     style={{textDecoration:'none',
                     color:'black',
                     marginTop:'30px', 
                     fontWeight:'bold',
                     marginLeft:'10px',
                     backgroundColor:'Plum'}}>
                    USERS</Link>
                   
                   

            </div>
        </div>
    </div>
  )
}

export default AdminMenu