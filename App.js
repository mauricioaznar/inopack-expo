import React, {useContext, useEffect, useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context'
import {Provider as AuthProvider, Context as AuthContext} from './src/context/AuthContext'
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import LoginScreen from './src/screens/LoginScreen'
import inopack from './src/api/inopack'
import TryLoginScreen from './src/screens/TryLoginScreen'
import EquipmentInventoryScreen from './src/screens/EquipmentInventoryScreen'
import EquipmentRequestsScreen from './src/screens/EquipmentRequestsScreen'
import EquipmentWithdrawalScreen from './src/screens/EquipmentWithdrawalScreen'

const EquipmentTabs = createBottomTabNavigator()

const MainFlow = () => {

  return (
    <EquipmentTabs.Navigator>
      <EquipmentTabs.Screen name="Inventario" component={EquipmentInventoryScreen}/>
      <EquipmentTabs.Screen name="Pedidos" component={EquipmentRequestsScreen}/>
      <EquipmentTabs.Screen name="Retiros" component={EquipmentWithdrawalScreen}/>
    </EquipmentTabs.Navigator>
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

  return (
    !firstTry ? <TryLoginScreen /> :
      !token ? <LoginFlow /> : <MainFlow />
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthProvider>
          <AuthFlow />
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}