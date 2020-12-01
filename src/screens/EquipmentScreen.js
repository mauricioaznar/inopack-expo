import React, {useContext, useEffect} from 'react'
import {View} from 'react-native'
import EquipmentInventoryScreen
  from './equipmentInventory/EquipmentInventoryScreen'
import {Badge, Icon} from 'react-native-elements'
import EquipmentRequestsScreen
  from './equipmentRequests/EquipmentRequestsScreen'
import EquipmentWithdrawalScreen
  from './equipmentWithdrawal/EquipmentWithdrawalScreen'
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
      initialRouteName="EquipmentRequests"
    >
      <EquipmentTabs.Screen
        name="EquipmentInventory"
        component={EquipmentInventoryScreen}
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
        name="EquipmentRequests"
        component={EquipmentRequestsScreen}
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