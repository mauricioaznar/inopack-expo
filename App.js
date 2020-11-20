import React, {useContext, useEffect, useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context'
import {
  Provider as AuthProvider,
  Context as AuthContext
} from './src/context/AuthContext'
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {MaterialIcons, FontAwesome5} from '@expo/vector-icons'


import LoginScreen from './src/screens/LoginScreen'
import TryLoginScreen from './src/screens/TryLoginScreen'
import EquipmentInventoryScreen from './src/screens/EquipmentInventoryScreen'
import EquipmentRequestsScreen from './src/screens/EquipmentRequestsScreen'
import EquipmentWithdrawalScreen from './src/screens/EquipmentWithdrawalScreen'
import {Badge, Icon} from 'react-native-elements'

const EquipmentTabs = createBottomTabNavigator()

const MainFlow = () => {

  return (
    <EquipmentTabs.Navigator
      initialRouteName="EquipmentRequests"
    >
      <EquipmentTabs.Screen
        name="EquipmentInventory"
        component={EquipmentInventoryScreen}
        options={{
          title: "Inventario",
          tabBarIcon: ({color, size}) => {
            return (<Icon type="material" name="storage" size={size} color={color} />)
          },
        }}
      />
      <EquipmentTabs.Screen
        name="EquipmentRequests"
        component={EquipmentRequestsScreen}
        options={{
          title: "Pedidos",
          tabBarIcon: ({color, size}) => {
            return (
              <View>
                <Icon type="font-awesome-5" name="shopping-bag" size={size} color={color} />
                <Badge
                  status="error"
                  value={2}
                  containerStyle={{ position: 'absolute', top: -3, right: -7 }}
                />
              </View>
              )
          }
        }}
      />
      <EquipmentTabs.Screen
        name="EquipmentWithdrawals"
        component={EquipmentWithdrawalScreen}
        options={{
          title: "Retiros"
        }}
      />
    </EquipmentTabs.Navigator>
  )
}


const LoginFlow = () => {

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <LoginScreen/>
    </SafeAreaView>
  )
}

const AuthFlow = () => {

  const {token, firstTry} = useContext(AuthContext)

  return (
    !firstTry ? <TryLoginScreen/> :
      !token ? <LoginFlow/> : <MainFlow/>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthProvider>
          <AuthFlow/>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}