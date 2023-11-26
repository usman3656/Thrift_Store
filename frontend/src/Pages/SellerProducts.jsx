import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import products from '../utils/products'
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlinePlus } from 'react-icons/ai';

function SellerProducts() {
    const [products, setProducts] = useState([]);
    const sellerID=localStorage.getItem('userID');

    useEffect(() => {
        const fetchProducts = async () => {
        try {
            const response = await axios.get(`/user/get-productbyseller/${sellerID}`);
            setProducts(response.data.product);
        } catch (error) {
            console.log(error);
        }
        };

        fetchProducts();
    }, []);

  return (
    <div className='m-4'>        
        <div className='row'>
            <div className='col-5'>
                <h3 className='fw-bold my-3'> View your products</h3>
                {products.length>0?products.map((product)=>(
                    <div className="card mb-3 products bg-light shadow" key={product._id}>
                        <div className="row g-0">
                            <div className="col-md-4 mt-2">
                                <img src={product.productImage[0]} className="card-img-top img-fluid rounded-start" alt="..."/>
                            </div>
                            <div className="col-md-8">
                            <div className="card-body">
                                <h6 className="card-title fw-bold">
                                    {product.productName}
                                </h6>
                                <div className='d-flex col justify-content-between'>
                                    <div className='row justify-content-center'>
                                        <p className="card-text">{product.productCategory}</p>
                                        <p className='card-text'>Rs. <span className='fw-bold'>{product.productPrice}</span></p>
                                    </div>                                                                     
                                    <Link to={`update-product/${product._id}`} key={product._id}> 
                                        <button className='btn btn-success my-3' >
                                            <AiOutlineEdit size={20} className='me-2'/>
                                            Update 
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                )):<div className='fs-5 text-primary ms-5'>No products in the list. <br></br>Sell your first product!</div>}
            </div>
            <div className='col-6 py-4'>
                <div className='border rounded p-3 text-center bg-success-subtle mt-2'>
                    <h3 className='fw-bold'>Do you want to sell your product?</h3>
                    <Link to='add-product'>
                        <button className='btn btn-success rounded-pill px-4 shadow mt-3'> 
                            <AiOutlinePlus size={20} className='me-2'/>
                            Add product 
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SellerProducts