import React, { useState, useEffect } from 'react'
import Layout from './Layout';
import AdminMenu from './AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([])


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
        getAllProduct();
    }, []);
    return (
        <div>
            <Layout title={'dashbordcreateProduct'}>
                <div className='container-fluid' >
                    <div className='row'>
                        <div className='col-md-3'>
                            <AdminMenu />
                        </div>
                        <div className='col-md-9'>
                            <h1>Products</h1>
                            {
                                products.map((item)=>(
                                    <Link 
                                    key={item._id} to={`/dashbord/admin/product/${item.slug}`} className='product'>
                                    
                                    <Card  key={item._id} style={{width:'20rem',margin:'20px',display:'inline-block'}} >
                                    <Card.Img variant="top" 
                                    src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`} alt= {item.photo}/>
                                    <Card.Body>
                                      <Card.Title>{item.name}</Card.Title>

                                      <Card.Title>Description: {item.description}</Card.Title>
                                      <Card.Text>
                                      Price:  {item.price}
                                      </Card.Text>
                                      <Card.Text>
                                      Quantity: {item.quantity}
                                      </Card.Text>
                                      <Button variant="primary">Edit</Button>
                                    </Card.Body>
                                  </Card>
                                  </Link>
                              

                                ))
                            }

                           

                            

                        </div>
                    </div>
                </div>
            </Layout >

        </div>

    
    )
}

export default Products

