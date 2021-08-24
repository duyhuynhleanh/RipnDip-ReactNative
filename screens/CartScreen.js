import React from 'react'
import { View, Text, FlatList, StyleSheet, Button } from 'react-native'
import { useSelector } from 'react-redux'
import Colors from '../constants/Colors'
import CartItem from '../components/CartItem'

const CartScreen = (props) => {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount)
  const cartItems = useSelector((state) => state.cart.cartItems)
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Tổng: <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button title='Đặt hàng' disabled={cartItems.length === 0} />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.product}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.qty}
            title={itemData.item.name}
            amount={itemData.item.sum}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
})

export default CartScreen
