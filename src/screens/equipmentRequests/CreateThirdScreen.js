import React, {useContext} from 'react'
import {FlatList, View} from 'react-native'
import {ButtonGroup, Icon, ListItem, Text} from 'react-native-elements'
import {Context as EquipmentContext} from '../../context/EquipmentContext'

const CreateThirdScreen = (props) => {

  const {
    cart,
    addQuantity,
    removeQuantity
  } = useContext(EquipmentContext)

  return (
    <View>
      <FlatList
        keyExtractor={item => String(item.equipment_id)}
        data={cart}
        renderItem={({item}) => {
          return (
            <ListItem>
              <ListItem.Content>
                <ListItem.Title>
                  {item.equipment_description}
                </ListItem.Title>
              </ListItem.Content>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  type="font-awesome-5"
                  name="plus"
                  raised
                  onPress={() => {
                    addQuantity(item)
                  }}
                />
                <Icon
                  type="font-awesome-5"
                  name="minus"
                  raised
                  onPress={() => {
                    removeQuantity(item)
                  }}
                />
                <Text h4 style={{alignSelf: 'center', marginHorizontal: 10}}>
                  {item.quantity}
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