import classNames from 'classnames';
import React from 'react'
import {FcComboChart} from 'react-icons/fc';
import {FiLogOut} from 'react-icons/fi'
import { HiOutlineLogout } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import {HiOutlineViewGrid,HiOutlineCube,HiOutlineShoppingCart,HiOutlineUsers,HiOutlineDocumentText} from 'react-icons/hi'

const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/admin',
		icon: <HiOutlineViewGrid /> 
	},
	{
		key: 'products',
		label: 'Products',
		path: '/admin/products',
		icon: <HiOutlineCube />
	},
	{
		key: 'orders',
		label: 'Orders',
		path: '/admin/orders',
		icon: <HiOutlineShoppingCart />
	},
	{
		key: 'users',
		label: 'Users',
		path: '/admin/users',
		icon: <HiOutlineUsers />
	},
	{
		key:'shippers',
		label: 'Shippers',
		path:'/admin/shippers',
		icon: <HiOutlineUsers />
	}
	
]

const linkClasses ='px-3 w-100 mx-auto fs-5 py-2';

export default function Sidebar() {
	const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
        localStorage.removeItem('username');
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('phone');
        localStorage.removeItem('address');
        localStorage.removeItem('city');
        localStorage.removeItem('country');
        localStorage.removeItem('role');  
		window.location.href='/login'
    }
  return (
    <div className='bg-dark-side vh-100 ' style={{position: 'fixed'}}>
        <div className='d-flex gap-3 justify-content-center py-3'>
            <FcComboChart fontSize={35}/>
            <span className='text-white text-lg fs-5'> ADMIN PORTAL</span>
        </div>        
        <div className='mt-4'>
          {DASHBOARD_SIDEBAR_LINKS.map((item) => (
            <div className='my-3 text-center'>
              <SidebarLink key={item.key} item={item} />
            </div>
          ))}
        </div>
		<div className=' ms-4 mb-3 mt-5 pt-5 fixed-bottom'>
			<div className='text-danger fw-bold btn' onClick={logout}><FiLogOut/> Logout</div>
		</div>
    </div>
  )
}

function SidebarLink( {item }) {
  const {pathname}=useLocation()
  return (
    <Link to={item.path} className={classNames(pathname === item.path ? 'bg-light text-white ':'text-secondary',linkClasses)}>
      <span className=''>{item.icon}</span>
      {item.label}
    </Link>
  )
}
