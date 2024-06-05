
import { Checkbox,Radio } from 'antd'
// import { useAuth } from '../context/Auth'
import Layout from '../../components/layout/Layout';
import axios from 'axios'
import React, { useState,useEffect } from 'react'
import toast from 'react-hot-toast'
import {prices}  from '../../components/Price'
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useCart } from '../context/Cart';


const Home = () => {

  // const [auth, setAuth] = useAuth()
  const [products,setProducts]=useState([])
  const [categories,setCategories]=useState([])
  const [checked,setChecked]=useState([])
  const [radio,setRadio]=useState([])
   const [total, setTotal]=useState(0)
  const [page, setPage]=useState(1)
  const [loading, setLoading]=useState(false)
  const navigate=useNavigate()
  const [cart, setCart]=useCart()


  

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

  const getAllProduct = async () => {
        try {
          const { data } = await axios.get("http://localhost:8080/api/v1/product/get-product");
    
          if (data) {
            setProducts(data.products); // Corrected property name
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong in getting product");
        }
      };
    
      useEffect(() => {
        getAllCategory();
        getTotal();
      }, []);



  const handleFilter=(value,id)=>{
    let all=[...checked];
    if(value){
      all.push(id)
    }else{
      all=all.filter(item=>item !== id)
    }
    setChecked(all)
  }

  useEffect(() => {
    if(!checked.length || !radio.length) getAllProduct();

  }, [checked.length, radio.length]);

  useEffect(() => {
    if(checked.length || radio.length) filterProduct();
  }, [checked,radio])

  const filterProduct= async() =>{
    try {
      const {data}= await axios.post("http://localhost:8080/api/v1/product/product-filter",{
        checked,
        radio
      })
      setProducts(data?.products)
      
    } catch (error) {
      console.log(error)
      
    }
  }




  const getTotal =async()=>{
    try {
      const {data}= await axios.get("http://localhost:8080/api/v1/product/product-count");
      setTotal(data?.total)
      
    } catch (error) {
      console.log(error)
      
    }
  }


  return (
    <div>
      <Layout title={"Best Offers"}>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-3'>
              <h4>Filtered By Category</h4>
              {

              categories.map((item) => (
                <Checkbox 
                key={item._id}
                onChange={(e)=>handleFilter(e.target.checked, item._id)}
                >
                  {item.name}
                </Checkbox>
              )) 
              }

              <h4>Filter by price</h4>
              <div className='d-flex flex-column'>
                <Checkbox onChange={ (e)=> setRadio(e.target.value)}>
                  {
                    prices.map(price => (
                      <div key={price._id}>
                        <Radio value={price.array}>
                          {price.name}
                        </Radio>
                      </div>
                    ))
                  
                  }
                </Checkbox>

              </div>
            </div>
            <div className='col-md-9'>
              {JSON.stringify(radio,null,4)}
              {JSON.stringify(checked,null,4)}
           

            <h2>All Products</h2>
            <div style={{display:'grid',gridTemplateColumns:"repeat(auto-fill, minmax(18rem, 1fr))",gap:"16px"}}>
                         {
                          products.map((item) => (
                            // <Link
                            <div  key={item._id} to={`/dashbord/admin/product/${item.slug}`} className='product'>

                              <Card key={item._id} style={{ width: '20rem', margin: '10px', display: 'inline-block' }} >
                                <Card.Img variant="top"
                                  src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`} alt={item.photo} />
                                <Card.Body>
                                  <Card.Title>{item.name}</Card.Title>

                                  <Card.Title>Description: {item.description}</Card.Title>
                                  <Card.Text>
                                    Price:  {item.price}
                                  </Card.Text>
                                  <Card.Text>
                                    Quantity: {item.quantity}
                                  </Card.Text>
                                  <Button variant="primary" onClick={() => navigate(`/productdetails/${item.slug}`)}>More Details</Button>

                                  <Button variant='danger' onClick={()=>{setCart([...cart, item])}}>Add to Cart</Button>
                                </Card.Body>
                              </Card>
                            {/* </Link> */}
                            </div>


                          ))
                        }



            </div>

            <div className='m-2 p-3'>
              {products && products.length < total && (
                <Button className='btn btn-danger' 
                onClick={(e)=>{
                  e.preventDefault()
                  setPage(page+1)
                }}>
                  {loading ? "Loading...":"Loadmore"}
                </Button>
              )}
            </div>

            <div className='btn'>

            <Button  variant="primary" >{total}</Button>
            </div>


          </div>
        </div>
        </div>
      </Layout>



    </div>
  )
}

export default Home





































