import React, {useContext, useEffect, useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context'
import {Provider as AuthProvider, Context as AuthContext} from './src/context/AuthContext'
import LoginScreen from './src/screens/LoginScreen'
import inopack from './src/api/inopack'
import TryLoginScreen from './src/screens/TryLoginScreen'

const MainFlow = () => {


  useEffect(() => {
    const getEquipments = async () => {
      const response = await inopack.get('equipment/list')
    }
    getEquipments()
  }, [])

  return (
    <SafeAreaView>
      <Text>
        Main Flow
      </Text>
    </SafeAreaView>
  )
}

const LoginFlow = () => {

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <LoginScreen />
    </SafeAreaView>
  )
}

const AuthFlow = () => {
  const {token, firstTry} = useContext(AuthContext)
  console.log(token)
  console.log(firstTry)
  return (
    !firstTry ? <TryLoginScreen /> :
      !token ? <LoginFlow /> : <MainFlow />
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AuthFlow />
      </AuthProvider>
    </SafeAreaProvider>
  );
}