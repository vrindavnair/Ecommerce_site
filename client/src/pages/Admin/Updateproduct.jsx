import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../../../components/layout/Layout'
import AdminMenu from '../../../components/layout/AdminMenu'
import toast from 'react-hot-toast'
import {useNavigate, useParams} from 'react-router-dom'
import {Select} from 'antd'


const Updateproduct = () => {

    const[product,setProduct]=useState({})
    const [categories,setCategories]=useState([])
    const [name,setName]=useState('')
    const [description,setDescription]=useState('')
    const [price,setPrice]=useState('')
    const [quantity,setQuantity]=useState('')
    const [category,setCategory]=useState('')
    const [shipping,setShipping]=useState('')
    const [photo,setPhoto]=useState(null)
    const {slug}=useParams()
    const navigate=useNavigate()

   
    const getProduct = async () => {
        try {
          const { data } = await axios.get(`http://localhost:8080/api/v1/product/get-singleproduct/${slug}`)
          if (data.success && data.product) {
            setProduct(data.product)
            setName(data.product.name)
            setDescription(data.product.description)
            setPrice(data.product.price)
            setQuantity(data.product.quantity)
            setCategory(data.product.category._id)
            setShipping(data.product.shipping)
          } else {
            toast.error('Product not found')
          }
        } catch (error) {
          console.log(error)
          toast.error('Error fetching product details')
        }
      }


    const getAllCategory = async () => {
        try {
          const { data } = await axios.get("http://localhost:8080/api/v1/category/get-category");
    
          if (data.success) {
            setCategories(data.categories); 
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong in getting category");
        }
      };


    const handleUpdate=async(e)=>{
        e.preventDefault()
        try{
            const productData=new FormData()
            productData.append('name',name)
            productData.append('description',description)
            productData.append('price',price)
            productData.append('price',price)
            productData.append('quantity',quantity)
            productData.append('category',category)
            productData.append('shipping',shipping)
            if(photo){
                productData.append('photo',photo)
            }
            const {data}=await axios.put(`http://localhost:8080/api/v1/product/product-update/${product._id}`,productData)
            if(data.success){
                toast.success(data.message)
                 navigate('/dashbord/admin/products')
                
            }
        }catch(error){
            console.log(error)
            toast.error('Error updating product')
        }
    }

   

    const handleDelete=async()=>{
        try {
            const {data}=await axios.delete(`http://localhost:8080/api/v1/product/delete/${product._id}`)
            if(data.sucsess){
                toast.success(data.message)
                navigate('/dashbord/admin/products')
            }


            
        } catch (error) {
            console.log(error)
                toast.error('Error deleting product')
            
            
        }
    }
    useEffect(()=>{
        getProduct();
        getAllCategory();
    },[])






  return (
    <div>
        <Layout title="Update product">
            <div className='row'>
                <div className="col-md-3">
                    <AdminMenu/>    
                </div>
                <div className='col-md-9'>
                    <h1>Update Product</h1>
                    <form onSubmit={handleUpdate}>
                        <Select placeholder="Select a category"
                        className='form-select mb-3'
                        onChange={(value)=>setCategory(value)}
                        value={category}>
                            {/* {categories.map((item)=>(
                                <Select.Option key={item._id} value={item._id}>
                                    {item.name}
                                </Select.Option>
                            ))} */}
                             {categories && categories.map((item)=>(
                <Select.Option key={item._id} value={item._id}>
                  {item.name}
                </Select.Option>
              ))}
                        </Select>

                        <div className='mb-3'>
                            <label htmlFor='photo' className='btn btn-outline-secondary'>
                                {photo? photo.name:'upload photo'}
                                <input type='file' id='photo' accept='image/*'
                                onChange={(e)=>setPhoto(e.target.files[0])}
                                hidden/>
                            </label>
                        </div>
                        <input type='text' value={name}
                        placeholder='Enter name'
                        className='form-control mb-3'
                        onChange={(e)=>setName(e.target.value)}/>

                        <textarea value={description}
                        placeholder='Enter description'
                        className='form-control mb-3'
                        onChange={(e)=>setDescription(e.target.value)}/>

 
                        <input type='text' value={quantity}
                        placeholder='Enter quantity'
                        className='form-control mb-3'
                        onChange={(e)=>setQuantity(e.target.value)}/>

                       <input type='text' value={price}
                        placeholder='Enter price'
                        className='form-control mb-3'
                        onChange={(e)=>setPrice(e.target.value)}/>

                       <Select placeholder='Select Shipping'
                       className='from-select mb-3'
                       onChange={(value)=>setShipping(value)}
                       value={shipping}>
                        <Select.Option value='0'>No</Select.Option>
                        <Select.Option value='1'>yes</Select.Option>

                       </Select>
                       <button type='submit' className='btn btn-primary'>
                        Update Product
                       </button>
                       <button onClick={handleDelete} className='btn btn-danger mt-3'>
                        Delete Product
                       </button>
                    </form>
                </div>
            </div>
        </Layout>
        </div> 
   
  )
}

export default Updateproduct

