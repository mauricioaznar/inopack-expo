import React, {useContext} from 'react'
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context'
import {
  Provider as AuthProvider,
  Context as AuthContext
} from './src/context/AuthContext'
import {NavigationContainer} from '@react-navigation/native';

import LoginScreen from './src/screens/LoginScreen'
import TryLoginScreen from './src/screens/TryLoginScreen'
import {Provider as EquipmentProvider, Context as EquipmentContext} from './src/context/EquipmentContext'
import EquipmentScreen from './src/screens/EquipmentScreen'



const MainFlow = () => {

  return (
    <EquipmentScreen />
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