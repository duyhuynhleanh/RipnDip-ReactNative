import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import TrafficLight from '../components/TrafficLight'
import EasyButton from '../components/EasyButton'
import Toast from 'react-native-toast-message'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, cancelOrder } from '../store/actions/orderActions'

const OrderCard = (props) => {
  return (
    <View style={[{ backgroundColor: '#95DAC1' }, styles.container]}>
      <View style={styles.container}>
        <Text>ID: #{props._id}</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <Text>Ngày: {props.createdAt.substring(0, 10)} </Text>
        <Text>
          Thanh toán:
          {props.paidAt ? (
            props.paidAt.substring(0, 10)
          ) : (
            <Text> Chưa thanh toán</Text>
          )}
        </Text>
        <Text>
          Giao hàng:
          {props.deliveredAt ? (
            props.deliveredAt.substring(0, 10)
          ) : (
            <Text> Chưa giao hàng</Text>
          )}
        </Text>
        <View style={styles.priceContainer}>
          <Text>Tổng tiền: </Text>
          <Text style={styles.price}>$ {props.totalPrice}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    backgroundColor: '#62B1F6',
    padding: 5,
  },
  priceContainer: {
    marginTop: 10,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    paddingBottom: 35,
  },
  price: {
    color: 'black',
    fontWeight: 'bold',
  },
})

export default OrderCard
