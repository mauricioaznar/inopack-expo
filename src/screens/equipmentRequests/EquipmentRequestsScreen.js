import React, {useCallback, useContext, useState} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Text, FlatList, View, StyleSheet} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import {Badge, Icon, Input, ListItem} from 'react-native-elements'
import {useFocusEffect} from '@react-navigation/native'
import EquipmentRequestsListScreen from './EquipmentRequestsListScreen'
import inopack from '../../api/inopack'
import DatePicker from '../../inputs/DatePicker'
import Spacer from '../../components/Spacer'
import {Context as EquipmentContext, Provider as EquipmentProvider} from '../../context/EquipmentContext'


const EquipmentRequestsStack = createStackNavigator()



const EquipmentRequestsCreateScreen = () => {
  const [dateEmitted, setDateEmitted] = useState('')
  const [description, setDescription] = useState('')

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
    </View>
  )
}

const EquipmentRequestsScreen = ({navigation}) => {
  const {cart} = useContext(EquipmentContext)

  return (
      <EquipmentRequestsStack.Navigator>
        <EquipmentRequestsStack.Screen
          name="EquipmentRequestsList"
          component={EquipmentRequestsListScreen}
          options={{
            title: "Pedidos",
            headerRight: (props) => {
              return (
                <View style={{marginRight: 10, flexDirection: 'row'}}>
                  <View style={{marginRight: 20}}>
                    <Icon
                      name="shopping-cart"
                      type="font-awesome-5"
                    />
                    {
                      cart.length > 0
                        ? <Badge
                            status="error"
                            value={cart.length}
                            containerStyle={{ position: 'absolute', top: -8, right: -7 }}
                          />
                        : null
                    }
                  </View>
                  <View>
                    <Icon
                      name="plus"
                      type="font-awesome-5"
                      onPress={() => {
                        navigation.navigate('EquipmentRequestsCreate')
                      }}
                    />
                  </View>
                </View>
              )
            }
          }}
        />
        <EquipmentRequestsStack.Screen
          name="EquipmentRequestsCreate"
          title="Nuevo pedido"
          component={EquipmentRequestsCreateScreen}
        />
      </EquipmentRequestsStack.Navigator>
  )
}

const styles = StyleSheet.create({})

export default EquipmentRequestsScreen


