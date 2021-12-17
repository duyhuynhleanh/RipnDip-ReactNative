import { PRODUCT_LIST } from '../constants/productConstants'

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST:
      return {
        products: action.payload.data.products,
      }
    default:
      return state
  }
}
