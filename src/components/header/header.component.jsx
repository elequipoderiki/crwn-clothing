import React from "react";
import { Link } from "react-router-dom";
import './header.styles.scss';
import {ReactComponent as Logo} from '../../assets/crown.svg'
import {auth} from '../../firebase/firebase.utils'

import { createStructuredSelector } from "reselect";

import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import CartIcon from "../cart-icon/cart-icon.component";
import { connect } from "react-redux";

import CartDropdown from "../cart-dropdown/cart-dropdown.component";

const Header = ({currentUser, hidden}) => (
    <div className="header">
        <Link to="/">
            <Logo className="logo"></Logo>
        </Link>
        <div className="options">
            <Link className="option" to='/shop'>
                SHOP
            </Link>
            <Link className="option" to='/contact'>
                CONTACT
            </Link>
            {
                currentUser ?
                <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>
                :
                <Link className="option" to='/signin'>SIGN IN</Link>
            }
            <CartIcon></CartIcon>
        </div>
        {
            hidden ? null :
            <CartDropdown></CartDropdown>
        }
    </div>
)

const mapStateToProps = createStructuredSelector({
    //currentUser: state.user.currentUser //this state comes from user reducer because it is connected to redux states

    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);