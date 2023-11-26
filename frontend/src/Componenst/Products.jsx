import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Products({categ,search}) {  
  const [products, setProducts] = useState([]);  
  console.log(search);

  useEffect(() => {
    const fetchData = async () => {
      try {        
        let response;
        if (search) {
          console.log('here');
          response = await axios.get(`user/search?query=${search}`);
        } else if (categ) {
          response = await axios.get(`/user/get-productbycateg/${categ}`);
        } else {
          response = await axios.get(`/user/get-products`);
        }
        setProducts(response.data.product);
      } catch (error) {
        console.log('Error fetching products:', error);
      }
    };
    fetchData();
  }, [categ,search]);

  return (
    <div className='my-4'>
        <span className='fw-bold m-2'>{categ?categ.toUpperCase():'ALL CATEGORIES'}</span>
        <br/>
         {products.map((product)=>(
        <Link to={`/product/${product._id}`} key={product._id}>
            <button className='btn mt-2' >
                <div className="card shadow">
                    <img src={product.productImage[0]} className="card-img-top img-fluid" alt="..." style={{ width: '210px', height: '210px' }}/>            
                    <h5 className="card-title ">{product.productName}</h5>
                    <div className="card-body d-flex justify-content-between">
                        <p className='text-primary'>Rs. <span className='fw-bold'>{product.productPrice}</span></p>
                        {/* <button className='btn btn-success'>Add to cart</button>*/} 
                    </div>
                </div>
            </button>
        </Link>
      ))} 
              
    </div>
  )
}

export default Products