import React, {useContext, useState} from 'react'
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import { CommonActions } from '@react-navigation/native';
import { Icon} from 'react-native-elements'
import EquipmentRequestsListScreen from './ListScreen'
import {Context as EquipmentContext, Provider as EquipmentProvider} from '../../context/EquipmentContext'
import CreateFirstScreen from './CreateFirstScreen'
import CreateThirdScreen from './CreateThirdScreen'
import EquipmentInventoryScreen
  from '../equipmentInventory/EquipmentInventoryScreen'
import EquipmentQuantityDetailScreen from './EquipmentQuantityDetailScreen'


const EquipmentRequestsStack = createStackNavigator()

const EquipmentRequestsScreen = ({navigation}) => {
  const {
    description,
    dateEmitted,
    equipments,
    postEquipmentRequest,
    resetEquipmentRequestsForm
  } = useContext(EquipmentContext)
  const [disableSave, setDisableSave] = useState(false)

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
          hasQuantity: true,
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
          title: 'Pedido (3/3)',
          headerRight: (props) => {
            return (
              <TouchableOpacity
                disabled={disableSave}
                onPress={async () => {
                  setDisableSave(true)
                  await postEquipmentRequest(
                    dateEmitted,
                    description,
                    equipments.filter(e => e.quantity_requested > 0)
                  )
                  await resetEquipmentRequestsForm()
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [
                        { name: 'EquipmentRequestsList' },
                      ],
                    })
                  );
                }}
              >
                <View style={{marginRight: 15, flexDirection: 'row'}}>
                  <View>
                    <Icon
                      name="save"
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
        name="EquipmentQuantityDetailScreen"
        component={EquipmentQuantityDetailScreen}
        options={{
          title: 'Cantidad solicitada'
        }}
      />
    </EquipmentRequestsStack.Navigator>
  )
}

const styles = StyleSheet.create({})

export default EquipmentRequestsScreen


