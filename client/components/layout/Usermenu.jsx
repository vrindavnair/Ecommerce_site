import React from 'react'
import { Link } from 'react-router-dom'

const Usermenu = () => {
  return (
    <div>
         <div>
        <div className="text-center">
            <div className="list-group">
                <h1>user pannel</h1>
                    <Link to="/dashbord/user/profile" className='list-group-item-action'>
                    profile</Link>

                    <Link to="/dashbord/user/order" className='list-group-item-action'>
                  order</Link>

                   
              

            </div>
        </div>
    </div>
    </div>
  )
}

export default Usermenu