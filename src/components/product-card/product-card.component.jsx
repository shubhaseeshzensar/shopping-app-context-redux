import React, { useContext } from "react";
import Button from '../button/button.component';
import "./product-card.styles.scss";
import { CartContext } from "../contexts/cart.context";

const ProductCard = ({ product }) => {  
    // getting 'product' as a prop from shop component
    const { id, name, imageUrl, price } = product;
    const { addItemToCart } = useContext(CartContext)
    const addProductToCart = () => addItemToCart(product)

    return (
        <div className="product-card-container">
            <img alt={`${name}`} src={imageUrl} />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button buttonType="inverted" onClick={addProductToCart}>Add To Cart</Button>
        </div>
    );
};

export default ProductCard;