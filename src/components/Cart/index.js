import Header from '../Header'
import CartContext from '../../ReactContext/CartContext'
import {IoCloseCircle} from 'react-icons/io5'
import './index.css'

const Cart = () => {
  return (
    <CartContext.Consumer>
      {value => {
        const {
          cartList,
          removeAllCartItems,
          removeCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
        } = value

        return (
          <div>
            <Header />
            <div className="cart-body">
              {cartList.length > 0 ? (
                <>
                  <div className="remove-all-container">
                    <button
                      type="button"
                      className="remove-all-Button"
                      onClick={() => removeAllCartItems()}
                    >
                      Remove All
                    </button>
                  </div>
                  {cartList.map(each => {
                    // const dishImage = each.dish_image
                    if (each.quantity > 0) {
                      return (
                        <div className="cart-item-container">
                          <img
                            src={each.dish_image}
                            className="dishImage"
                            alt="dishImage"
                          />
                          <h1 className="cart-heading">{each.dish_name}</h1>
                          <p className="cart-currency">
                            {each.dish_currency} {each.dish_price}
                          </p>
                          <div className="cart-countSection">
                            <button
                              type="button"
                              className="cart-decrease-countpara"
                              onClick={() =>
                                decrementCartItemQuantity(each.dish_id)
                              }
                            >
                              -
                            </button>
                            <p className="cart-count">{each.quantity}</p>
                            <button
                              type="button"
                              className="cart-countpara"
                              onClick={() =>
                                incrementCartItemQuantity(each.dish_id)
                              }
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            className="remove-Icon"
                            onClick={() => removeCartItem(each.dish_id)}
                          >
                            <IoCloseCircle size={30} />
                          </button>
                        </div>
                      )
                    }
                  })}
                </>
              ) : (
                <div className="empty-image-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                    alt="Empty Cart Poster"
                    className="emptyCart-Image"
                  />
                </div>
              )}
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default Cart
