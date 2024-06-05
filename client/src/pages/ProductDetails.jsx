import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { Button, Card } from 'react-bootstrap';

const ProductDetails = () => {
    const [product, setProduct] = useState({});
    const { slug } = useParams();
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        const getProductDetails = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8080/api/v1/product/get-singleproduct/${slug}`);
                setProduct(data.product);
                getSimilarProduct(data?.product._id, data?.product.category._id);
            } catch (error) {
                console.log(error);
            }
        };

        getProductDetails();
    }, [slug]);

    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(
                `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`
            );
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Layout title={'product details'}>
                {product && (
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <h1>Product Details</h1>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-3'>
                                <img src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`} alt={product.name} />
                            </div>
                            <div className='col-md-9'>
                                <h2>{product.name}</h2>
                                <h2>{product.description}</h2>
                                <h2>{product.price}</h2>
                                <h2>{product?.category?.name}</h2>
                            </div>
                            <Button variant='secondary'>Add to cart</Button>
                        </div>
                        <div className='row'>
                            <h1>Similar products</h1>
                            <div className='col-md-3'>
                                {relatedProducts.length < 1 && (<h3>no similar products</h3>)}
                                {relatedProducts.map((item) => (
                                    <div key={item._id} className='product-card'>
                                        <Card className='custom-card'>
                                            <Card.Img variant="top" src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`} />
                                            <Card.Body className='d-flex justify-content-between'>
                                                <div>
                                                    <Card.Title>{item.name}</Card.Title>
                                                    <Card.Text>{item.description.substring(0, 30)}....... </Card.Text>
                                                    <Card.Text>{item.price}</Card.Text>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </Layout>
        </div>
    )
}

export default ProductDetails;









