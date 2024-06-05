import React from 'react';
import Layout from '../../components/layout/Layout';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useCart } from '../context/Cart';
import { useAuth } from '../context/Auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
import axios from 'axios';
import { useState } from 'react';
import { set } from 'mongoose';
import { useEffect } from 'react';

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const [clientToken, setClientToken]=useState('')
  const [instance, setInstance]=useState(null)
  const [loading, setLoading]=useState(false)
  const navigate = useNavigate();

  const removeCart = (id) => {
    const updatedCart = cart.filter(item => item._id !== id);
    setCart(updatedCart);
    setCart(updatedCart)
    localStorage.setItem('cart',JSON.stringify(updatedCart))
    toast.success('Item removed');
  };

 
  const totalPrice = () => {
    try {
      let total = 0;
      cart.forEach(item => {
        total += parseFloat(item.price) || 0;
      });

      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
      return "$0.00";
    }
  };

  const handlePayment=async ()=>{
    setLoading(true)
    try {
      const {nonce} = await instance.requestPaymentMethod();
      const {data}= await axios.post('http://localhost:8080/api/v1/product/braintree/payment',{
      nonce,
      cart,
    })
    setLoading(false);
    setCart([])
    localStorage.removeItem('cart');
    toast.success('payment Successful')
    navigate('/dashboard/user/orders')
    }
   catch (error) {
      console.log(error)
      setLoading(false)
      toast.error('payment failed')
    }

  }

  const getToken= async()=>{
    try {
      const {data}= await axios.get('http://localhost:8080/api/v1/product/braintree/Token')
      setClientToken(data?.clientToken)
      
    } catch (error) {
      console.log(error)
      
    }

    useEffect(()=>{
      getToken();
    },[auth?.token])


  return (
    <Layout title="Cart Page">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1>Cart</h1>
            <h6>Cart length is - {cart.length}</h6>
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <Card style={{ width: '18rem' }} key={index}>
                  <Card.Img variant="top" src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`} />
                  <Card.Body>
                    <Card.Title>Name: {item.name}</Card.Title>
                    <Card.Text>
                      Quantity: {item.quantity}
                    </Card.Text>
                    <Card.Text>
                      Price: {item.price}
                    </Card.Text>
                    <Button variant="danger" onClick={() => removeCart(item._id)}>Remove</Button>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>Your cart is empty</p>
            )}
          </div>
          <div className="col-md-6">
            <h1>Cart Summary</h1>
            <p>Total | CheckOut | Payment</p>
            <p>Total: {totalPrice()}</p>
            {auth?.user?.address ? (
              <div className="mb-3">
                <h4>Current Address</h4>
                <h5>{auth.user.address}</h5>
                <Button variant="outline-primary" onClick={() => navigate('/dashbord/user/profile')}>
                  Update Address
                </Button>
              </div>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <Button variant="outline-warning" onClick={() => navigate('/dashbord/user/profile')}>
                    Update Address
                  </Button>
                ) : (
                  <Button variant="outline-warning" onClick={() => navigate('/login', { state: "/cart" })}>
                    Please login to checkout
                  </Button>
                )}
              </div>
            )}
          </div>
          <div className='mt-2'>
            {clientToken && (
              <>
              <DropIn
              options={{
                authorization:clientToken,
                paypal:{
                  flow:'vault'
                },
              }}
              onInstance={(instance)=>setInstance(instance)}
              />
              <button
              className='"btn btn-primary'
              onClick={handlePayment} disabled={loading || instance || !auth?.user?.address}
            >
              {loading? 'processing...' : 'Make Payment'}
            </button>
            </>
  })
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;





