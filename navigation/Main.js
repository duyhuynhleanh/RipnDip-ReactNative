import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

//Stacks
import HomeNavigator from './HomeNavigator'
import CartNavigator from './CartNavigator'
import UserNavigator from './UserNavigator'

import CartIcon from '../components/CartIcon'

const Tab = createBottomTabNavigator()

const Main = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#e91e63',
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name='Sản phẩm'
        component={HomeNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons
              name='home'
              color={color}
              style={{ position: 'relative' }}
              size={30}
            />
          ),
        }}
      />

      <Tab.Screen
        name='Giỏ hàng'
        component={CartNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View>
              <Ionicons name='cart' color={color} size={30} />
              <CartIcon />
            </View>
          ),
        }}
      />

      {/* <Tab.Screen 
        name='Admin'
        component={}
        options={{
            tabBarIcon: ({ color }) => (
                <Ionicons name='cog' color={color} size={30} />
            )
        }}
        /> */}

      <Tab.Screen
        name='User'
        component={UserNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name='person' color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default Main
