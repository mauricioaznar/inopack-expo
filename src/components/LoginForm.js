import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Input} from 'react-native-elements'
import Spacer from './Spacer'
import { FontAwesome5 } from '@expo/vector-icons'

export default () => {
  return (
    <SafeAreaView>
      <Spacer>
        <Input
          label="E-mail"
          leftIcon={() => {
            return <FontAwesome5 name="user" />
          }}
          autoCapitalize={'none'}
          autoCorrect={false}
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
        />
      </Spacer>
    </SafeAreaView>
  )
}