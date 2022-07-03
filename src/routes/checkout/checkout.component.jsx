import React, { useContext } from 'react';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { CartContext } from '../../components/contexts/cart.context';
import './checkout.styles.scss'


const Checkout = () => {
    const { cartItems, cartTotal } = useContext(CartContext)
    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-section'>
                    <span>Product</span>
                </div>
                <div className='header-section'>
                    <span>Description</span>
                </div>
                <div className='header-section'>
                    <span>Quantity</span>
                </div>
                <div className='header-section'>
                    <span>Price</span>
                </div>
                <div className='header-section'>
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem} />)
            }
            <span className='total'>Total: <span>&#8377; </span>{cartTotal}</span>
        </div>
    );
};


export default Checkout;