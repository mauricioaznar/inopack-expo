import React, { useContext, useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Context as AuthContext } from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default () => {
  const { login, initialTry } = useContext(AuthContext)

  useEffect(() => {

    const callback = async (isSuccess) => {
      if (!isSuccess) {
        await AsyncStorage.removeItem('email')
        await AsyncStorage.removeItem('password')
      }
    }

    const tryLogin = async () => {
      try {
        const email = await AsyncStorage.getItem('email')
        const password = await AsyncStorage.getItem('password')
        if (email, password) {
          await login(email, password, callback)
        }
      } catch (e) {
        console.log(e)
      }
      initialTry()
    }
    tryLogin()
  }, [])

  return <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
    <ActivityIndicator size="large" color="#0000ff"/>
  </SafeAreaView>
}