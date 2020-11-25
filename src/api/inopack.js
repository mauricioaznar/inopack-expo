import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const apiUrl = __DEV__ ?
  'https://9824f75db43d.ngrok.io/api/' : 'https://inoserver.grupoinopack.com/api/'

const instance = axios.create(
  { baseURL: apiUrl }
)

instance.interceptors.request.use(
  async(config) => {
    const token = await AsyncStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default instance