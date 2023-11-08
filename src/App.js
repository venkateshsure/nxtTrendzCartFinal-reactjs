import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => this.setState({cartList: []})

  incrementCartItemQuantity = id => {
    this.setState(pre => ({
      cartList: pre.cartList.map(each => {
        if (each.id === id) {
          return {...each, quantity: each.quantity + 1}
        }
        return each
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(pre => ({
      cartList: pre.cartList.map(each => {
        if (each.id === id) {
          if (each.quantity > 1) {
            return {...each, quantity: each.quantity - 1}
          }
          this.removeCartItem(id)
        }
        return each
      }),
    }))
  }

  removeCartItem = id => {
    const {cartList} = this.state
    console.log(cartList)
    console.log(id)

    const unRemovedItems = cartList.filter(eachItem => eachItem.id !== id)
    console.log(unRemovedItems, cartList)
    this.setState({cartList: unRemovedItems})
    console.log(cartList)
  }

  addCartItem = product => {
    const {cartList} = this.state
    const similarItem = cartList.find(eachItem => eachItem.id === product.id)
    if (similarItem === undefined) {
      console.log(similarItem, product)
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      console.log(similarItem, product)
      this.setState(pre => ({
        cartList: pre.cartList.map(each =>
          each.id === product.id
            ? {...each, quantity: each.quantity + product.quantity}
            : each,
        ),
      }))
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
