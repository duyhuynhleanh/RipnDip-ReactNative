import { PRODUCT_LIST } from '../constants/productConstants'
import baseURL from '../../assets/common/baseUrl'
import axios from 'axios'

export const listProducts = () => {
  const res = axios.get(`${baseURL}products`)
  return {
    type: PRODUCT_LIST,
    payload: res,
  }
}
