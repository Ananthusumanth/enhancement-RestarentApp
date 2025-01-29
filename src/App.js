import {Switch, Route} from 'react-router-dom'
import {useState} from 'react'
import Home from './components/Home'
import Login from './components/Login'
import Cart from './components/Cart'
import CartContext from './ReactContext/CartContext'
import ProtectedRouter from './components/ProtectedRouter'
import './App.css'

// write your code here
const App = () => {
  const [cartList, setCartList] = useState([])

  const addCartItem = (allcate, each) => {
    // console.log(allcate)
    const cartisHavingId = cartList.find(item => item.dish_id === each.dish_id)
    if (cartisHavingId === undefined) {
      const addtoCart = allcate.find(items => items.dish_id === each.dish_id)
      setCartList(prev => [...prev, addtoCart])
    }
  }
  console.log(cartList)
  const removeAllCartItems = () => {
    setCartList([])
  }

  const removeCartItem = id => {
    const cartRemainingItems = cartList.filter(each => each.dish_id !== id)
    setCartList(cartRemainingItems)
  }

  const incrementCartItemQuantity = id => {
    const allCategoryquatityIncrease = cartList.map(each => {
      if (each.dish_id === id) {
        return {
          ...each,
          quantity: each.quantity === undefined ? 1 : each.quantity + 1,
        }
      }
      return each
    })
    setCartList(allCategoryquatityIncrease)
  }

  const decrementCartItemQuantity = id => {
    const cartnum = cartList.find(each => each.dish_id === id)
    if (cartnum) {
      if (cartnum.quantity > 1) {
        const allCategoryquatityIncrease = cartList.map(each => {
          if (each.dish_id === id) {
            return {
              ...each,
              quantity: each.quantity === 0 ? 0 : each.quantity - 1,
            }
          }
          return each
        })
        setCartList(allCategoryquatityIncrease)
      } else {
        const cartRemainingItems = cartList.filter(each => each.dish_id !== id)
        setCartList(cartRemainingItems)
      }
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem: addCartItem,
        removeAllCartItems: removeAllCartItems,
        removeCartItem: removeCartItem,
        incrementCartItemQuantity: incrementCartItemQuantity,
        decrementCartItemQuantity: decrementCartItemQuantity,
      }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRouter exact path="/" component={Home} />
        <ProtectedRouter exact path="/cart" component={Cart} />
      </Switch>
    </CartContext.Provider>
  )
}

export default App
