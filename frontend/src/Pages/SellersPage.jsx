import {React,useState} from 'react';
import axios from 'axios';
import img from '../utils/samsung1.jpg';
import img2 from '../utils/samsung2.jpg'
axios.defaults.baseURL = 'http://localhost:3000';

function SellersPage() {
    const [category, setCategory] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productSize, setProductSize] = useState('');

    const [productColor, setProductColor] = useState('');

    const [productDescription, setProductDescription] = useState('');  
    const [images,setImages] = useState([]);

    const handleChange = (event) => {
        setImages(event.target.files);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
      
        const formData = new FormData();

        formData.append('productName', productName);
        formData.append('productDescription', productDescription);
        formData.append('productPrice', productPrice);
        formData.append('productColor', productColor);
        formData.append('productSize', productSize);

        formData.append('productCategory', category);
        formData.append('availableQuantity', '1');
        formData.append('sellerID', localStorage.getItem('userID'));
        formData.append('productStatus', 'Listed');
          console.log(images);
        for (const image of images) {
            formData.append('image', image);
        }
      
        try {
          const response = await axios.post('/user/add-product', formData);
          console.log('Product added successfully:', response.data);
        } catch (error) {
          console.error('Error adding product:', error);
          if (error.response) {
            console.log('Response status:', error.response.status);
            console.log('Response data:', error.response.data);
          } else if (error.request) {
            console.log('Request made but no response received:', error.request);
          } else {
            console.log('Error setting up the request:', error.message);
          }
        }
      };     
      
  return (
    <div className='bg-light border-top border-bottom border-4 border-success'>
        <h4 className='mx-4 mt-4'>Product Information</h4>
        <p className='text-secondary mx-4'>
            (all fields marked with 
            <span className='text-danger'> * </span> 
            are mandatory)
        </p>
            <form className='m-5' onSubmit={handleSubmit}>
                <div className='d-flex mb-2'>
                    <label className='sellerForm-label'>
                        Category: <span className='text-danger'> * </span>
                    </label>
                    <select className="form-select sellerForm-input" aria-label="Default select example" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option selected>Select Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Motors">Motors</option>
                    </select>
                </div>
                <div className='d-flex mb-2'>
                    <label className='sellerForm-label'>
                        Product Name: <span className='text-danger'> * </span>
                    </label>
                    <input className='form-control sellerForm-input' placeholder='Name' id='input1' value={productName} onChange={(e) => setProductName(e.target.value)}></input>
                </div>
                <div className='d-flex mb-2'>
                    <label className='sellerForm-label'>
                        Product Price (in in PKR): <span className='text-danger'> * </span>
                    </label>
                    <span className="input-group-text">Rs.</span>
                    <input className='form-control sellerForm-inputwithText' placeholder='Price' value={productPrice} onChange={(e) => setProductPrice(e.target.value)}></input>
                </div>
                <div className='d-flex mb-2'>
                    <label className='sellerForm-label'>Product Description: </label>
                    <textarea className='form-control sellerForm-input' type='text' rows="5" value={productDescription} onChange={(e) => setProductDescription(e.target.value)}></textarea>
                </div>
                <div className='d-flex mb-2'>
                    <label className='sellerForm-label'>Image: </label>
                    <input className='form-control sellerForm-input' type='file' name='image' id='formFile' onChange={handleChange} multiple ></input>
                </div>
                <div className='d-flex mb-2'>
                    <label className='sellerForm-label'></label>
                </div>
                <div className='d-flex justify-content-end col-5 ms-5 mt-4'>
                    <button type='submit' className='btn btn-success ms-auto px-5' data-bs-toggle="modal" data-bs-target="#exampleModal"> Submit </button>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body text-center">
                                <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">You have successfully added your product for selling!</h1>                        
                                <button type="button" className="btn btn-success mt-3" data-bs-dismiss="modal" onClick={() => window.history.back()}>Continue</button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </form>
        {/* </CloudinaryContext> */}
    </div>
  )
}

export default SellersPage