import React, {useCallback, useContext, useState} from 'react'
import {useFocusEffect} from '@react-navigation/native'
import inopack from '../../api/inopack'
import {FlatList, TouchableOpacity, View} from 'react-native'
import {Badge, ListItem} from 'react-native-elements'
import {Context as EquipmentContext} from '../../context/EquipmentContext'


const EquipmentRequestsListScreen = ({navigation}) => {
  const [requests, setRequests] = useState([])
  const {
    setDescription,
    setEquipmentTransaction,
    setDateEmitted,
    setDateEstimatedDelivery,
    updateEquipmentQuantity,
    resetEquipmentTransactionForm,
    toggleQuantityFilter
  } = useContext(EquipmentContext)


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
            <TouchableOpacity
              onPress={() => {
                resetEquipmentTransactionForm()
                const {
                  date_emitted: dateEmitted,
                  date_estimated_delivery: dateEstimatedDelivery,
                  description,
                  equipment_transaction_items: equipmentTransactionItems
                } = item
                setEquipmentTransaction(item, equipmentTransactionItems)
                setDescription(description)
                setDateEstimatedDelivery(dateEstimatedDelivery)
                setDateEmitted(dateEmitted)
                equipmentTransactionItems.forEach(equipmentTransactionItem => {
                  updateEquipmentQuantity(
                    equipmentTransactionItem,
                    equipmentTransactionItem.quantity
                  )
                })
                toggleQuantityFilter()
                navigation.navigate('EquipmentTransactionFormFirstScreen')
              }}
            >
              <ListItem
                bottomDivider
              >
                <ListItem.Content>
                  <ListItem.Title>
                    {item.title}
                  </ListItem.Title>
                  <ListItem.Subtitle>
                    {item.subtitle}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <Badge
                  status={
                    item.equipment_transaction_status_id === 1 ? 'error'
                      : item.equipment_transaction_status_id === 2 ? 'success'
                      : 'primary'
                  }
                  size="large"
                  value={" "}
                />
              </ListItem>
            </TouchableOpacity>
          )
        }}
        keyExtractor={(item) => String(item.id)}
      />
    </View>
  )
}

export default EquipmentRequestsListScreen