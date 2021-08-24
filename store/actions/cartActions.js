import { CART_ADD_ITEM } from '../constants/cartConstants'

export const addToCart = (product) => {
  return {
    type: CART_ADD_ITEM,
    payload: product,
  }
}
