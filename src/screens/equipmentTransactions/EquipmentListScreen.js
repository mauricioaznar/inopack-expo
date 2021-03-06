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
import {filterEquipmentsByQuantity} from './helpers/filters'

const EquipmentListScreen = ({route, navigation}) => {
  const [equipmentSections, setEquipmentSections] = useState([])
  const [filteredSections, setFilteredSections] = useState([])
  const [searchedText, setSearchedText] = useState('')
  const {
    equipments,
    equipmentSubcategories,
    quantityFilter
  } = useContext(EquipmentContext)

  let ignoreTop = route.params?.ignoreTop
  let hasQuantity = route.params?.hasQuantity

  useEffect(() => {

    let eS = equipmentSubcategories
      .map(eSubcategory => {

        let filteredEquipments = equipments
          .filter(eq => eq.equipment_subcategory_id === eSubcategory.id)
          .map(eq => {
            return {
              ...eq
            }
          })

        if (hasQuantity && quantityFilter) {
          filteredEquipments = filterEquipmentsByQuantity(filteredEquipments)
        }

        return {
          id: eSubcategory.id,
          title: eSubcategory.name,
          data: filteredEquipments
        }
      })
      .sort((a, b) => {
        return a.title > b.title ? 1 : a.title < b.title ? -1 : 0
      })

    setEquipmentSections(eS)

  }, [equipments, equipmentSubcategories, quantityFilter])

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
            disabled={!hasQuantity}
            onPress={() => {
              if (hasQuantity) {
                navigation.navigate('EquipmentQuantityDetailScreen', {id: item.equipment_id})
              }
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
              {
                hasQuantity && item.quantity_requested > 0
                  ? <Text>{item.quantity_requested}</Text> : null
              }
              {
                hasQuantity ? <ListItem.Chevron /> : null
              }
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

export default EquipmentListScreen