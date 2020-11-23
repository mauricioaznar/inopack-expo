import React, {useContext, useState} from 'react'
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import {Badge, Icon, Input, ListItem} from 'react-native-elements'
import EquipmentRequestsListScreen from './ListScreen'
import DatePicker from '../../inputs/DatePicker'
import Spacer from '../../components/Spacer'
import {Context as EquipmentContext, Provider as EquipmentProvider} from '../../context/EquipmentContext'
import CreateFirstScreen from './CreateFirstScreen'
import CreateThirdScreen from './CreateThirdScreen'
import EquipmentInventoryScreen
  from '../equipmentInventory/EquipmentInventoryScreen'


const EquipmentRequestsStack = createStackNavigator()

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
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('EquipmentRequestsCreateFirstScreen')
                }}
              >
                <View style={{marginRight: 15, flexDirection: 'row'}}>
                  <View>
                    <Icon
                      name="arrow-forward"
                      type="material"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )
          }
        }}
      />
      <EquipmentRequestsStack.Screen
        name="EquipmentRequestsCreateFirstScreen"
        component={CreateFirstScreen}
        options={{
          title: 'Pedido (1/3)',
          headerRight: (props) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('EquipmentRequestsCreateSecondScreen')
                }}
              >
                <View style={{marginRight: 15, flexDirection: 'row'}}>
                  <View>
                    <Icon
                      name="arrow-forward"
                      type="material"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )
          }
        }}
      />
      <EquipmentRequestsStack.Screen
        name="EquipmentRequestsCreateSecondScreen"
        component={EquipmentInventoryScreen}
        initialParams={{
          isCartMode: true,
          ignoreTop: true
        }}
        options={{
          title: 'Pedido (2/3)',
          headerRight: (props) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('EquipmentRequestsCreateThirdScreen')
                }}
              >
                <View style={{marginRight: 15, flexDirection: 'row'}}>
                  <View>
                    <Icon
                      name="arrow-forward"
                      type="material"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )
          }
        }}
      />
      <EquipmentRequestsStack.Screen
        name="EquipmentRequestsCreateThirdScreen"
        component={CreateThirdScreen}
        options={{
          title: 'Pedido (3/3)'
        }}
      />
    </EquipmentRequestsStack.Navigator>
  )
}

const styles = StyleSheet.create({})

export default EquipmentRequestsScreen


