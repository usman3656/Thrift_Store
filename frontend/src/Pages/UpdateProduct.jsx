import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function UpdateProduct() {
    const { id } = useParams();
    const [product,setProduct]=useState(null);   
    const [formData, setFormData] = useState({
        productCategory: '',
        productName: '',
        productPrice: '',
        productDescription: '',
        image: '',
      });

    
    useEffect(() => {
        const fetchProduct = async () => {
        try {
            const response = await axios.get(`/user/get-products/${id}`); 
            const productData = response.data.product;
            setProduct(productData);
            setFormData({
                productCategory: productData.productCategory,
                productName: productData.productName,
                productPrice: productData.productPrice,
                productDescription: productData.productDescription,
                image: productData.image,
              });
        } catch (error) {
            console.log('Error fetching product:', error);
        }
        };
        fetchProduct();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const { productCategory, productName, productPrice, productDescription, image} = formData;
          const updatedProduct = await axios.patch(`user/update-product`, {
            productID: id,
            productName: productName,
            productDescription: productDescription,
            productPrice: productPrice,
            productImage: image,
            productCategory: productCategory,
            availableQuantity: product.availableQuantity,
          });
          console.log('Product updated:', updatedProduct);
        //   history.push('/products');
        } catch (error) {
          console.log('Error updating product:', error);
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
                <label htmlFor='select1' className='sellerForm-label'>productCategory: <span className='text-danger'> * </span></label>
                <select className="form-select sellerForm-input" aria-label="Default select example" id='select1' value={formData.productCategory} name='productCategory' onChange={handleInputChange}>
                    <option selected>Select productCategory</option>
                    <option value="Electronics">Electronics</option>
                    <option value="CLothing">Clothing</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Motors">Motors</option>
                </select>
            </div>
            <div className='d-flex mb-2'>
                <label htmlFor='input1' className='sellerForm-label'>Product Name: <span className='text-danger'> * </span></label>
                <input className='form-control sellerForm-input' placeholder='Name' id='input1' name='productName' value={formData.productName} onChange={handleInputChange}></input>
            </div>
            <div className='d-flex mb-2'>
                <label className='sellerForm-label'>Product productPrice: <span className='text-danger'> * </span></label>
                <span className="input-group-text">Rs.</span>
                <input className='form-control sellerForm-inputwithText' placeholder='productPrice' name='productPrice' value={formData.productPrice} onChange={handleInputChange}></input>
            </div>
            <div className='d-flex mb-2'>
                <label className='sellerForm-label'>Product productDescription: </label>
                <textarea className='form-control sellerForm-input' type='text' rows="5" name='productDescription' value={formData.productDescription} onChange={handleInputChange}></textarea>
            </div>
            <div className='d-flex mb-2'>
                <label className='sellerForm-label'>Image: </label>
                <input className='form-control sellerForm-input' type='file' multiple name='image'></input>
            </div>            
            <div className='d-flex justify-content-end col-5 ms-5 mt-4'>
                <button type='submit' className='btn btn-success ms-auto px-5' data-bs-toggle="modal" data-bs-target="#exampleModal"> Update </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body text-center">
                            <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">You have successfully updated your product htmlFor selling!</h1>                        
                            <button type="button" className="btn btn-success mt-3" data-bs-dismiss="modal" onClick={() => window.history.back()}>Continue</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </form>
    </div>
  )
}

export default UpdateProduct