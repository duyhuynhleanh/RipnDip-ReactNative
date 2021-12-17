import React, { useEffect, useReducer, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import authReducer from '../reducers/Auth.reducers'
import { setCurrentUser } from '../actions/Auth.actions'
import AuthGlobal from './AuthGlobal'

const Auth = (props) => {
  const [stateUser, dispatch] = useReducer(authReducer, {
    isAuthenticated: null,
    user: {},
  })
  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    setShowChild(true)
    if (AsyncStorage.userInfo) {
      const decoded = AsyncStorage.userInfo ? AsyncStorage.userInfo : ''
      if (setShowChild) {
        dispatch(setCurrentUser(decoded))
      }
    }
    return () => setShowChild(false)
  }, [])

  if (!showChild) {
    return null
  } else {
    return (
      <AuthGlobal.Provider
        value={{
          stateUser,
          dispatch,
        }}
      >
        {props.children}
      </AuthGlobal.Provider>
    )
  }
}

export default Auth
