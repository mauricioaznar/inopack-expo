import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const instance = axios.create(
  { baseURL: 'https://826c873fe9ea.ngrok.io/api/' }
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