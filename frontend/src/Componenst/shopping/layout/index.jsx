import React, { useState } from 'react'
import Header from './header'
import { Outlet } from 'react-router-dom'

function Layout({setSearch}) {
  const handleSearch = (query) => {
    setSearch(query);
  };

  return (
    <div>
        <Header setSearch={setSearch}/>    
        <div className='m-4'>
          <Outlet/>
        </div>    
    </div>
    
  )
}

export default Layout