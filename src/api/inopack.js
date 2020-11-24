import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const apiUrl = __DEV__ ?
  'https://451b5be5be61.ngrok.io/api/' : 'https://inoserver.grupoinopack.com/api/'

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