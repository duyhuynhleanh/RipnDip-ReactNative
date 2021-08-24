import { createStackNavigator, createAppContainer } from 'react-navigation'
import { Platform } from 'react-native'

import CartScreen from '../screens/CartScreen'
import ProductsOverviewScreen from '../screens/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/ProductDetailScreen'
import Colors from '../constants/Colors'

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
      },
      headerTitleStyle: { fontFamily: 'open-sans-bold' },
      headerBackTitleStyle: { fontFamily: 'open-sans' },
      headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
    },
  }
)

export default createAppContainer(ProductsNavigator)
