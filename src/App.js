import './App.css';
import {Navigate, Route, Routes } from 'react-router-dom';
import CheckoutPage from './pages/checkout/checkout.component';
import HomePage from './pages/homepage/homepage.component';

import { selectCurrentUser } from './redux/user/user.selectors';

import { createStructuredSelector } from 'reselect';
import ShopPage from './pages/shop/shop.component';

import Header from './components/header/header.component';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import {auth, addCollectionAndDocuments, createUserProfileDocument, db } from './firebase/firebase.utils'
import React from 'react';
import { onSnapshot} from 'firebase/firestore';

import { connect } from 'react-redux';

import { setCurrentUser } from './redux/user/user.actions';
import ContactPage from './pages/contact/contact.component';

import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

class App extends React.Component {
  
  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {

        const userRef = await createUserProfileDocument(userAuth)
        onSnapshot(userRef, snapShot => {

          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
          })
        })
        
      } else {
        setCurrentUser(userAuth)
        // addCollectionAndDocuments('collections', collectionsArray.map(({title, items}) => ({title, items})), db)
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render ( ) {
    return (
      <div>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/shop/*' element={<ShopPage/>}/>
          <Route path='/checkout' element={<CheckoutPage/>}/>
          <Route path='/signin' 
            element={ this.props.currentUser ? <Navigate to="/" />: <SignInAndSignUpPage />}
            // render={() => this.props.currentUser ? (
            //   <Navigate to="/" />
            //   ) : (
            //     <SignInAndSignUpPage />
            //   )
            // }
          />
          <Route path='/contact' element={<ContactPage/>}/>
        </Routes>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (App);
