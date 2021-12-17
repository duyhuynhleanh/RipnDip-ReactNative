import React, { useState } from 'react'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import { Provider } from 'react-redux'
import { store, persistor } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { NavigationContainer } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
//import Header from './components/Header'

//Context API
import Auth from './Context/store/Auth'

//Navigators
import Main from './navigation/Main'

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    Roboto_medium: require('./assets/fonts/Roboto-Medium.ttf'),
  })
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true)
        }}
        onError={(err) => console.log(err)}
      />
    )
  }

  return (
    //<Auth>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          {/* <Header /> */}
          <Main />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </PersistGate>
    </Provider>
    //</Auth>
  )
}
