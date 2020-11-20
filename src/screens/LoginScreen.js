import React, {useContext, useEffect, useState} from 'react'
import {Input, Button, CheckBox, Text} from 'react-native-elements'
import { View } from 'react-native'
import Spacer from '../components/Spacer'
import { FontAwesome5 } from '@expo/vector-icons'
import {Context as AuthContext} from '../context/AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'



const LoginScreen = ({onSubmit}) => {
  const [email, setEmail] = useState(
    __DEV__ ? 'mauricioaznar94@gmail.com' : '')
  const [password, setPassword] = useState(
    __DEV__ ? 'maurisio610261' : '')
  const [remember, setRemember] = useState(true)
  const {login} = useContext(AuthContext)

  useEffect(() => {
    const setInitialValues = async () => {
      const email = await AsyncStorage.getItem('email')
      const password = await AsyncStorage.getItem('password')
      if (email && password) {
        setEmail(email)
        setPassword(password)
        setRemember(true)
      }
    }
    setInitialValues()
  }, [])

  const callback = (isValid) => {
    const saveValues = async () => {
      await AsyncStorage.setItem('email', email)
      await AsyncStorage.setItem('password', password)
    }
    if (isValid) {
      saveValues()
    }
  }

  return (
    <View>
      <Spacer>
        <Text h4>
          Titulo de prueba
        </Text>
      </Spacer>
      <Spacer>
        <Input
          label="E-mail"
          leftIcon={() => {
            return <FontAwesome5 name="user" />
          }}
          autoCapitalize={'none'}
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />
      </Spacer>
      <Spacer>
        <Input
          label="Contraseña"
          leftIcon={() => {
            return <FontAwesome5 name="lock" />
          }}
          secureTextEntry
          autoCapitalize={'none'}
          autoCorrect={false}
          value={password}
          onChangeText={setPassword}
        />
      </Spacer>
      <Spacer>
        <CheckBox
          title="Recordar"
          checked={remember}
          onPress={() => {setRemember(!remember)}}
        />
      </Spacer>
      <Spacer>
        <Button
          title="Ingresar"
          onPress={() => {
            login(email, password, callback)
          }}
        />
      </Spacer>
    </View>
  )
}

export default LoginScreen