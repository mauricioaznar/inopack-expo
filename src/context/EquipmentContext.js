import React from 'react'
import createDataContext from './createDataContext'
import inopack from '../api/inopack'
import {filterEquipmentsByQuantity}
  from '../screens/equipmentTransactions/helpers/filters'
import dateFormat from '../helpers/dateFormat'
import moment from 'moment'

const equipmentReducer = (state, action) => {
  switch(action.type) {
    case 'set_description':
      return {...state, description: action.payload}
    case 'set_date_emitted':
      return {...state, dateEmitted: action.payload}
    case 'set_date_estimated_delivery':
      return {...state, dateEstimatedDelivery: action.payload}
    case 'update_equipment_quantity':
      {
        const newEquipments = state.equipments.slice()
        const index = newEquipments.findIndex(eq => {
          return eq.equipment_id === action.payload.equipment.equipment_id
        })
        const newEquipment = {...newEquipments[index]}
        newEquipment.quantity_requested = action.payload.quantity
        newEquipments[index] = newEquipment
        return {...state, equipments: newEquipments}
      }
    case 'set_equipments':
    {
      const equipments = action.payload
        .map((equipment) => {
          return {...equipment, quantity_requested: 0}
        })
      return {...state, equipments: equipments}
    }
    case 'set_equipment_subcategories':
    {
      return {...state, equipmentSubcategories: action.payload}
    }
    case 'set_equipment_transaction':
    {
      return {
        ...state,
        equipmentTransaction: action.payload,
      }
    }
    case 'toggle_quantity_filter':
    {
      return {...state, quantityFilter: !state.quantityFilter}
    }
    case 'reset':
    {
      return {
        ...state,
        description: '',
        dateEmitted: moment().format(dateFormat),
        dateEstimatedDelivery: '',
        equipments: state.equipments
          .map((equipment) => {
            return {...equipment, quantity_requested: 0}
          }),
        equipment_transaction: {},
        quantityFilter: false
      }
    }
    default:
      return state
  }
}

const setDescription = dispatch => (description) => {
  dispatch({type: 'set_description', payload: description})
}

const setDateEmitted = dispatch => (dateEmitted) => {
  dispatch({type: 'set_date_emitted', payload: dateEmitted})
}

const setDateEstimatedDelivery = dispatch => (dateEstimatedDelivery) => {
  dispatch({type: 'set_date_estimated_delivery', payload: dateEstimatedDelivery})
}

const getEquipments = dispatch => async () => {
  const equipmentResponse = await inopack.get('stats/equipmentInventory')
  const equipments = equipmentResponse.data.data
  dispatch({type: 'set_equipments', payload: equipments})
}

const getEquipmentSubcategories = dispatch => async () => {
  const equipmentSubcategoryResponse = await inopack.get('equipmentSubcategory/list?simple=true&paginate=false')
  const equipmentSubcategories = equipmentSubcategoryResponse.data.data
  dispatch({type: 'set_equipment_subcategories', payload: equipmentSubcategories})
}

const updateEquipmentQuantity = dispatch => (equipment, quantity) => {
  dispatch({type: 'update_equipment_quantity', payload: {equipment, quantity}})
}

const setEquipmentTransaction = dispatch => (equipmentTransaction) => {
  dispatch({type: 'set_equipment_transaction', payload: equipmentTransaction})
}

const postEquipmentTransaction = (dispatch, state) => async () => {
  const {
    dateEmitted,
    dateEstimatedDelivery,
    description,
    equipments,
    equipmentTransaction
  } = state
  const filteredEquipmentsByQuantity = filterEquipmentsByQuantity(equipments)
  const newEquipmentTransaction = {
    date_emitted: dateEmitted,
    date_estimated_delivery: dateEstimatedDelivery,
    description: description,
    equipment_transaction_type_id: 1,
    equipment_transaction_status_id: 1
  }
  let response
  if (equipmentTransaction.id) {
    response = await inopack.put('equipmentTransaction/' + equipmentTransaction.id, newEquipmentTransaction)
  } else {
    response = await inopack.post('equipmentTransaction', newEquipmentTransaction)
  }
  const promises = []
  let deletedEquipmentTransactionItems = [...equipmentTransaction.equipment_transaction_items]
  filteredEquipmentsByQuantity.forEach((equipment) => {
    let foundEquipmentItem = deletedEquipmentTransactionItems.find(eItem => {
      return eItem.equipment_id === equipment.equipment_id
    })
    if (foundEquipmentItem) {
      const updatedEquipmentItem = {
        ...foundEquipmentItem,
        quantity: equipment.quantity_requested
      }
      promises.push(inopack.put('equipmentTransactionItem/' + updatedEquipmentItem.id, updatedEquipmentItem))
    } else {
      const newEquipmentItem = {
        equipment_transaction_id: response.data.data.id,
        equipment_id: equipment.equipment_id,
        quantity: equipment.quantity_requested
      }
      promises.push(inopack.post('equipmentTransactionItem', newEquipmentItem))
    }
    deletedEquipmentTransactionItems = deletedEquipmentTransactionItems
      .filter(eItem => {
        return eItem.equipment_id !== equipment.equipment_id
      })
  })
  deletedEquipmentTransactionItems.forEach(eItem => {
    promises.push(inopack.put('equipmentTransactionItem/' + eItem.id, {active: -1}))
  })
  const responses = await Promise.all(promises)
}

const resetEquipmentTransactionForm = dispatch => async () => {
  dispatch({type: 'reset'})
}

const toggleQuantityFilter = dispatch => async () => {
  dispatch({type: 'toggle_quantity_filter'})
}

export const {Provider, Context} = createDataContext(
  equipmentReducer,
  {
    setDescription,
    setDateEmitted,
    setDateEstimatedDelivery,
    getEquipments,
    getEquipmentSubcategories,
    updateEquipmentQuantity,
    postEquipmentTransaction,
    resetEquipmentTransactionForm,
    toggleQuantityFilter,
    setEquipmentTransaction
  },
  {
    equipments: [],
    equipmentSubcategories: [],
    description: '',
    dateEmitted: moment().format(dateFormat),
    dateEstimatedDelivery: '',
    quantityFilter: false,
    equipmentTransaction: {}
  }
)