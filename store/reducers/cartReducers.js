import { CART_ADD_ITEM } from '../constants/cartConstants'
import CartItem from '../../models/cart-items'

const initialState = {
  cartItems: [],
  totalAmount: 0,
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const addedProduct = action.payload

      const prodId = addedProduct._id
      const prodName = addedProduct.name
      const prodImage = addedProduct.image
      const prodPrice = addedProduct.price

      let updateOrNewCartItem

      if (state.cartItems[addedProduct._id]) {
        updateOrNewCartItem = new CartItem(
          prodId,
          prodName,
          prodImage,
          prodPrice,
          state.cartItems[addedProduct._id].qty + 1,
          state.cartItems[addedProduct._id].sum + prodPrice
        )
      } else {
        updateOrNewCartItem = new CartItem(
          prodId,
          prodName,
          prodImage,
          prodPrice,
          1,
          prodPrice
        )
      }
      return {
        ...state,
        cartItems: [...state.cartItems, updateOrNewCartItem],
        totalAmount: state.totalAmount + prodPrice,
      }
  }
  return state
}
