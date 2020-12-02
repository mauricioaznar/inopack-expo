import React, {useContext, useState} from 'react'
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import { CommonActions } from '@react-navigation/native';
import EquipmentTransactionListScreen from './EquipmentTransactionsListScreen'
import CreateFirstScreen from './CreateFirstScreen'
import {Context as EquipmentContext} from '../../context/EquipmentContext'
import EquipmentListScreen
  from './EquipmentListScreen'
import EquipmentQuantityDetailScreen from './EquipmentQuantityDetailScreen'
import HeaderRightButton from '../../components/HeaderRightButton'
import moment from 'moment'
import dateFormat from '../../helpers/dateFormat'
import {filterEquipmentsByQuantity} from './helpers/filters'


const EquipmentRequestsStack = createStackNavigator()

const EquipmentTransactionsScreen = ({navigation}) => {
  const {
    description,
    dateEmitted,
    dateEstimatedDelivery,
    equipments,
    postEquipmentTransaction,
    resetEquipmentTransactionForm,
    toggleQuantityFilter,
    quantityFilter
  } = useContext(EquipmentContext)

  const [disableSave, setDisableSave] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const firstStepCompleted = moment(dateEmitted, dateFormat).isValid()
    && moment(dateEstimatedDelivery, dateFormat)
    && description.length > 10

  const secondStepCompleted = filterEquipmentsByQuantity(equipments).length > 0

  return (
    <EquipmentRequestsStack.Navigator>
      <EquipmentRequestsStack.Screen
        name="EquipmentTransactionList"
        component={EquipmentTransactionListScreen}
        options={{
          title: "Pedidos",
          headerRight: (props) => {
            return (
              <HeaderRightButton
                onPress={() => {
                  resetEquipmentTransactionForm()
                  navigation.navigate('EquipmentTransactionFormFirstScreen')
                }}
                iconName="add"
              />
            )
          }
        }}
      />
      <EquipmentRequestsStack.Screen
        name="EquipmentTransactionFormFirstScreen"
        component={CreateFirstScreen}
        options={{
          title: 'Nuevo pedido (1/2)',
          headerRight: (props) => {
            return (
              firstStepCompleted
              ? <HeaderRightButton
                  onPress={() => {
                    navigation.navigate('EquipmentTransactionFormSecondScreen')
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
        name="EquipmentTransactionFormSecondScreen"
        component={EquipmentListScreen}
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
                        await postEquipmentTransaction()
                        await resetEquipmentTransactionForm()
                        setLoading(false)
                        setSuccess(true)
                        navigation.dispatch(
                          CommonActions.reset({
                            index: 0,
                            routes: [
                              { name: 'EquipmentTransactionList' },
                            ],
                          })
                        );
                        setSuccess(false)
                        setDisableSave(false)
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

export default EquipmentTransactionsScreen


