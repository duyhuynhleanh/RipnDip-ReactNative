import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet, Dimensions, ScrollView, Button } from 'react-native'
import {
  Text,
  Left,
  Right,
  ListItem,
  Thumbnail,
  Body,
  Container,
} from 'native-base'
import { createOrder } from '../store/actions/orderActions'
import { ORDER_CREATE_RESET } from '../store/constants/orderConstants'
import { USER_DETAILS_RESET } from '../store/constants/userConstants'

var { width, height } = Dimensions.get('window')

const ConfirmOrderScreen = (props) => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)

  if (!cart.shippingAddress.address) {
    props.navigation.navigate('Shipping')
  } else if (!cart.paymentMethod) {
    props.navigation.navigate('Payment')
  }
  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      props.navigation.navigate('User Profile')
      dispatch({ type: USER_DETAILS_RESET })
      dispatch({ type: ORDER_CREATE_RESET })
    }
    // eslint-disable-next-line
  }, [success])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }
  return (
    <ScrollView>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          Xác nhận đơn hàng
        </Text>
        <View style={{ borderWidth: 1, borderColor: 'orange' }}>
          <Text style={styles.title}>Địa chỉ giao hàng:</Text>
          <View style={{ padding: 8 }}>
            <Text>Tên: {cart.shippingAddress.shippingName}</Text>
            <Text>Địa chỉ: {cart.shippingAddress.address}</Text>
            <Text>Số điện thoại: {cart.shippingAddress.phoneNumber}</Text>
            <Text>Thành phố: {cart.shippingAddress.city}</Text>
            <Text>Mã bưu chính: {cart.shippingAddress.postalCode}</Text>
            <Text>Quốc gia: {cart.shippingAddress.country}</Text>
          </View>
          <Text style={styles.title}>Sản phẩm:</Text>

          <View>
            {cart.cartItems.map((item, index) => {
              return (
                <ListItem style={styles.listItem} key={index} avatar>
                  <Left>
                    <Thumbnail source={{ uri: item.image }} />
                  </Left>
                  <Body style={styles.body}>
                    <Left>
                      <Text>{item.name}</Text>
                    </Left>
                    <Right>
                      <Text>$ {item.price}</Text>
                      <Text>Số lượng {item.qty}</Text>
                    </Right>
                  </Body>
                </ListItem>
              )
            })}
          </View>
          <Text style={styles.title}>Giá tiền:</Text>
          <View style={{ padding: 8 }}>
            <Text>Giao hàng: ${cart.shippingPrice}</Text>
            <Text>Thuế: ${cart.taxPrice}</Text>
            <Text>Tổng tiền: ${cart.totalPrice}</Text>
          </View>
        </View>

        <View style={{ alignItems: 'center', margin: 20 }}>
          <Button title='Đặt hàng' onPress={placeOrderHandler} />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: height,
    padding: 8,
    alignContent: 'center',
    backgroundColor: 'white',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  title: {
    alignSelf: 'center',
    margin: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    width: width / 1.2,
  },
  body: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
})

export default ConfirmOrderScreen
