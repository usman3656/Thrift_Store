import React, { useEffect, useState } from 'react';
import profile from "../../../profile.jpg";
import {AiOutlinePlus,AiOutlineShopping} from 'react-icons/ai'
import {HiLogin} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import {HiOutlineShoppingBag} from 'react-icons/hi'


function Header({setSearch}) {
    const [searchQuery, setSearchQuery] = useState('');  
    const [isSell, setIsSell] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const userID=localStorage.getItem('userID');

    useEffect(() => {
        const userID = localStorage.getItem('userID');
        const isLoggedIn = !!userID;
    
        setLoggedIn(isLoggedIn);
      }, []);

      const handleSearch = () => {
        setSearch(searchQuery);
      };
   
    const handleClick = () => {
        setIsSell(!isSell);
      }; 

    const logout = () => {
        setLoggedIn(false);
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
    }


  return (
    <div className='header'>
        <nav className="navbar bg-dark" data-bs-theme="dark" >
            <div className="container-fluid d-flex justify-content-start">
                <a className="navbar-brand" href='#'>New2U</a> {/*LOGO image will be added here*/}
                <form className="d-flex offset-1 me-auto" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                    <button className="btn btn-outline-success" type="button" onClick={handleSearch}>Search</button>
                </form>
                <Link to={!loggedIn?'login':isSell?'seller':''}>
                    <button className='btn btn-success rounded-pill me-3 d-flex pe-4' onClick={handleClick}>
                        {isSell?<AiOutlinePlus size={30} className='me-2'/>:<AiOutlineShopping size={30} className='me-2'/>}
                        {isSell?'SELL':'BUY'}                     
                    </button> 
                </Link>  
                <Link to='cart'>
                    {loggedIn && <HiOutlineShoppingBag className='text-success me-4' size={30}/>  }
                </Link>
                
                {loggedIn==true?
                <>
                    <div className='btn-group'>
                        <div className='dropdown-toggle' data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={profile} alt='' width='55' height='55' className='rounded-circle me-2' />                        
                            <span className='pt-3 fs-5 text-success btn'>{localStorage.getItem('firstName')}</span>
                        </div>
                        <ul class="dropdown-menu">
                            <Link to='profile' className=''>
                                <li><a class="dropdown-item" href="#">View Profile</a></li>
                            </Link>
                            <li><button class="dropdown-item" onClick={()=>logout()}>Logout</button></li>
                        </ul>
                    </div>
                </>
                :
                    <Link to={'/login'}>
                        <div className='btn btn-success me-4 px-4 rounded-pill py-2'><HiLogin size={25}/> LOGIN </div>
                    </Link>
                }   

            </div>
        </nav>
    </div>
  )
}

export default Header