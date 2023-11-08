// Write your code here

import {Component} from 'react'
import CartContext from '../../context/CartContext'

import './index.css'

class CartSummary extends Component {
  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          console.log(cartList)
          const totalPrice = cartList.reduce(
            (accumulator, currentItem) =>
              accumulator + currentItem.price * currentItem.quantity,
            0,
          )
          console.log(totalPrice)
          return (
            <div className="cart-summary-con">
              <div className="text-con">
                <h1 className="cart-summary-heading">Order Total</h1>
                <h1>Rs {totalPrice}/-</h1>
              </div>
              <p>{cartList.length} items in cart</p>
              <button className="cart-summary-button" type="button">
                Checkout
              </button>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartSummary
