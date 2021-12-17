import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_CLEAR_ITEMS,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'

export const addToCart = (product, qty = 1) => {
  const { _id, name, image, price, countInStock } = product
  return {
    type: CART_ADD_ITEM,
    payload: {
      product: _id,
      name: name,
      image: image,
      price: price,
      countInStock: countInStock,
      qty,
    },
  }
}

export const removeFromCart = (id) => {
  return {
    type: CART_REMOVE_ITEM,
    payload: id,
  }
}

export const clearCart = () => {
  return {
    type: CART_CLEAR_ITEMS,
  }
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })
}
