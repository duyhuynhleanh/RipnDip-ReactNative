import { Platform } from 'react-native'

let baseURL = ''

{
  Platform.OS == 'android'
    ? (baseURL = 'http://192.168.1.5:5000/api/')
    : (baseURL = 'http://127.0.0.1:5000/api/')
}

export default baseURL
