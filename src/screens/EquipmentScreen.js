import React, {useContext, useEffect} from 'react'
import {View} from 'react-native'
import EquipmentListScreen
  from './equipmentTransactions/EquipmentListScreen'
import {Badge, Icon} from 'react-native-elements'
import EquipmentTransactionsScreen
  from './equipmentTransactions/EquipmentTransactionsScreen'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {
  Provider as EquipmentProvider,
  Context as EquipmentContext
} from '../context/EquipmentContext'
import LogoutScreen from './LogoutScreen'

const EquipmentScreen = ({}) => {
  const EquipmentTabs = createBottomTabNavigator()

  const {getEquipments, getEquipmentSubcategories} = useContext(EquipmentContext)

  useEffect(() => {
    const fetchData = async () => {
      await getEquipments()
      await getEquipmentSubcategories()
    }
    fetchData()
  }, [])

  return (
    <EquipmentTabs.Navigator
      initialRouteName="EquipmentTransactions"
    >
      <EquipmentTabs.Screen
        name="EquipmentList"
        component={EquipmentListScreen}
        options={{
          title: "Inventario",
          tabBarIcon: ({color, size}) => {
            return (<Icon
              type="material"
              name="storage"
              size={size}
              color={color}
            />)
          },
        }}
      />
      <EquipmentTabs.Screen
        name="EquipmentTransactions"
        component={EquipmentTransactionsScreen}
        options={{
          title: "Pedidos",
          tabBarIcon: ({color, size}) => {
            return (
              <View>
                <Icon
                  type="font-awesome-5"
                  name="shopping-bag"
                  size={size}
                  color={color}
                />
              </View>
            )
          }
        }}
      />
      <EquipmentTabs.Screen
        name="LogoutScreen"
        component={LogoutScreen}
        options={{
          title: 'Cuenta',
          tabBarIcon: ({color, size}) => {
            return (
              <View>
                <Icon
                  type="material-community"
                  name="logout"
                  size={size}
                  color={color}
                />
              </View>
            )
          }
        }}
      >

      </EquipmentTabs.Screen>
    </EquipmentTabs.Navigator>
  )
}

export default () => {
  return (
    <EquipmentProvider>
      <EquipmentScreen />
    </EquipmentProvider>
  )
}