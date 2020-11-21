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
import EquipmentInventoryScreen from './src/screens/equipmentRequests/EquipmentInventoryScreen'
import EquipmentRequestsScreen from './src/screens/equipmentRequests/EquipmentRequestsScreen'
import EquipmentWithdrawalScreen from './src/screens/equipmentRequests/EquipmentWithdrawalScreen'
import {Badge, Icon} from 'react-native-elements'
import {Provider as EquipmentProvider, Context as EquipmentContext} from './src/context/EquipmentContext'

const EquipmentTabs = createBottomTabNavigator()

const MainFlow = () => {
  const {cart} = useContext(EquipmentContext)

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
                  {
                    cart.length > 0
                      ? <Badge
                          status="error"
                          value={cart.length}
                          containerStyle={{ position: 'absolute', top: -3, right: -7 }}
                        />
                      : null
                  }
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
      !token ? <LoginFlow/> :
        <EquipmentProvider>
          <MainFlow/>
        </EquipmentProvider>
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