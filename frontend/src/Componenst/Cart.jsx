import React from 'react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function Cart() {
    const { cartItems,cartTotal,clearItemFromCart } = useContext(CartContext);
    const clearItemHandler = (cartItem) => clearItemFromCart(cartItem);
  return (
    <div className='d-flex'>
        <div className='offset-1 col-6'>
            <h3 className='fw-bold'>Cart:</h3>
            <div className='bg-light border-top border-bottom border-success border-3 py-2'>
                {cartItems.length ? 
                    (cartItems.map((item) => 
                        <div className='m-2 d-flex' key={item._id}> 
                            <div className='col-8'>
                                <img src={item.productImage[0]} alt={item.productName} className='img-fluid cart-img'/>
                                <span className='mx-3 fw-bold col-7'>{item.productName}</span>
                            </div>
                            <div className='d-flex justify-content-end align-items-center col-2'>
                                <span className='ms-3 fw-bold'>Rs. {item.productPrice}</span>                            
                            </div>
                            <div className='col-2 d-flex justify-content-end align-items-center pe-2'>
                                <a href='#' className='text-black'>
                                    <AiOutlineClose size={22} onClick={()=>clearItemHandler(item)}/>
                                </a>
                            </div>
                        </div>
                    )) 
                : 
                    (<div>Your cart is empty</div>)
                }
            </div>
            <div className='bg-light py-2'>
                <div className='col-5 offset-6'> 
                    <span className='fw-bold mx-4'>Item Total:</span>
                    <span className='mx-4 fw-bold'>Rs. {cartTotal}</span>
                </div>
            </div>
        </div>
        <div className='col-5 mx-5'>
            <h4 className='fw-bold py-1'>Order:</h4>
            <div className='bg-light border-top border-2 border-secondary me-5'>
                <div className='fw-bold m-3'>
                    Items: 
                </div>
                {cartItems.length?
                    <>
                        {(cartItems.map((item)=>
                            <div className='m-2' key={item._id}>                             
                                <div className='d-flex my-3'>
                                    <div className='col-8'>                            
                                        <span className='mx-3 col-7'>{item.productName}</span>
                                    </div>
                                    <div className='d-flex justify-content-end align-items-center col-3'>
                                        <span className='ms-3'>Rs. {item.productPrice}</span>                            
                                    </div>
                                </div>
                                
                            </div>
                        ))}
                        <div className='d-flex justify-content-between m-3'>
                            <div className='fw-bold'>Delivery Fee: </div>
                            <div className='me-4 pe-2'>Rs. 300</div>                        
                        </div>
                        <hr/>
                        <div className='d-flex justify-content-between m-3 pb-2'>
                            <div className='fw-bold'>Total: </div>
                            <div className='me-5 pe-4 fw-bold'>Rs. {cartTotal + 300}</div>                        
                        </div>
                    </>
                :
                    (<div></div>)
                }
            </div>
            <div className='d-flex justify-content-end pe-4 m-4 '>
                <Link to={'/checkout'}>
                    <button className='btn btn-success'> Checkout </button>                        
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Cart