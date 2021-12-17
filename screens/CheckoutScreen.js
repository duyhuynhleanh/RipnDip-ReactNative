import React, { useState, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import Toast from 'react-native-toast-message'
import { Item, Picker } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import FormContainer from '../components/FormContainer'
import FormInput from '../components/FormInput'
import { useDispatch, useSelector } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { saveShippingAddress } from '../store/actions/cartActions'

const countries = require('../assets/countries.json')

const CheckoutScreen = (props) => {
  const [shippingName, setShippingName] = useState()
  const [address, setAddress] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [city, setCity] = useState()
  const [postalCode, setPostalCode] = useState()
  const [country, setCountry] = useState()

  const dispatch = useDispatch()

  const checkoutHandler = () => {
    dispatch(
      saveShippingAddress({
        shippingName,
        address,
        phoneNumber,
        city,
        postalCode,
        country,
      })
    )
    props.navigation.navigate('Payment')
  }

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={'Địa chỉ giao hàng'}>
        <FormInput
          placeholder={'Tên'}
          name={'shippingName'}
          value={shippingName}
          onChangeText={(text) => setShippingName(text)}
        />
        <FormInput
          placeholder={'Địa chỉ'}
          name={'shippingAddress'}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <FormInput
          placeholder={'Điện thoại'}
          name={'phoneNumber'}
          value={phoneNumber}
          keyboardType={'numeric'}
          onChangeText={(text) => setPhoneNumber(text)}
        />
        <FormInput
          placeholder={'Thành phố'}
          name={'city'}
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <FormInput
          placeholder={'Mã bưu chính'}
          name={'postalCode'}
          value={postalCode}
          keyboardType={'numeric'}
          onChangeText={(text) => setPostalCode(text)}
        />
        <Item picker>
          <Picker
            mode='dropdown'
            iosIcon={<Ionicons name='arrow-down' color={'#007aff'} />}
            style={{ width: undefined }}
            selectedValue={country}
            placeholder='Select your country'
            placeholderStyle={{ color: '#007aff' }}
            placeholderIconColor='#007aff'
            onValueChange={(e) => setCountry(e)}
          >
            {countries.map((c) => {
              return <Picker.Item key={c.code} label={c.name} value={c.name} />
            })}
          </Picker>
        </Item>
        <View style={{ width: '80%', alignItems: 'center' }}>
          <Button title='Xác nhận' onPress={checkoutHandler} />
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  )
}

export default CheckoutScreen
