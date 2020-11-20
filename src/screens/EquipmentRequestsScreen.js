import React, {useCallback, useState} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Text, FlatList, View, StyleSheet} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import {Badge, Icon, ListItem} from 'react-native-elements'
import {useFocusEffect} from '@react-navigation/native'
import inopack from '../api/inopack'


const EquipmentRequestsStack = createStackNavigator()

const EquipmentRequestsList = ({navigation}) => {
  const [requests, setRequests] = useState([])

  useFocusEffect(useCallback(() => {

    let isActive = true

    const fetchEquipmentRequests = async () => {
      const equipmentRequestsResult = await inopack.get('equipmentTransaction/list?' +
        'paginate=false&' +
        'filter_exact_1=equipment_transaction_type_id&' +
        'filter_exact_value_1=1')
      if (isActive) {
        const equipmentRequests = equipmentRequestsResult.data.data
          .map((eR) => {
            return {
              ...eR,
              title: eR.description,
              subtitle: `Refacciones solicitadas: ${eR.equipment_transaction_items.length}`
            }
          })
        setRequests(equipmentRequests)
      }
    }

    fetchEquipmentRequests()

    return () => {
      isActive = false
    }
  }, []))

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <FlatList
        data={requests}
        renderItem={({item}) => {
          return (
            <ListItem>
              <ListItem.Content>
                <ListItem.Title>
                  {item.title}
                </ListItem.Title>
                <ListItem.Subtitle>
                  {item.subtitle}
                </ListItem.Subtitle>
              </ListItem.Content>
              <Badge status={
                item.equipment_transaction_status_id === 1 ? 'error'
                : item.equipment_transaction_status_id === 2 ? 'success'
                : 'primary'
              } />
            </ListItem>
          )
        }}
        keyExtractor={(item) => String(item.id)}
      />
    </View>
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
        name="EquipmentRequestsList"
        component={EquipmentRequestsList}
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
                      navigation.navigate('Notifications')
                    }}
                  />
                </View>
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


