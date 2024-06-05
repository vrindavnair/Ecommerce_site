
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminMenu from '../../../components/layout/AdminMenu';
import Categoryform from '../../../components/Form/Categoryform' // Corrected import
import Layout from '../../../components/layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Modal } from 'antd';



const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [upadatedName,setUpdatedName]=useState('')
  const [selected,setSelected]=useState(null)

  const [visible,setVisible]=useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8080/api/v1/category/create-category", { name });
      if (data.success) {
        toast.success(`${data.name} is created`); // Fix interpolation
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input");
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/category/get-category");

      if (data.success) {
        setCategories(data.categories); // Corrected property name
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

const handleDelete=async(categoryId)=>{
  try {
    await axios.delete(`http://localhost:8080/api/v1/category/delete-category/${categoryId}`)
    toast.success("category deleted sucessfully")
    getAllCategory();

    
  } catch (error) {
    console.log(error.message)
    toast.error('something went wrong')
  }

}

const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.put(`http://localhost:8080/api/v1/category/update-category/${selected._id}`,
      { name: upadatedName }
    );
    if (data.success) {
      toast.success(`${upadatedName} is updated`);
      setVisible(false);
      getAllCategory();
    }else{
      toast.error(data.message)
    }
  } catch (error) {
    console.log(error);
    toast.error("something went wrong")
  }
};
  return (
    <div>
      <Layout title={'dashbordcreatecategory'}>
        <div className='container-fluid' >
          <div className='row'>
            <div className='col-md-3'>
              <AdminMenu/>  
            </div>

            <div className='col-md-9' >
              <h1>Category</h1>
              <div className='p-3'>
                <Categoryform handleSubmit={handleSubmit} value={name} setValue={setName}/>

              </div>

              <div className='table-responsive'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th scope='col'>Name</th>
                      <th scope='col'>Action</th>

                    </tr>

                  </thead>
                  <tbody>
                    {
                      categories.map((item)=>(
                        <tr key={item._id}>
                          <td>{item.name}</td>
                          <td>
                            <button className='btn btn-primary' onClick={()=>{setSelected(item); 
                              setUpdatedName(item.name); setVisible(true); }}>Edit</button>

                            <button className='btn btn-danger' onClick={()=>handleDelete(item._id)}>
                              Delete</button>
                            
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
              <Modal onCancel={()=>{setVisible(false); setUpdatedName(""); }} 
              footer={null} visible={visible}>
                <Categoryform value={upadatedName} setValue={setUpdatedName}
                handleSubmit={handleUpdate}/>
              </Modal>

             </div>
          </div>
        </div>

      </Layout>
      </div>      

   );
 };
  
export default CreateCategory;


