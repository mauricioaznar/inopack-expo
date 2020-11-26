import React, {useContext, useEffect, useState} from 'react'
import {View, StyleSheet, SafeAreaView} from 'react-native'
import {Button, Text, Icon, Image} from 'react-native-elements'
import {Context as EquipmentContext} from '../../context/EquipmentContext'
import Spacer from '../../components/Spacer'
import imageUrl from '../../api/imageUrl'
import Loader from '../../components/Loader'


const EquipmentQuantityDetailScreen = ({route, navigation}) => {
  const {equipments, updateEquipmentQuantity} = useContext(EquipmentContext)
  const [quantity, setQuantity] = useState(0)
  const [equipment, setEquipment] = useState(null)

  useEffect(() => {
    const id = route.params?.id
    const e = equipments.find(e => e.equipment_id === id)
    setQuantity(e && e.quantity_requested ? e.quantity_requested : 0)
    setEquipment(e)
  }, [])

  const increase = () => {
    setQuantity(quantity + 1)
  }

  const decrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1)
    }
  }

  return (
     !!equipment
       ? <SafeAreaView style={{flex: 1}}>
          <Spacer>
            <Text h4>
              {equipment.equipment_description + ` ${equipment.equipment_id}`}
            </Text>
            <Text>
              {imageUrl + equipment.equipment_id + '.jpg'}
            </Text>
          </Spacer>

          <Spacer>
            <Image
              style={{ width: '100%', height: undefined, aspectRatio: 1 }}
              source={{
                uri: imageUrl + equipment.equipment_id + '.jpg'
              }}
            >
            </Image>
          </Spacer>

          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <Spacer>
              <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Button
                  title=""
                  icon={() => {
                    return <Icon
                      name='remove'
                      type='material'
                      color="white"
                      size={40}
                    />
                  }}
                  onPress={decrease}
                />
                <Text
                  h4
                  style={{alignSelf: 'center'}}
                >
                  {quantity}
                </Text>
                <Button
                  title=""
                  icon={() => {
                    return <Icon
                      name='add'
                      type='material'
                      color="white"
                      size={40}
                    />
                  }}
                  onPress={increase}
                />
              </View>
            </Spacer>

            <Spacer>
              <Button
                title={
                  'Aceptar'
                }
                onPress={() => {
                  updateEquipmentQuantity(equipment, quantity)
                  navigation.goBack()
                }}
              >
              </Button>
            </Spacer>
          </View>
        </SafeAreaView>
       : <Loader />
  )
}

export default EquipmentQuantityDetailScreen

const styles = StyleSheet.create({})
