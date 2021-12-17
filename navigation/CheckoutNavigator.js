import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import CheckoutScreen from '../screens/CheckoutScreen'
import PaymentScreen from '../screens/PaymentScreen'
import ConfirmOrderScreen from '../screens/ConfirmOrderScreen'

const Tab = createMaterialTopTabNavigator()

const MyTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Shipping' component={CheckoutScreen} />
      <Tab.Screen name='Payment' component={PaymentScreen} />
      <Tab.Screen name='Confirm' component={ConfirmOrderScreen} />
    </Tab.Navigator>
  )
}

const CheckoutNavigator = () => {
  return <MyTabs />
}

export default CheckoutNavigator
