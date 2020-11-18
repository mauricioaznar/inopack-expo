import React from 'react'
import {ActivityIndicator} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'

export default () => {
  return <SafeAreaView style={{flex: 1}}>
    <ActivityIndicator size="large" color="#0000ff"/>
  </SafeAreaView>
}