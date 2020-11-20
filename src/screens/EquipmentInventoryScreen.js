import React, {useCallback, useState} from 'react'
import {Text, FlatList, StyleSheet, SectionList} from 'react-native'
import {useFocusEffect} from '@react-navigation/native'
import {SafeAreaView} from 'react-native-safe-area-context'
import inopack from '../api/inopack'
import {SearchBar, ListItem, Badge} from 'react-native-elements'
import Spacer from '../components/Spacer'

const EquipmentInventoryScreen = (props) => {
  const [equipmentSections, setEquipmentSections] = useState([])
  const [searchedText, setSearchedText] = useState('')

  const filteredSections = equipmentSections
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

  useFocusEffect(useCallback(() => {

      let isActive = true

      const fetchEquipmentData = async () => {
        try {
          const equipmentInventoryResult = await inopack.get('stats/equipmentInventory')
          const equipmentSubcategoryResult = await inopack.get('equipmentSubcategory/list?simple=true&paginate=false')
          let equipmentInventory = equipmentInventoryResult.data.data
          let equipmentSubcategories = equipmentSubcategoryResult.data.data
          if (isActive) {
            const equipmentSections = equipmentSubcategories
              .map(eSubcategory => {
                return {
                  id: eSubcategory.id,
                  title: eSubcategory.name,
                  data: equipmentInventory
                    .filter(eq => eq.equipment_subcategory_id === eSubcategory.id)
                    .map(eq => {
                      return {
                        equipment_id: eq.equipment_id,
                        equipment_balance: eq.equipment_balance,
                        equipment_description: eq.equipment_description,
                        equipment_subcategory_name: eq.equipment_subcategory_name
                      }
                    })
                }
              })
              .sort((a, b) => {
                return a.title > b.title ? 1 : a.title < b.title ? -1 : 0
              })
            setEquipmentSections(equipmentSections)
          }
        } catch (e) {
          console.log(e)
        }
      }

      fetchEquipmentData()

      return () => {
        isActive = false
      }
    }, [])
  )

  return (
    <SafeAreaView style={{flex: 1}}>
      <SearchBar
        platform={'android'}
        value={searchedText}
        onChangeText={setSearchedText}
      />
      <SectionList
        sections={filteredSections}
        keyExtractor={item => {
          return String(item.equipment_id)
        }}
        renderItem={({item}) => {
          return <ListItem>
            <Badge
              value={item.equipment_balance}
            />
            <ListItem.Title>{item.equipment_description}</ListItem.Title>
          </ListItem>
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