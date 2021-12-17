import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleWare from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { cartReducer } from './reducers/cartReducers'
import {
  userLoginReducer,
  userDetailsReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers'
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderCancelReducer,
  orderPayReducer,
  orderListMyReducer,
} from './reducers/orderReducers'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
  key: 'rootapp',
  storage: AsyncStorage,
  whitelist: ['userLogin', 'cart'],
}

const rootReducer = combineReducers({
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderCancel: orderCancelReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const initialState = {
  cart: {
    cartItems: [],
    shippingAddress: {},
  },
  userLogin: {},
}

export const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunkMiddleWare))
)

export const persistor = persistStore(store)
