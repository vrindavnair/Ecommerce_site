import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import { Button } from 'react-bootstrap';
import axios from 'axios';
import {Link}  from 'react-router-dom';


const AllCategories = () => {
    const [categories, setCategories] = useState([])

    const getAllCategory = async () => {
        try {
          const { data } = await axios.get("http://localhost:8080/api/v1/category/get-category");
    
          if (data.success) {
            setCategories(data.categories);
          }
        } catch (error) {
          console.log(error);
       
        }
      };
    
      useEffect(() => {
    
        getAllCategory();
      }, [])
    
  
  return (

    <Layout title={"Category list"}>
    <div className="container">
       
                {
                categories.map((item) => (
                    <div key={item._id}>
                      <Link to={`/categories/${item.slug}`}><Button>{item.name}</Button></Link>
                    </div>
                ))}
            
        
    </div>
</Layout>
  )
}

export default AllCategories