import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HiChartPie, HiShoppingCart } from 'react-icons/hi';
import { IoMdContacts } from 'react-icons/io';
import { IoBagHandle } from 'react-icons/io5'

export default function DashboardGrid() {
    const[products,setProducts]=useState(0);
    const[orders,setOrders]=useState(0);
    const[users,setUsers]=useState(0);
    const[soldProds,setSoldProds]=useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await axios.get('/admin/statistics');
            setProducts(response.data.totalProducts);
            setOrders(response.data.totalOrders);
            setSoldProds(response.data.soldProducts);
            setUsers(response.data.totalUsers);
          } catch (error) {
            console.log(error);
          }
        };
        fetchProducts();
      }, []);
  return (
    <div className='d-flex gap-2 w-full m-3'>
        <BoxWrapper>
            <div className=''>
                <IoBagHandle className='text-primary' size={20}></IoBagHandle>
            </div>
            <div className=''>
                <span className=''>
                    Total Products
                </span>
                <div className=''>
                    <strong className=''>{products}</strong>
                </div>
            </div>
        </BoxWrapper>
        <BoxWrapper>
        <div className=''>
                <HiChartPie className='text-warning' size={20}/>
            </div>
            <div className=''>
                <span className=''>
                    Total Sales
                </span>
                <div className=''>
                    <strong className=''>{soldProds}</strong>
                </div>
            </div>
        </BoxWrapper>
        <BoxWrapper>
            <div className=''>
                <IoMdContacts className='text-success' size={20}/>
            </div>
            <div className=''>
                <span className=''>
                    Total Users
                </span>
                <div className=''>
                    <strong className=''>{users}</strong>
                </div>
            </div>
        </BoxWrapper>
        <BoxWrapper>
        <div className=''>
                <HiShoppingCart className='text-danger' size={20}/>
            </div>
            <div className='pl-5'>
                <span className=''>
                    Total Orders
                </span>
                <div className=''>
                    <strong className=''>{orders}</strong>                    
                </div>
            </div>
        </BoxWrapper>
    </div>
  )
}

function BoxWrapper({children}){
    return(
        <div className='bg-white col-3 d-flex gap-3 border rounded p-3'>{children}</div>
    )
}
