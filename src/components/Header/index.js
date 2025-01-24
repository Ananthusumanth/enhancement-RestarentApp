import {AiOutlineShoppingCart} from 'react-icons/ai'
import './index.css'

const Header = props => {
  const {cart, rest} = props
  console.log(rest)
  return (
    <div className="header-container">
      <h1 className="header-Main-heading">{rest.restaurant_name}</h1>
      <div className="large-Order-cart">
        <p className="header-paragraph">My Orders</p>
        <AiOutlineShoppingCart size={30} />
        <p className="badge">{cart.length}</p>
      </div>
      <div className="mobile-Order-cart">
        <AiOutlineShoppingCart size={30} />
        <p className="badge">{cart.length}</p>
      </div>
    </div>
  )
}

export default Header
