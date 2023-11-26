import React from 'react'

function OrderDetails({order}) {
  return (
    <div>
        {order==null?null:
        <div>
            <span className='fw-bold fs-4'>Order Summary: </span>
            <div className='col-6 m-2 my-3'>
                <div className='my-2'>                    
                    <div><span className='fw-bold'>Address:</span> {order.Address.address}, {order.Address.city}, {order.Address.country}</div>
                    <div><span className='fw-bold'>Phone:</span> {order.Address.phone}</div>
                </div>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {order.orderItems.map((item, index) => (
                        <tr key={index}>
                        <td>{item.productName}</td>
                        <td>{item.productQuantity}</td>
                        <td>{item.productPrice.toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className='text-end'>
                    <div><span className='fw-bold'>Item total:</span> Rs. {order.itemsPrice.toLocaleString()}</div>
                    <div><span className='fw-bold'>Delivery charges:</span> Rs. 300</div>
                    <div><span className='fw-bold'>Order total:</span> Rs. {order.totalAmount.toLocaleString()}</div>
                </div>
            </div>
        </div>}        
    </div>
  )
}

export default OrderDetails