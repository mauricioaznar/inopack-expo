import React, {useCallback, useState} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Text, FlatList, View, StyleSheet} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import {Badge, Icon, ListItem} from 'react-native-elements'
import {useFocusEffect} from '@react-navigation/native'
import EquipmentRequestsListScreen from './EquipmentRequestsListScreen'
import inopack from '../../api/inopack'
import DatePicker from '../../inputs/DatePicker'


const EquipmentRequestsStack = createStackNavigator()



const EquipmentRequestsCreateScreen = () => {
  return (
    <View style={{flex: 1}}>
      <DatePicker />
    </View>
  )
}

const EquipmentRequestsScreen = ({navigation}) => {

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
                  <Badge
                    status="error"
                    value={2}
                    containerStyle={{ position: 'absolute', top: -8, right: -7 }}
                  />
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


