import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { HiDotsVertical } from 'react-icons/hi';

function AdminShippers() {
  const [shippers,setShippers]=useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/admin/getShippers');
        setShippers(response.data.data.shippers);
        console.log(response.data.data.shippers);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  const updateStatus = async (shipperID, shipperStatus) => {
    try {
      const response = await axios.patch('/admin/update-shipper-status', {
        shipperID: shipperID,
        shipperStatus: shipperStatus
      });
      
      setShippers(prevShippers =>
        prevShippers.map(shipper =>
          shipper._id === shipperID ? { ...shipper, shipperStatus: shipperStatus } : shipper
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='bg-white m-3 border p-3'>
      <div className='m-3 fw-bold'>Shippers</div>
      <table className='table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Status</th>
            <th></th>
          </tr>          
        </thead>
        <tbody>
          {shippers.map((shipper,idx)=>(
            <tr key={idx}>
              <td>{idx+1}</td>
              <td>{shipper.shipperName}</td>
              <td>{shipper.shipperPhone}</td>
              <td>{shipper.shipperStatus}</td>
              <td>
              <div className="btn-group">
                  <button className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <HiDotsVertical/>
                  </button>
                  <ul className="dropdown-menu">
                      <li><button className="dropdown-item" onClick={() => updateStatus(shipper._id, 'booked')}>Booked</button></li>                                            
                      <li><button className="dropdown-item" onClick={() => updateStatus(shipper._id, 'available')}>Available</button></li>                                        
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

export default AdminShippers