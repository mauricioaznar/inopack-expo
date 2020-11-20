import React from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Text, StyleSheet, Button, View} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import {Icon} from 'react-native-elements'

const EquipmentRequestsStack = createStackNavigator()

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>
        Home
      </Text>
      <Button
        title="Navigate to equipment request creation"
      />

    </SafeAreaView>
  )
}

const Notifications = () => {
  return (
    <Text>
      Notifications
    </Text>
  )
}

const EquipmentRequestsScreen = ({navigation}) => {
  return (
    <EquipmentRequestsStack.Navigator>
      <EquipmentRequestsStack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Pedidos",
          headerRight: (props) => {
            return (
              // TODO make into a separate component
              <View style={{marginRight: 10}}>
                <Icon
                  name="plus"
                  type="font-awesome-5"
                  onPress={() => {
                    navigation.navigate('Notifications')
                  }}
                />
              </View>
            )
          }
        }}
      />
      <EquipmentRequestsStack.Screen
        name="Notifications"
        title="Nuevo pedido"
        component={Notifications}
      />
    </EquipmentRequestsStack.Navigator>
  )
}

const styles = StyleSheet.create({})

export default EquipmentRequestsScreen


