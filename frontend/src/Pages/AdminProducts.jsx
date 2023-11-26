import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HiTrash } from 'react-icons/hi';

function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get('/user/get-products');
      setProducts(response.data.product);
      console.log(response.data.product);
    } catch (error) {
      console.log(error);
    }
  };
  fetchProducts();
}, []);

  const deleteProduct = async (productId) => {
    try {
      await axios.delete('/user/delete-product', {
        data: {
          productId: productId
        }
      });
      // Assuming the API call is successful, you can update the products list in the state
      setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='bg-white m-3 border p-3'>
      <div className='m-3 fw-bold'>Products</div>
      <div>
        {products.map((product,idx)=>(
          <div className='d-flex gap-3'>
            <div className='col-1'><img src={product.productImage[0]} alt={product.productName} style={{ width: '40px', height: '40px' }}></img></div>
            <div className='col-3'>{product.productName}</div>
            <div className='col-3'>Rs. {product.productPrice.toLocaleString()}</div>
            <div className='col-2'>{product.productCategory}</div>
            <div className='col-1'>{product.productStatus}</div>
            <div className='col-1'><button className='btn' onClick={() => deleteProduct(product._id)}><HiTrash size={20} className='text-danger'/></button></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminProducts