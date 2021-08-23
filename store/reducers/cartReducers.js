import { CART_ADD_ITEM } from '../constants/cartConstants'
import CartItem from '../../models/cart-items'

const initialState = {
  cartItems: [],
  totalAmount: 0,
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const addedProduct = action.product
      const prodPrice = addedProduct.price
      const prodName = addedProduct.name

      let updateOrNewCartItem

      if (state.cartItems[addedProduct._id]) {
        updateOrNewCartItem = new CartItem(
          state.cartItems[addedProduct._id].quantity + 1,
          prodPrice,
          prodName,
          state.cartItems[addedProduct._id].sum + prodPrice
        )
      } else {
        updateOrNewCartItem = new CartItem(1, prodPrice, prodName, prodPrice)
      }
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          [addedProduct._id]: updateOrNewCartItem,
        },
        totalAmount: state.totalAmount + prodPrice,
      }
  }
  return state
}
