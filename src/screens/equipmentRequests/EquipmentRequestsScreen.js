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
import HeaderRightButton from '../../components/HeaderRightButton'
import sleep from '../../helpers/sleep'


const EquipmentRequestsStack = createStackNavigator()

const EquipmentRequestsScreen = ({navigation}) => {
  const {
    description,
    dateEmitted,
    dateEstimatedDelivery,
    equipments,
    postEquipmentRequest,
    resetEquipmentRequestsForm
  } = useContext(EquipmentContext)

  const [disableSave, setDisableSave] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  return (
    <EquipmentRequestsStack.Navigator>
      <EquipmentRequestsStack.Screen
        name="EquipmentRequestsList"
        component={EquipmentRequestsListScreen}
        options={{
          title: "Pedidos",
          headerRight: (props) => {
            return (
              <HeaderRightButton
                onPress={() => {
                  navigation.navigate('EquipmentRequestsCreateFirstScreen')
                }}
                iconName="add"
              />
            )
          }
        }}
      />
      <EquipmentRequestsStack.Screen
        name="EquipmentRequestsCreateFirstScreen"
        component={CreateFirstScreen}
        options={{
          title: 'Nuevo pedido (1/3)',
          headerRight: (props) => {
            return (
              <HeaderRightButton
                onPress={() => {
                  navigation.navigate('EquipmentRequestsCreateSecondScreen')
                }}
                iconName="arrow-forward"
              />
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
              <HeaderRightButton
                onPress={() => {
                  navigation.navigate('EquipmentRequestsCreateThirdScreen')
                }}
                iconName="arrow-forward"
              />
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
              <HeaderRightButton
                loading={loading}
                disabled={disableSave}
                onPress={async () => {
                  setLoading(true)
                  setDisableSave(true)
                  await postEquipmentRequest(
                    dateEmitted,
                    dateEstimatedDelivery,
                    description,
                    equipments.filter(e => e.quantity_requested > 0)
                  )
                  await resetEquipmentRequestsForm()
                  setLoading(false)
                  setSuccess(true)
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [
                        { name: 'EquipmentRequestsList' },
                      ],
                    })
                  );
                  setSuccess(false)
                }}
                iconName={success ? 'check' : 'save'}
              />
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


