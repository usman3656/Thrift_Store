import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import OrderDetails from '../Componenst/OrderDetails';
import {SlActionUndo} from 'react-icons/sl'

function OrdersPage() {
    const id=localStorage.getItem('userID');
    const [pendingOrders, setPendingOrders] = useState([]);
    const [shippedOrders, setShippedOrders] = useState([]);
    const [deliveredOrders, setDeliveredOrders] = useState([]);
    const [selectedOrder,setSelectedOrder]=useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const pendingResponse = await axios.get(`/user/get-order-status/Pending/${id}`);
            const shippedResponse = await axios.get(`/user/get-order-status/Shipped/${id}`);
            const deliveredResponse = await axios.get(`/user/get-order-status/Delivered/${id}`);
    
            setPendingOrders(pendingResponse.data.order);
            setShippedOrders(shippedResponse.data.order);
            setDeliveredOrders(deliveredResponse.data.order);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
      }, []);

      const handleOrderDetails=(order)=>{
        setSelectedOrder(order);
      }

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
    <div>
        {selectedOrder==null?
        <>
            <div>
                <div className='fs-5 fw-bold'>Pending orders</div>
                <div className='border border-primary rounded col-8'>
                <div className='d-flex fw-bold text-primary text-center'>
                    <div className='col-1'>
                        #
                    </div>
                    <div className='col-2'>
                        Order Date
                    </div>
                    <div className='col-2'>
                        Delivery Date
                    </div>
                    <div className='col-2'>
                        Total Amount
                    </div>
                    <div className='col-2'>
                        Payment Type
                    </div>
                    <div className='col-1'>
                        Items
                    </div>
                </div>
                    {pendingOrders.map((order,idx)=>
                    <>
                        <div className='d-flex text-center'>
                            <div className='col-1'>
                                {idx+1}
                            </div>
                            <div className='col-2'>
                                {convertTimestampToDate(order.orderDate)} 
                            </div>
                            <div className='col-2'>
                                {convertTimestampToDate(order.deliveryDate)} 
                            </div>
                            <div className='col-2'>
                                Rs. {order.totalAmount.toLocaleString()}
                            </div>
                            <div className='col-2'>
                                {order.paymentType}
                            </div>
                            <div className='col-1'>
                                {order.orderItems.length}
                            </div>
                            <div className='btn btn-primary ms-3 mb-2 py-0' onClick={()=>handleOrderDetails(order)}>
                                View details
                            </div>
                        </div>
                    </>)}
                </div>
            </div>
            <div>
                <div className='fs-5 fw-bold'>Shipped orders</div>
                <div className='border border-primary rounded col-8'>
                <div className='d-flex fw-bold text-primary text-center'>
                    <div className='col-1'>
                        #
                    </div>
                    <div className='col-2'>
                        Order Date
                    </div>
                    <div className='col-2'>
                        Delivery Date
                    </div>
                    <div className='col-2'>
                        Total Amount
                    </div>
                    <div className='col-2'>
                        Payment Type
                    </div>
                    <div className='col-1'>
                        Items
                    </div>
                </div>
                    {shippedOrders.map((order,idx)=>
                    <>
                        <div className='d-flex text-center'>
                            <div className='col-1'>
                                {idx+1}
                            </div>
                            <div className='col-2'>
                                {convertTimestampToDate(order.orderDate)} 
                            </div>
                            <div className='col-2'>
                                {convertTimestampToDate(order.deliveryDate)} 
                            </div>
                            <div className='col-2'>
                                Rs. {order.totalAmount.toLocaleString()}
                            </div>
                            <div className='col-2'>
                                {order.paymentType}
                            </div>
                            <div className='col-1'>
                                {order.orderItems.length}
                            </div>
                            <div className='btn btn-primary ms-3 mb-2 py-0' onClick={()=>handleOrderDetails(order)}>
                                View details
                            </div>
                        </div>
                    </>)}
                </div>
            </div>
            <div>
                <div className='fs-5 fw-bold'>Delivered orders</div>
                <div className='border border-primary rounded col-8'>
                <div className='d-flex fw-bold text-primary text-center'>
                    <div className='col-1'>
                        #
                    </div>
                    <div className='col-2'>
                        Order Date
                    </div>
                    <div className='col-2'>
                        Delivery Date
                    </div>
                    <div className='col-2'>
                        Total Amount
                    </div>
                    <div className='col-2'>
                        Payment Type
                    </div>
                    <div className='col-1'>
                        Items
                    </div>
                </div>
                    {deliveredOrders.map((order,idx)=>
                    <>
                        <div className='d-flex text-center'>
                            <div className='col-1'>
                                {idx+1}
                            </div>
                            <div className='col-2'>
                                {convertTimestampToDate(order.orderDate)} 
                            </div>
                            <div className='col-2'>
                                {convertTimestampToDate(order.deliveryDate)} 
                            </div>
                            <div className='col-2'>
                                Rs. {order.totalAmount.toLocaleString()}
                            </div>
                            <div className='col-2'>
                                {order.paymentType}
                            </div>
                            <div className='col-1'>
                                {order.orderItems.length}
                            </div>
                            <div className='btn btn-primary ms-3 mb-2 py-0' onClick={()=>handleOrderDetails(order)}>
                                View details
                            </div>
                        </div>
                    </>)}
                </div>
            </div>
        </>
        :
        <>
            <OrderDetails order={selectedOrder}/>
            <button className='btn btn-primary offset-5' onClick={()=>handleOrderDetails(null)}><SlActionUndo size={20} className='me-3'/> Return</button>
        </>}
        
        
    </div>
  )
}

export default OrdersPage