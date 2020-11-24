import React, {useContext, useEffect, useState} from 'react'
import {
  Text,
  StyleSheet,
  SectionList, TouchableOpacity,
} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {SearchBar, ListItem, Badge} from 'react-native-elements'
import Spacer from '../../components/Spacer'
import {Context as EquipmentContext} from '../../context/EquipmentContext'

const EquipmentInventoryScreen = ({route, navigation}) => {
  const [equipmentSections, setEquipmentSections] = useState([])
  const [filteredSections, setFilteredSections] = useState([])
  const [searchedText, setSearchedText] = useState('')
  const {
    equipments,
    equipmentSubcategories
  } = useContext(EquipmentContext)

  let ignoreTop = route.params?.ignoreTop

  useEffect(() => {

    let eS = equipmentSubcategories
      .map(eSubcategory => {
        return {
          id: eSubcategory.id,
          title: eSubcategory.name,
          data: equipments
            .filter(eq => eq.equipment_subcategory_id === eSubcategory.id)
            .map(eq => {
              return {
                ...eq
              }
            })
        }
      })
      .sort((a, b) => {
        return a.title > b.title ? 1 : a.title < b.title ? -1 : 0
      })

    setEquipmentSections(eS)

  }, [equipments, equipmentSubcategories])

  useEffect(() => {

    let filteredEquipmentSections = equipmentSections
      .map(eS => {
        return {
          ...eS,
          data: eS.data
            .filter(eq => {
              return searchedText !== '' && eq.equipment_description && eq.equipment_subcategory_name ?
                eq.equipment_description.includes(searchedText) || eq.equipment_subcategory_name.includes(searchedText)
                : true
            })
        }
      })
      .filter(eS => {
        return eS.data.length > 0
      })

    setFilteredSections(filteredEquipmentSections)

  }, [searchedText, equipmentSections])


  let edges = ['right', 'bottom', 'left', 'top']

  if (ignoreTop) {
    edges = ['right', 'bottom', 'left']
  }

  return (
    <SafeAreaView
      style={{flex: 1}}
      edges={edges}
    >
      <SearchBar
        platform={'android'}
        value={searchedText}
        onChangeText={setSearchedText}
        containerStyle={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1
          },
          shadowOpacity: 0.20,
          shadowRadius: 1.41,
          elevation: 2
        }}
      />
      <SectionList
        sections={filteredSections}
        keyExtractor={item => {
          return String(item.equipment_id)
        }}
        renderItem={({item}) => {

          return <TouchableOpacity
            onPress={() => {
              navigation.navigate('EquipmentQuantityDetailScreen', {id: item.equipment_id})
            }}
          >
            <ListItem
              bottomDivider
            >
              <Badge
                value={item.equipment_balance}
              />
              <ListItem.Content>
                <ListItem.Title>{item.equipment_description}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
        }}
        renderSectionHeader={({section}) =>
          <Spacer>
            <Text style={{fontSize: 30}}>
              {section.title}
            </Text>
          </Spacer>
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

export default EquipmentInventoryScreen