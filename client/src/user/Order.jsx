// import React, { useState } from 'react'
// import Layout from '../../components/layout/Layout'
// import Usermenu from '../../components/layout/Usermenu'

// const Order = () => {
//   const [orders,setOrders]=useState([])

//   const getAllOrders = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:8080/api/v1/order");

//       if (data.success) {
//         setOrders(data.orders);
//       }
//     } catch (error) {
//       console.log(error);
   
//     }
//   };

//   useEffect(() => {

//     getAllOrders();
//   }, [])


//   return (
//     <div> <div>
//     <Layout title={"Dashboard Create Product"}>
     
//        <div className='row'>
//            <div className='col-md-3'>
//               <Usermenu/>
//            </div>
//            <div className='col-md-9'>
//                <h1>order</h1>
               
//            </div>
//        </div>
//        </Layout>
// </div></div>
//   )
// }

// export default Order

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/layout/Layout';
import Usermenu from '../../components/layout/Usermenu';

const Order = () => {
  const [orders, setOrders] = useState([]);

  const getAllOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/order");

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <Layout title={"Dashboard Create Product"}>
      <div className='row'>
        <div className='col-md-3'>
          <Usermenu />
        </div>
        <div className='col-md-9'>
          <h1>Orders</h1>
          <div>
            {orders.length > 0 ? (
              <ul>
                {orders.map((order) => (
                  <li key={order.id}>{JSON.stringify(order)}</li>
                ))}
              </ul>
            ) : (
              <p>No orders available.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;

