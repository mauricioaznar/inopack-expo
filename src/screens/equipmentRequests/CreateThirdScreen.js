import React, {useContext} from 'react'
import {FlatList, View} from 'react-native'
import {ButtonGroup, Icon, ListItem, Text} from 'react-native-elements'
import {Context as EquipmentContext} from '../../context/EquipmentContext'

const CreateThirdScreen = (props) => {

  const {
    equipments
  } = useContext(EquipmentContext)

  const filteredEquipments = equipments
    .filter(e => e.quantity_requested > 0)

  return (
    <View>
      <FlatList
        keyExtractor={item => String(item.equipment_id)}
        data={filteredEquipments}
        renderItem={({item}) => {
          return (
            <ListItem
              bottomDivider
            >
              <ListItem.Content>
                <ListItem.Title>
                  {item.equipment_description}
                </ListItem.Title>
              </ListItem.Content>
              <View style={{flexDirection: 'row'}}>
                <Text style={{alignSelf: 'center', marginHorizontal: 10}}>
                  {item.quantity_requested}
                </Text>
              </View>
            </ListItem>
          )
        }}
      />
    </View>
  )
}

export default CreateThirdScreen