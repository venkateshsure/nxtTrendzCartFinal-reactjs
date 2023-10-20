// Write your code here

import {Component} from 'react'

import './index.css'

class CartSummary extends Component {
  render() {
    return (
      <div className="cart-summary-con">
        <div className="text-con">
          <h1 className="cart-summary-heading">Ordered Total: </h1>
          <p>Rs 6008/- </p>
        </div>
        <p>3 items in cart</p>
        <button className="cart-summary-button" type="button">
          Checkout
        </button>
      </div>
    )
  }
}

export default CartSummary
