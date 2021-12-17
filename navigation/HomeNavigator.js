import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProductsOverviewScreen from '../screens/ProductsOverviewScreen'
import SingleProduct from '../screens/SingleProduct'

const Stack = createStackNavigator()

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={ProductsOverviewScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name='Product Detail'
        component={SingleProduct}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

const HomeNavigator = () => {
  return <MyStack />
}

export default HomeNavigator
