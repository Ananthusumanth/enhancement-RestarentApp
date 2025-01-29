import {Link, withRouter} from 'react-router-dom'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import CartContext from '../../ReactContext/CartContext'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const Logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        return (
          <div className="header-container">
            <Link to="/">
              <h1 className="header-Main-heading">UNI Resto Cafe</h1>
            </Link>
            <div className="header-cart-section">
              <div className="large-Order-cart">
                <p className="header-paragraph">My Orders</p>
                <Link to="/cart">
                  <AiOutlineShoppingCart size={30} data-testid="cart" />
                </Link>
                <p className="badge">{cartList.length}</p>
              </div>
              <button type="button" className="logout-button" onClick={Logout}>
                Logout
              </button>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
