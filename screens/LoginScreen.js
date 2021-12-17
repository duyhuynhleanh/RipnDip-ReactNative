import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import FormContainer from '../components/FormContainer'
import FormInput from '../components/FormInput'
import Error from '../components/Error'
import EasyButton from '../components/EasyButton'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'native-base'

import { login } from '../store/actions/userActions'

const LoginScreen = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      props.navigation.navigate('User Profile')
    }
  }, [userInfo])

  const handleSubmit = () => {
    if (email === '' || password === '') {
      setError('Xin điền đầy đủ thông tin')
    } else {
      dispatch(login(email, password))
    }
  }

  return (
    <FormContainer title={'Login'}>
      {loading && (
        <Container style={[styles.center, { backgroundColor: '#f2f2f2' }]}>
          <ActivityIndicator size='large' color='red' />
        </Container>
      )}
      <FormInput
        placeholder={'Enter Email'}
        name={'email'}
        id={'email'}
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />
      <FormInput
        placeholder={'Enter Password'}
        name={'password'}
        id={'password'}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.buttonGroup}>
        {error ? <Error message={error} /> : null}
        <EasyButton large primary onPress={() => handleSubmit()}>
          <Text style={{ color: 'white' }}>Login</Text>
        </EasyButton>
      </View>
      <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
        <Text style={styles.middleText}>Don't have an account yet?</Text>
        <EasyButton
          large
          secondary
          onPress={() => props.navigation.navigate('Register')}
        >
          <Text style={{ color: 'white' }}>Register</Text>
        </EasyButton>
      </View>
    </FormContainer>
  )
}

const styles = StyleSheet.create({
  buttonGroup: {
    width: '80%',
    alignItems: 'center',
  },
  middleText: {
    marginBottom: 20,
    alignSelf: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default LoginScreen
