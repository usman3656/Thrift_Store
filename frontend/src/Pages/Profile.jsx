import React, { useEffect, useState } from 'react';
import ProfileImage from '../profile.jpg';
import { AiOutlineClose } from 'react-icons/ai';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Profile() {
  const id=localStorage.getItem('userID');    
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    role: ''
  });
  const [updatedData, setUpdatedData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    phone: '',
    address: '',
    city: '',
    country: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/user/getProfile/${id}`);
        const userData = response.data.user;

        setData({
          firstName: userData.firstName,
          lastName: userData.lastName,
          username: userData.username,
          phone: userData.phone,
          address: userData.address,
          city: userData.city,
          country: userData.country,
          role: userData.role
        });
        setUpdatedData({
          firstName: userData.firstName,
          lastName: userData.lastName,
          username: userData.username,
          phone: userData.phone,
          address: userData.address,
          city: userData.city,
          country: userData.country
        });
      } catch (error) {
        console.log('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      const requestBody = {
        userID: id,
        username: updatedData.username,
        firstName: updatedData.firstName,
        lastName: updatedData.lastName,
        phone: updatedData.phone,
        address: updatedData.address,
        country: updatedData.country,
        city: updatedData.city
      };

      const response = await axios.patch('/user/update-user-profile', requestBody);
      const updatedUser = response.data.updatedUser;

      setData((prevData) => ({
        ...prevData,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        username: updatedUser.username,
        phone: updatedUser.phone,
        address: updatedUser.address,
        city: updatedUser.city,
        country: updatedUser.country
      }));
      localStorage.setItem('address',updatedData.address);
      localStorage.setItem('firstName',updatedData.firstName);
      localStorage.setItem('lastName',updatedData.lastName);
      localStorage.setItem('username',updatedData.username);
      localStorage.setItem('phone',updatedData.phone);
      localStorage.setItem('city',updatedData.city);
      localStorage.setItem('country',updatedData.country);
    } catch (error) {
      console.log('Error updating profile:', error);
    }
  };  
  
  return (
    <div className='col-8 offset-2'>      
      <div className='bg-light border-top border-success border-4'>
        <h3 className='fw-bold m-3 py-2 text-center'> User Profile: </h3>
        <div className='d-flex text-center'>
          <div className='col-4'>
            <img src={ProfileImage} alt={data.username} className='rounded-circle'/>
            <h4 className='mt-3'>{data.firstName +' '+ data.lastName}</h4>
            <h5 className='text-secondary'>{data.role}</h5>
            <Link to={'/order'}>
              <button className='btn btn-primary mt-4'>View Orders</button>
            </Link>
          </div>
          <div className='col-8 offset-md-1'>
            <div className='d-flex col-8 mt-2'>
              <label className='mx-2 text-end'>FirstName: </label>
              <input className='ms-1 form-control' placeholder={data.firstName} name='firstName' value={updatedData.firstName} onChange={handleInputChange}></input>
            </div>
            <div className='d-flex col-8 mt-2'>
              <label className='mx-2'>LastName: </label>
              <input className='ms-1 form-control' placeholder={data.lastName} name='lastName' value={updatedData.lastName} onChange={handleInputChange}></input>
            </div>
            <div className='d-flex col-8 mt-2'>
              <label className='mx-2'>username: </label>
              <input className='ms-1 form-control' placeholder={data.username} name='username' value={updatedData.username} onChange={handleInputChange}></input>
            </div>
            <div className='d-flex col-8 mt-2'>
              <label className='mx-2 pe-4'>Phone:</label>
              <input className='ms-1 form-control' placeholder={data.phone} name='phone' value={updatedData.phone} onChange={handleInputChange}></input>
            </div>
            <div className='d-flex col-8 mt-2'>
              <label className='mx-2 pe-3'>Address: </label>
              <input className='form-control' placeholder={data.address} name='address' value={updatedData.address} onChange={handleInputChange}></input>
            </div>
            <div className='d-flex col-8 mt-2'>
              <label className='mx-2 pe-5'>City: </label>
              <input className='form-control' placeholder={data.city} name='city' value={updatedData.city} onChange={handleInputChange}></input>
            </div>
            <div className='d-flex col-8 mt-2'>
              <label className='mx-2 pe-3'>Country: </label>
              <input className='form-control' placeholder={data.country} name='country' value={updatedData.country} onChange={handleInputChange}></input>
            </div>
            <div className='d-flex justify-content-end col-6 ms-5 mt-4'>
                <button type='button' className='btn btn-success ms-auto px-5' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleUpdateProfile}> Update </button>                
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body d-flex">                            
                            <h1 className="modal-title fs-5 fw-bold col-11 my-4" id="exampleModalLabel">Profile updated successfully!</h1>                                                    
                            <a href='#' className='text-black col-1 text-end'><AiOutlineClose size={20} data-bs-dismiss="modal"/></a>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            
          </div>
        </div>
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default Profile