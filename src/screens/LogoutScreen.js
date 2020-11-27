import React, {useContext, useEffect, useState} from 'react'
import {Input, Button, CheckBox, Text} from 'react-native-elements'
import { View } from 'react-native'
import Spacer from '../components/Spacer'
import {Context as AuthContext} from '../context/AuthContext'



const LoginScreen = ({onSubmit}) => {
  const {logout} = useContext(AuthContext)

  return (
    <View style={{flex: 1, justifyContent: 'flex-end'}}>
      <Spacer>
        <Button
          title="Salir"
          onPress={() => {
            logout()
          }}
        />
      </Spacer>
    </View>
  )
}

export default LoginScreen
