import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  const user=localStorage.getItem('role');
  return (
    
        user && user==='Admin'?<div className='d-flex'><div className='col-2'><Sidebar/></div>
        <div className='bg-light col-10'>
            {<Outlet/>}
        </div></div>:<div className='text-center my-5 fw-bold fs-1'>Unauthorized</div>       
  )
}

export default AdminLayout