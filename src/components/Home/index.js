import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiContentResponse = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  isFailed: 'IS_FAILED',
}

const Home = () => {
  const [data, setData] = useState({
    state: apiContentResponse.initial,
  })
  const [category, setCategory] = useState([])
  const [allCategory, setAllCategory] = useState([])
  const [dish, setDish] = useState([])
  const [ids, setIds] = useState([])
  const [activeTab, setActiveTab] = useState()
  const [cart, setCart] = useState([])
  const [rest, setrest] = useState([])

  useEffect(() => {
    setData({state: apiContentResponse.in_progress})
    getApiData()
  }, [])

  const getApiData = async () => {
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const response = await fetch(url)
    if (response.ok) {
      const dbData = await response.json()
      setCategory(dbData[0].table_menu_list)
      setDish(dbData[0].table_menu_list[0].category_dishes)
      setAllCategory(dbData[0].table_menu_list[0].category_dishes)
      setIds([...ids, dbData[0].table_menu_list[0]])
      setActiveTab(dbData[0].table_menu_list[0].menu_category_id)
      setData({state: apiContentResponse.success})
      setrest(dbData[0])
    } else {
      setData({state: apiContentResponse.isFailed})
    }
  }

  const countIncrease = id => {
    const allCategoryquatityIncrease = allCategory.map(each => {
      if (each.dish_id === id) {
        return {
          ...each,
          quantity: each.quantity === undefined ? 1 : each.quantity + 1,
        }
      }
      return each
    })
    setAllCategory(allCategoryquatityIncrease)
    const idIsInCard = cart.find(each => each.dish_id === id)
    if (idIsInCard !== undefined) {
      const cartFiltered = cart.map(items => {
        if (items.dish_id === id) {
          return {
            ...items,
            quantity: items.quantity + 1,
          }
        }
        return items
      })
      setCart(cartFiltered)
    } else {
      allCategory.filter(each => {
        if (each.dish_id === id) {
          setCart([
            ...cart,
            {
              ...each,
              quantity: each.quantity === undefined ? 1 : each.quantity + 1,
            },
          ])
        }
      })
    }
  }

  const countDecrease = id => {
    const allCategoryquatityIncrease = allCategory.map(each => {
      if (each.dish_id === id) {
        return {
          ...each,
          quantity: each.quantity === 0 ? 0 : each.quantity - 1,
        }
      }
      return each
    })
    setAllCategory(allCategoryquatityIncrease)
    const cartFilted = cart.map(items => {
      if (items.dish_id === id) {
        return {
          ...items,
          quantity: items.quantity === 0 ? 0 : items.quantity - 1,
        }
      }
      return items
    })
    const filteredDataToCartIN = cartFilted.filter(each => each.quantity > 0)
    setCart(filteredDataToCartIN)
  }

  const getTheDataItems = id => {
    const result = category.find(each => {
      if (each.menu_category_id === id) {
        return {
          ...each,
        }
      }
    })
    setDish(result.category_dishes)
    const singleId = ids.find(each => each.menu_category_id === id)
    if (singleId === undefined) {
      setAllCategory([...allCategory, ...result.category_dishes])
      setIds([...ids, result])
    }
    setActiveTab(result.menu_category_id)
  }

  const loadingView = () => (
    <div className="home-body-section-loader">
      <div className="loading" data-testid="loader">
        <Loader
          type="ThreeDots"
          color="blue"
          height={50}
          width={50}
          ariaLabel="loading"
        />
      </div>
    </div>
  )
  const isfailedView = () => (
    <div className="home-body-section-loader">
      <div className="loading">
        <h1>Something went Wrong!</h1>
        <p>Sorry, We cannot get data</p>
        <button type="button" className="buttonRetry" onClick={getApiData()}>
          Try Again
        </button>
      </div>
    </div>
  )

  const succesView = () => (
    <div className="home-body-section">
      <div className="tab_list_menu">
        <ul className="ul-tab">
          {category.map(each => (
            <li className="list_tab" key={each.menu_category_id}>
              <button
                type="button"
                className={
                  activeTab === each.menu_category_id
                    ? 'buttonActive'
                    : 'button-tab'
                }
                onClick={() => getTheDataItems(each.menu_category_id)}
              >
                {each.menu_category}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="tab_list_data">
        {dish.map(each => {
          const backgroundColore_Are = [
            'green',
            'blue',
            'red',
            'pink',
            'yellow',
            'gold',
          ]
          const backgroundColorARE = Math.floor(Math.random() * 6)
          return (
            <div className="itemsSection" key={each.dish_id}>
              <div className="section1">
                <div className="dotSection">
                  <p
                    className="dotSectionBody"
                    style={{
                      backgroundColor: backgroundColore_Are[backgroundColorARE],
                    }}
                  />
                </div>
                <div className="detailsSection">
                  <h1 className="heading">{each.dish_name}</h1>
                  <p className="currency">
                    {each.dish_currency} {each.dish_price}
                  </p>
                  <p className="description">{each.dish_description}</p>
                  {each.dish_Availability ? (
                    <div className="countSection">
                      <button
                        type="button"
                        className="countpara"
                        onClick={() => countDecrease(each.dish_id)}
                      >
                        -
                      </button>
                      <p className="count">
                        {allCategory.find(item => item.dish_id === each.dish_id)
                          ?.quantity || 0}
                      </p>
                      <button
                        type="button"
                        className="countpara"
                        onClick={() => countIncrease(each.dish_id)}
                      >
                        +
                      </button>
                    </div>
                  ) : null}
                  <p className="addonCat">
                    {each.addonCat.length > 1 && 'Customizations available'}
                  </p>
                  <p className="available">
                    {each.dish_Availability ? null : 'Not available'}
                  </p>
                </div>
              </div>
              <div className="section2">
                <p className="calaries">{each.dish_calories} Calories</p>
                <img src={each.dish_image} className="dishImage" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

  const renderResponse = () => {
    const {state} = data
    switch (state) {
      case apiContentResponse.in_progress:
        return loadingView()
      case apiContentResponse.isFailed:
        return isfailedView()
      case apiContentResponse.success:
        return succesView()
      default:
        null
    }
  }

  return (
    <>
      <Header cart={cart} rest={rest} />
      {renderResponse()}
    </>
  )
}
export default Home
