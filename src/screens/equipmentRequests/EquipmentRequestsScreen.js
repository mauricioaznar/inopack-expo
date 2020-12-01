import React, {useContext, useState} from 'react'
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import { CommonActions } from '@react-navigation/native';
import { Icon} from 'react-native-elements'
import EquipmentRequestsListScreen from './ListScreen'
import {Context as EquipmentContext, Provider as EquipmentProvider} from '../../context/EquipmentContext'
import CreateFirstScreen from './CreateFirstScreen'
import EquipmentInventoryScreen
  from '../equipmentInventory/EquipmentInventoryScreen'
import EquipmentQuantityDetailScreen from './EquipmentQuantityDetailScreen'
import HeaderRightButton from '../../components/HeaderRightButton'
import moment from 'moment'
import dateFormat from '../../helpers/dateFormat'
import requestedEquipments from './helpers/filters'


const EquipmentRequestsStack = createStackNavigator()

const EquipmentRequestsScreen = ({navigation}) => {
  const {
    description,
    dateEmitted,
    dateEstimatedDelivery,
    equipments,
    postEquipmentRequest,
    resetEquipmentRequestsForm,
    toggleQuantityFilter,
    quantityFilter
  } = useContext(EquipmentContext)

  const [disableSave, setDisableSave] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const firstStepCompleted = moment(dateEmitted, dateFormat).isValid()
    && moment(dateEstimatedDelivery, dateFormat)
    && description.length > 10

  const secondStepCompleted = requestedEquipments(equipments).length > 0

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
          title: 'Nuevo pedido (1/2)',
          headerRight: (props) => {
            return (
              firstStepCompleted
              ? <HeaderRightButton
                  onPress={() => {
                    navigation.navigate('EquipmentRequestsCreateSecondScreen')
                  }}
                  iconName="arrow-forward"
                />
              : <HeaderRightButton
                  disabled={true}
                  iconName="clear"
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
          title: 'Nuevo pedido (2/2)',
          headerRight: (props) => {
            return (
              <View style={{flexDirection: 'row'}}>
                <HeaderRightButton
                  onPress={() => {
                    toggleQuantityFilter()
                  }}
                  iconName={quantityFilter ? "filter-remove" : 'filter' }
                  iconType="material-community"
                />
                {
                  secondStepCompleted
                    ? <HeaderRightButton
                        loading={loading}
                        disabled={disableSave}
                        onPress={async () => {
                          setLoading(true)
                          setDisableSave(true)
                          await postEquipmentRequest(
                            dateEmitted,
                            dateEstimatedDelivery,
                            description,
                            requestedEquipments(equipments)
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
                    : <HeaderRightButton
                        disabled={true}
                        iconName="clear"
                      />
                }
              </View>
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


