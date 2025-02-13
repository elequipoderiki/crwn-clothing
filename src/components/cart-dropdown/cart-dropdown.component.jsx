import React from "react";
import { connect } from "react-redux";

import {withRouter} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import { createStructuredSelector } from "reselect";
import CustomButton from '../custom-button/custom-button.component';

import { selectCartItems } from "../../redux/cart/cart.selectors";

import { toggleCartHidden } from "../../redux/cart/cart.actions";

import CartItem from "../cart-item/cart-item.component";

import './cart-dropdown.styles.scss';


const CartDropdown = ({cartItems, dispatch}) => {
    const navigate = useNavigate()
    // console.log(otherProps)
    return (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.length ? (
                cartItems.map(cartItem => 
                <CartItem key={cartItem.id} item={cartItem}></CartItem>
                ))
                :
                <span className="empty-message">Your cart is empty</span>
            }
        </div>
        <CustomButton 
            onClick={() => {
                navigate('/checkout');
                dispatch(toggleCartHidden());
            }}
        >GO TO CHECKOUT</CustomButton>
    </div>
)}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

export default connect(mapStateToProps) (CartDropdown);