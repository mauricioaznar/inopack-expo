import React, {useContext} from 'react'
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

const EquipmentScreen = ({}) => {
  const EquipmentTabs = createBottomTabNavigator()

  const {cart} = useContext(EquipmentContext)

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
            return (<Icon type="material" name="storage" size={size} color={color} />)
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
                <Icon type="font-awesome-5" name="shopping-bag" size={size} color={color} />
                {
                  cart.length > 0
                    ? <Badge
                      status="error"
                      value={cart.length}
                      containerStyle={{ position: 'absolute', top: -3, right: -7 }}
                    />
                    : null
                }
              </View>
            )
          }
        }}
      />
      <EquipmentTabs.Screen
        name="EquipmentWithdrawals"
        component={EquipmentWithdrawalScreen}
        options={{
          title: "Retiros"
        }}
      />
    </EquipmentTabs.Navigator>
  )
}

export default  () => {
  return (
    <EquipmentProvider>
      <EquipmentScreen/>
    </EquipmentProvider>
  )
}