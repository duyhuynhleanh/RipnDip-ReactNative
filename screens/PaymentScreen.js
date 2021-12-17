import React, { useState, useEffect } from 'react'
import { View, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  Header,
  Content,
  ListItem,
  Text,
  Radio,
  Right,
  Left,
  Body,
  Title,
} from 'native-base'
import { savePaymentMethod } from '../store/actions/cartActions'

const methods = [
  { name: 'Thanh toán khi nhận hàng', value: 'COD' },
  { name: 'Thanh toán bằng PayPal', value: 'PayPal' },
]

const PaymentScreen = (props) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const dispatch = useDispatch()

  const [paymentMethod, setPaymentMethod] = useState()

  const submitHandler = () => {
    dispatch(savePaymentMethod(paymentMethod))
    props.navigation.navigate('Confirm')
  }

  useEffect(() => {
    if (!shippingAddress.address) {
      props.navigation.navigate('Checkout')
    }
  }, [shippingAddress])
  return (
    <Container>
      <Header>
        <Body>
          <Title>Chọn phương thức thanh toán</Title>
        </Body>
      </Header>
      <Content>
        {methods.map((item) => {
          return (
            <ListItem
              key={item.name}
              onPress={() => setPaymentMethod(item.value)}
            >
              <Left>
                <Text>{item.name}</Text>
              </Left>
              <Right>
                <Radio selected={paymentMethod == item.value} />
              </Right>
            </ListItem>
          )
        })}

        <View style={{ marginTop: 60, alignSelf: 'center' }}>
          <Button title={'Xác nhận'} onPress={submitHandler} />
        </View>
      </Content>
    </Container>
  )
}

export default PaymentScreen
