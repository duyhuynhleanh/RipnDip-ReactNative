import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import FormContainer from '../components/FormContainer'
import FormInput from '../components/FormInput'
import Error from '../components/Error'
import EasyButton from '../components/EasyButton'
import Toast from 'react-native-toast-message'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { register } from '../store/actions/userActions'

const RegisterScreen = (props) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  useEffect(() => {
    if (userInfo) {
      props.navigation.navigate('User Profile')
    }
  }, [userInfo])

  const submitHandler = () => {
    if (email === '' || name === '' || password === '') {
      setMessage('Xin đừng bỏ trống')
    } else if (password !== confirmPassword) {
      setMessage('Mật khẩu và mật khẩu xác nhận không khớp')
    } else {
      dispatch(register(name, email, password))
      //props.navigation.navigate('Login')
    }
  }

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={'Register'}>
        {loading && (
          <Container style={[styles.center, { backgroundColor: '#f2f2f2' }]}>
            <ActivityIndicator size='large' color='red' />
          </Container>
        )}
        <FormInput
          placeholder={'Email'}
          name={'email'}
          id={'email'}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <FormInput
          placeholder={'Name'}
          name={'name'}
          id={'name'}
          onChangeText={(text) => setName(text)}
        />
        <FormInput
          placeholder={'Password'}
          name={'password'}
          id={'password'}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <FormInput
          placeholder={'Confirm Password'}
          name={'confirmPassword'}
          id={'confirmPassword'}
          secureTextEntry={true}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <View style={styles.buttonGroup}>
          {message ? <Error message={message} /> : null}
          {error ? <Error message={error} /> : null}
        </View>
        <View>
          <EasyButton large primary onPress={() => submitHandler()}>
            <Text style={{ color: 'white' }}>Register</Text>
          </EasyButton>
        </View>
        <View>
          <EasyButton
            large
            secondary
            onPress={() => props.navigation.navigate('Login')}
          >
            <Text style={{ color: 'white' }}>Back to Login</Text>
          </EasyButton>
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  buttonGroup: {
    width: '80%',
    margin: 10,
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default RegisterScreen
