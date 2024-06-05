import React, { useState, useEffect } from 'react'
import Layout from '../../../components/layout/Layout'
import AdminMenu from '../../../components/layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Select } from 'antd'
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom'



const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("")
  const [photo, setPhoto] = useState('');
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState(" ")
  const [shipping, setShipping] = useState(" ")
  const [category, setCategory] = useState(" ")
  const navigate=useNavigate()


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

  const handleCreate =async(e)=>{
    e.preventDefault()
    try{
      const productData=new FormData()
      productData.append("name",name)
      productData.append("description",description)
      productData.append("price",price)
      productData.append("quantity",quantity)
      productData.append("photo",photo)
      productData.append("category",category)

      const {data}=await axios.post(`http://localhost:8080/api/v1/product/create-product`,
      productData
      )
      if(data?.success){
        toast.success(data?.message)
      }else{
        toast.success("producted created sucessfully")
        navigate("/dashbord/admin/products")
      }
    

    }catch (error){
      console.log(error)
      toast.error("Something went wrong in getting category");
    }
  }





  return (
    <div>
      <Layout title={"Dashbord create product"}>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9' style={{ backgroundColor: '#E8F8F5' }}>
            <h1>create product</h1>


            <div className='m-1 w-75'>
              
              <Select
                placeholder='select a category' className='form-select mb-3'
                onChange={(value) => { setCategory(value) }}>
                {
                  categories?.map((item) => (
                    <Option key={item._id} value={item._id}>
                      {item.name}
                    </Option>
                  ))
                }


              </Select>
              <div className='mb-9'>
                <label className='btn btn-outline-secondary'>
                  {photo ? photo.name : "upload photo"}
                  <input type='file' name='photo'
                    accept='image/*'
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden />
                </label>
              </div>
              <div className='mb-8'>
                {photo && (
                  <div className='text-center'>
                    <img src={URL.createObjectURL(photo)}
                      alt='productphoto'
                      height={"200px"}
                      className='img img-responsive' />
                  </div>
                )}

              </div>
              <form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control value={name}  onChange={(e) => setName(e.target.value)}
                 />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                 value={description} 
                  onChange={(e) => setDescription(e.target.value)}  />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control value={price}  
                onChange={(e) => setPrice(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control value={quantity} 
                 onChange={(e) => setQuantity(e.target.value)} />
              </Form.Group>
              <div className='mb-3'>
              <label>Select Shipping</label>
              <Select placeholder="shipping"
                 className='form-select mb-3' value={shipping} onChange={(value)=>{
                  setShipping(value)
                 }}>
                  <Option value="0">No</Option>
                  <Option value="1">yes</Option>

              </Select>
              </div>
              <button className='btn btn-success' 
              onClick={handleCreate}>CREATE PRODUCT</button>
                
              </form>

            </div>

          </div>
        </div>

      </Layout>
    </div>
  )
}

export default CreateProduct


