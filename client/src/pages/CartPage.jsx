

// import React, { useState, useEffect } from 'react';
// import Layout from '../../components/layout/Layout';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import { useCart } from '../context/Cart';
// import { useAuth } from '../context/Auth';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
// import DropIn from 'braintree-web-drop-in-react';
// import axios from 'axios';

// const CartPage = () => {
//   const [cart, setCart] = useCart();
//   const [auth] = useAuth();
//   const [clientToken, setClientToken] = useState("");
//   const [instance, setInstance] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const removeCart = (id) => {
//     const updatedCart = cart.filter(item => item._id !== id);
//     setCart(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//     toast.success('Item removed');
//   };

//   const totalPrice = () => {
//     try {
//       let total = 0;
//       cart.forEach(item => {
//         total += parseFloat(item.price) || 0;
//       });

//       return total.toLocaleString("en-US", {
//         style: "currency",
//         currency: "USD",
//       });
//     } catch (error) {
//       console.log(error);
//       return "$0.00";
//     }
//   };

//   const handlePayment = async () => {
//     if(!instance){
//       console.error("Braintree instance not available")
//       return;
//     }
    
//     try {
//       const { nonce } = await instance.requestPaymentMethod();
//       const { data } = await axios.post('http://localhost:8080/api/v1/braintree/payment', {
//         nonce,
//         cart,
//       });
//       setLoading(false);
      
//       localStorage.removeItem('cart');
//       setCart([]);
//       navigate('/dashboard/user/orders');
//       toast.success('Payment Successful');

//     } catch (error) {
//       console.error("error processing payment:",error);
//       setLoading(false);
//       toast.error('Payment failed');
//     }
//   };

//   const getToken = async () => {
//     try {
//       const { data } = await axios.get('http://localhost:8080/api/v1/product/braintree/token');
//       setClientToken(data.clientToken);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if(auth?.token){
//     getToken();
//     }
//   }, [auth?.token]);

//   return (
//     <Layout title="Cart Page">
//       <div className="container">
//         <div className="row">
//           <div className="col-md-4">
//             <h1>Cart</h1>
//             <h6>Cart length is - {cart.length}</h6>
//             {cart.length > 0 ? (
//               cart.map((item, index) => (
//                 <Card style={{ width: '18rem' }} key={index}>
//                   <Card.Img variant="top" src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`} />
//                   <Card.Body>
//                     <Card.Title>Name: {item.name}</Card.Title>
//                     <Card.Text>
//                       Quantity: {item.quantity}
//                     </Card.Text>
//                     <Card.Text>
//                       Price: {item.price}
//                     </Card.Text>
//                     <Button variant="danger" onClick={() => removeCart(item._id)}>Remove</Button>
//                   </Card.Body>
//                 </Card>
//               ))
//             ) : (
//               <p>Your cart is empty</p>
//             )}
//           </div>
//           <div className="col-md-4">
//             <h1>Cart Summary</h1>
//             <p>Total | CheckOut | Payment</p>
//             <p>Total: {totalPrice()}</p>
//             {auth?.user?.address ? (
//               <div className="mb-3">
//                 <h4>Current Address</h4>
//                 <h5>{auth.user.address}</h5>
//                 <Button variant="outline-primary" onClick={() => navigate('/dashboard/user/profile')}>
//                   Update Address
//                 </Button>
//               </div>
//             ) : (
//               <div className="mb-3">
//                 {auth?.token ? (
//                   <Button variant="outline-warning" onClick={() => navigate('/dashboard/user/profile')}>
//                     Update Address
//                   </Button>
//                 ) : (
//                   <Button variant="outline-warning" onClick={() => navigate('/login', { state: "/cart" })}>
//                     Please login to checkout
//                   </Button>
//                 )}
//               </div>
//             )}
            
//           </div>
//           <div className="col-md-4">
//           {clientToken && (
//               <div className='mt-2'>
//                 <DropIn
//                   options={{
//                     authorization: clientToken,
//                     paypal: {
//                       flow: 'vault',
//                     },
//                   }}
//                   onInstance={(instance) =>{
//                     console.log("Braintree DropIn instance:",instance)
//                    setInstance(instance)
//                   }}


//                 />
//                 <Button
//                   className='btn btn-primary'
//                   onClick={handlePayment}
//                   disabled={loading || !instance || !auth?.user?.address}
//                 >
//                   {loading ? 'Processing...' : 'Make Payment'}
//                 </Button>
//               </div>
//             )}

//           </div>

//         </div>
//         {/* <div className="row"> */}
         
//         {/* </div> */}
//       </div>
//     </Layout>
//   );
// };

// export default CartPage;




import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useCart } from '../context/Cart';
import { useAuth } from '../context/Auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
import axios from 'axios';

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const removeCart = (id) => {
    const updatedCart = cart.filter(item => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
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

  const handlePayment = async () => {
    if (!instance) {
      console.error("Braintree instance not available");
      return;
    }
    setLoading(true);
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post('http://localhost:8080/api/v1/braintree/payment', {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem('cart');
      setCart([]);
      navigate('/dashboard/user/orders');
      toast.success('Payment Successful');
    } catch (error) {
      console.error("Error processing payment:", error);
      setLoading(false);
      toast.error('Payment failed');
    }
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/product/braintree/token');
      setClientToken(data.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getToken();
    }
  }, [auth?.token]);

  return (
    <Layout title="Cart Page">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h1>Cart</h1>
            <h6>Cart length is - {cart.length}</h6>
            {cart.length > 0 ? (
              cart.map((item, index) => (
                <CartItem key={index} item={item} removeCart={removeCart} />
              ))
            ) : (
              <p>Your cart is empty</p>
            )}
          </div>
          <div className="col-md-4">
            <h1>Cart Summary</h1>
            <p>Total | CheckOut | Payment</p>
            <p>Total: {totalPrice()}</p>
            {auth?.user?.address ? (
              <AddressSection auth={auth} navigate={navigate} />
            ) : (
              <LoginPrompt auth={auth} navigate={navigate} />
            )}
          </div>
          <div className="col-md-4">
            {clientToken && (
              <PaymentSection
                clientToken={clientToken}
                instance={instance}
                setInstance={setInstance}
                handlePayment={handlePayment}
                loading={loading}
                auth={auth}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const CartItem = ({ item, removeCart }) => (
  <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`} />
    <Card.Body>
      <Card.Title>Name: {item.name}</Card.Title>
      <Card.Text>Quantity: {item.quantity}</Card.Text>
      <Card.Text>Price: {item.price}</Card.Text>
      <Button variant="danger" onClick={() => removeCart(item._id)}>Remove</Button>
    </Card.Body>
  </Card>
);

const AddressSection = ({ auth, navigate }) => (
  <div className="mb-3">
    <h4>Current Address</h4>
    <h5>{auth.user.address}</h5>
    <Button variant="outline-primary" onClick={() => navigate('/dashboard/user/profile')}>
      Update Address
    </Button>
  </div>
);

const LoginPrompt = ({ auth, navigate }) => (
  <div className="mb-3">
    {auth?.token ? (
      <Button variant="outline-warning" onClick={() => navigate('/dashboard/user/profile')}>
        Update Address
      </Button>
    ) : (
      <Button variant="outline-warning" onClick={() => navigate('/login', { state: "/cart" })}>
        Please login to checkout
      </Button>
    )}
  </div>
);

const PaymentSection = ({ clientToken, instance, setInstance, handlePayment, loading, auth }) => (
  <div className='mt-2'>
    <DropIn
      options={{
        authorization: clientToken,
        paypal: {
          flow: 'vault',
        },
      }}
      onInstance={(instance) => {
        console.log("Braintree DropIn instance:", instance);
        setInstance(instance);
      }}
    />
    <Button
      className='btn btn-primary'
      onClick={handlePayment}
      disabled={loading || !instance || !auth?.user?.address}
    >
      {loading ? 'Processing...' : 'Make Payment'}
    </Button>
  </div>
);

export default CartPage;


