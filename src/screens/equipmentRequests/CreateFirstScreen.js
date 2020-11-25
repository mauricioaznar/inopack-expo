import React, {useContext, useState} from 'react'
import {FlatList, Text, View, KeyboardAvoidingView, ScrollView} from 'react-native'
import {Context as EquipmentContext} from '../../context/EquipmentContext'
import Spacer from '../../components/Spacer'
import DatePicker from '../../inputs/DatePicker'
import {Button, Input, ListItem} from 'react-native-elements'
import {SafeAreaView} from 'react-native-safe-area-context'

const CreateFirstScreen = ({navigation}) => {

  const {
    dateEmitted,
    setDateEmitted,
    dateEstimatedDelivery,
    setDateEstimatedDelivery,
    description,
    setDescription
  } = useContext(EquipmentContext)

  return (
    <ScrollView
      keyboardShouldPersistTaps={'handled'}
      showsVerticalScrollIndicator={false}
    >
      <KeyboardAvoidingView
        enabled
      >
        <Spacer>
          <DatePicker
            label={'Fecha de emisión'}
            value={dateEmitted}
            onChangeDate={setDateEmitted}
          />
        </Spacer>
        <Spacer>
          <DatePicker
            label={'Fecha estimada de entrega'}
            value={dateEstimatedDelivery}
            onChangeDate={setDateEstimatedDelivery}
          />
        </Spacer>
        <Spacer>
          <Input
            label={'Descripción'}
            onChangeText={setDescription}
            value={description}
            multiline
            numberOfLines={3}
          />
        </Spacer>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}
export default CreateFirstScreen