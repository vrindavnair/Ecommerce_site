// import React, { useEffect, useState } from 'react'
// import Layout from '../../../components/layout/Layout'
// import AdminMenu from '../../../components/layout/AdminMenu'
// import axios from 'axios'
// import Categoryform from '../../../components/Form/Categoryform'
// import toast from 'react-hot-toast'

// const CreateCategory = () => {


//   const [categories, setCategories] = useState([]);
//   const [name, setName] = useState("")

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       const { response } = await axios.post("http://localhost:8080/api/v1/category/create-category", { name })
//       if (response?.success) {
//         toast.success(`${response.name} is created`)
//         getAllCategory()
//       } else {
//         toast.error(response.message)
//       }

//     } catch (error) {
//       console.log(error)
//       toast.error("something went wrong in input")
//     }
//   }

//   const getAllCategory = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:8080/api/v1/category/get-category")
//       if (data.success) {

//         setCategories(data.category)
//       }
//     } catch (error) {
//       console.log(error);

//     }
//   }
//   useEffect(() => {
//     getAllCategory();
//   }, []);

//   return (

//       <div>
//         <Layout title={"Dashboard Create Category"}>
//           <div className='row'>
//             <div className='col-md-3'>
//               <AdminMenu />
//             </div>
//             <div className='col-md-9'>
//               <h1>Create Category</h1>
//               <div className="p-3">
//                 <Categoryform handleSubmit={handleSubmit} value={name} setvalue={setName} />
//               </div>
//               <div className="table-responsive">
//                 <table>
//                   <thead>
//                     <th>Name</th>
//                     <th>Actions</th>
//                     </thead>
//                     <tbody>
//                       {categories.map(c => (
//                         <tr key={c._id}>
//                           <td>{c.name}</td>
//                           <td>
//                             <button className='btn btn-primary'>Edit</button>
//                           </td>

//                         </tr>
//                       ))}
//                     </tbody>

//                 </table>
//               </div>
//             </div>

//           </div>
//           </Layout>

//       </div>









//   )

// }

// export default CreateCategory

import React, { useState, useEffect } from 'react'


import axios from 'axios';

import toast from 'react-hot-toast'
import AdminMenu from '../../../components/layout/AdminMenu';
import Categoryform from '../../../components/Form/Categoryform';
import Layout from '../../../components/layout/Layout';

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { response } = await axios.post("http://localhost:8080/api/v1/category/create-category", { name })
      if (response?.success) {
        toast.success(`${response.name} is created`);
        getAllCategory();
      } else {
        toast.error(response.message)
      }


    } catch (error) {
      console.log(error)
      toast.error("something went wrong in input")
    }
  };


  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/category/get-category")
      if (data) {
        setCategories(data.category)
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in getting category")
    }
  }
  useEffect(() => {
    getAllCategory();
  }, [])

  return (
    <div>
      <Layout title={"Dashboard Create Category"}>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-3'>
              <AdminMenu />
            </div>

            <div className='col-md-9'>
              <h1>Category</h1>
              <div className='p-3'>
                <Categoryform handleSubmit={handleSubmit} value={name} setValue={setName} />
              </div>

              <div className='table-responsive'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th scope='col'>Name</th>
                      <th scope='col'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      categories.map((item) => {return(
                        <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>
                          <button className='btn btn-primary'>Edit</button>
                        </td>
                      </tr>
                      )}
                      )}
          
                      
                   
                  </tbody>
                </table>

              </div>



            </div>

            
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default CreateCategory


