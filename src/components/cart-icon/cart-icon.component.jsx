import React from 'react';
import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.actions';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = ({ mappedToggleCartHidden, itemCount }) => (
  <div className='cart-icon' onClick={mappedToggleCartHidden}>
    <ShoppingIcon className='shopping-icon' />
    <span className='item-count'>{itemCount}</span>
  </div>
);

const mapDispatchToProps = dispatch => ({
  mappedToggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = ({cart: { cartItems } }) =>{ 
  console.log('I am being called');
  return ({
  itemCount: cartItems.reduce(
    (accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity, 0) 
})};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartIcon);