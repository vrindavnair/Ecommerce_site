import { Layout } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

const CategoryProducts = () => {
  const [categories,setCategories]=useState({})
  const [products, setProducts]=useState([])
  const params=useParams()
  const navigate=useNavigate()


  const getCategoryProducts= async()=>{
    try {
      const {data}= await axios.get(`http://localhost:8080/api/v1/product/product-category/${params.slug}`)
      setProducts(data?.products)
      setCategories(data?.categories)
      
    } catch (error) {
      console.log(error)
      
    }
  }
  useEffect(()=>{
    getCategoryProducts()
  },[params.slug])

  return (
    <div>
      <Layout>
        <div className='conatiner'>
          <h1>category -{categories?.name}</h1>
          <h1>{products?.length}Result not found</h1>
          <div className='row'>
            <div className='d-flex flex-warp'>
              
              {
                products.map((item)=>(
                  <Card style={{width:'18rem'}}>
                  <Card.Img variant="top" src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      {item.description.substring(0,30)}.....
                    </Card.Text>
                    <Card.Text>{item.price}</Card.Text>

                  </Card.Body>
                  <Button variant='primary'>Add to cart</Button>
                  <Button variant="primary" onClick={() => navigate(`/productdetails/${item.slug}`)}>More Details</Button>
                  


                  </Card>
                ))
              }
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default CategoryProducts


