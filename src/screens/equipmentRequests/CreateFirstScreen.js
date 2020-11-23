import React, {useContext, useState} from 'react'
import {FlatList, Text, View} from 'react-native'
import {Context as EquipmentContext} from '../../context/EquipmentContext'
import Spacer from '../../components/Spacer'
import DatePicker from '../../inputs/DatePicker'
import {Button, Input, ListItem} from 'react-native-elements'

const CreateFirstScreen = ({navigation}) => {

  const {
    cart,
    dateEmitted,
    setDateEmitted,
    description,
    setDescription
  } = useContext(EquipmentContext)

  return (
    <View style={{flex: 1}}>
      <Spacer>
        <DatePicker
          label={'Fecha de emisión'}
          value={dateEmitted}
          onChangeDate={setDateEmitted}
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
      <Spacer>
        <Input
          label={'Fecha de entrega estimada'}
        />
      </Spacer>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Spacer>
          <Button
            title={'Siguente'}
            onPress={() => {
              navigation.navigate('EquipmentRequestsCreateSecondScreen')
            }}
          />
        </Spacer>
      </View>
    </View>
  )
}
export default CreateFirstScreen