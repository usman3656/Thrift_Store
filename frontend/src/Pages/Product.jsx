import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
// import products from '../utils/products'
import { CartContext } from '../context/CartContext';
import axios from 'axios';

function Product() {
    const { addItemToCart } = useContext(CartContext);    
    const { id } = useParams();   
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
        try {
            const response = await axios.get(`/user/get-products/${id}`);
            setProduct(response.data.product);
        } catch (error) {
            console.log('Error fetching product:', error);
        }
        };
        fetchProduct();
    }, [id]);

    const addProductToCart = () => addItemToCart(product);
    
    if (!product) {
        return <div>Product not found</div>;
        }

  return (
    <div className='d-flex gap-5 justify-content-center align-items-center'>
        <div id="carouselIndicators" className="carousel slide col-4">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>                
            </div>
            <div className="carousel-inner">                
                {product.productImage.map((image, index)=>(
                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                        <img src={image} className="d-block w-100 carousel-img" alt={product.productImage[0]}/>
                    </div>
                ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
        <div className='row d-flex align-self-center col-4'>
            <h4 className='fw-bold'>{product.productName}</h4>       
            <h5>{product.productCategory}</h5>     
            <p className='text-secondary'>{product.productDescription}</p>
            <div className='col d-flex mt-4'>
                <h5 className='col-6'>Rs. <span className='fw-bold'>{product.productPrice}</span></h5>
                <button className='btn btn-success col-4 offset-2' onClick={addProductToCart}>Add to cart</button>
            </div>
        </div>
    </div>
  )
}

export default Product;