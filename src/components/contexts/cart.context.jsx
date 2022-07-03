import { createContext, useEffect, useReducer, useState } from "react";
import {createAction} from '../../utils/reducer/reducer.utils'

const addCartItem = (cartItems, productToAdd) => {
    // 'productToAdd' is an object generated by the ProductCard component
    //find if cartItems contains a productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );
    // if productToAdd is found then inc the qty return
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }
    //a new array with modified cartItems/new cart item
    return [...cartItems, { ...productToAdd, quantity: 1 }]; // when the cart is empty and you are adding item t0 cart
};

const removeCartItem = (cartItems, cartItemToRemove) => {
    // find the cartitem that is to be removed i.e. existing item in the cart
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );
    //check if quantity is equal to 1, if it is then that item should be removed from the cart
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id === cartItemToRemove.id)
    }
    // if the quantity is greater > 1 then 
    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id ?
            { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem)
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)
}

export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}



export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: ()=>{},
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    clearItemFromCart: () => { },
    cartCount: 0,
    cartTotal: 0,
    // product{id, name, imageUrl,}  cartItem{id, name, imageUrl, quantity}
});

// 1 the state
const INITIAL_STATE = {
    cartCount: 0,
    cartItems: [],
    cartTotal: 0,
    isCartOpen: false
}


const cartReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS: {
            return {
                ...state,
                ...payload
            }
        }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN: {
            return {
                ...state,
                isCartOpen : payload
            }
        }
        default:
            throw new Error(`unhandled type of cart ${type} in cartReducer`)
    }
}

export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)
    const {isCartOpen, cartCount,cartItems,cartTotal}=state

    const updateCartItemReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)

        /**
             * generate newCartTotal and newCartCount
             * 
             * dispatch new action with payload which contains an object which  contains
             * newCartItems, newCartTotal, newCArtCount
             */

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems,
                cartTotal: newCartTotal,
                cartCount: newCartCount,
            }),

        )
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd)
        updateCartItemReducer(newCartItems)
    };
    const removeItemToCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove)
        updateCartItemReducer(newCartItems)
    }
    const clearItemsFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear)
        updateCartItemReducer(newCartItems)
    }

    const setIsCartOpen = (flag) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, flag))
    }

    const value = {
        clearItemsFromCart,
        cartCount,
        isCartOpen,
        setIsCartOpen : setIsCartOpen,
        addItemToCart,
        removeItemToCart,
        cartItems,
        cartTotal
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
