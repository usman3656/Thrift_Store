import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {HiDotsVertical} from 'react-icons/hi'

function AdminOrders() {
  const [orders,setOrders]=useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/admin/get-orders');
        setOrders(response.data.data.orders);
        console.log(response.data.data.orders);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const updateOrderStatus = async (orderID, newStatus) => {
    try {
      await axios.patch('/admin/update-order-status', {
        orderID: orderID,
        orderStatus: newStatus
      });
      // Assuming the API call is successful, you can update the order status in the state
      setOrders(prevOrders => {
        return prevOrders.map(order => {
          if (order._id === orderID) {
            return { ...order, orderStatus: newStatus };
          }
          return order;
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  function convertTimestampToDate(timestamp) {
    const date = new Date(timestamp);
  
    // Extracting the date components
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based, so we add 1
    const day = date.getDate();
  
    // Creating the date string in the desired format (e.g., "MM/DD/YYYY")
    const dateString = `${month}/${day}/${year}`;
  
    return dateString;
  }

  return (
    <div className='bg-white m-3 border p-3'>
      <div className='m-3 fw-bold'>Orders</div>
      <table className='table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Order Date</th>
            <th>Delivery Date</th>
            <th>Order Status</th>
            <th>Items</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Total Amount</th>
            <th> </th>
          </tr>          
        </thead>
        <tbody>
          {orders.map((order,idx)=>(
            <tr key={idx}>
              <td>{idx+1}</td>
              <td>{convertTimestampToDate(order.orderDate)}</td>
              <td>{convertTimestampToDate(order.deliveryDate)}</td>
              <td>{order.orderStatus}</td>
              <td>{order.orderItems.length}</td>
              <td>{order.Address.address}, {order.Address.city}</td>
              <td>{order.Address.phone}</td>
              <td>Rs. {order.totalAmount.toLocaleString()}</td>
              <td>
                <div className="btn-group">
                  <button className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <HiDotsVertical/>
                  </button>
                  <ul className="dropdown-menu">
                      <li><button className="dropdown-item" onClick={() => updateOrderStatus(order._id, 'Pending')}>Pending</button></li>                                            
                      <li><button className="dropdown-item" onClick={() => updateOrderStatus(order._id, 'Shipped')}>Shipped</button></li>                                        
                      <li><button className="dropdown-item" onClick={() => updateOrderStatus(order._id, 'Delivered')}>Delivered</button></li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminOrders