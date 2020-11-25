import React from 'react'
import createDataContext from './createDataContext'
import inopack from '../api/inopack'

const equipmentReducer = (state, action) => {
  switch(action.type) {
    case 'add_to_cart':
      return {...state, cart: [...state.cart, action.payload]}
    case 'remove_from_cart':
      return {...state, cart: state.cart.filter(e => {
          return e.equipment_id !== action.payload.equipment_id
        })
      }
    case 'set_description':
      return {...state, description: action.payload}
    case 'set_date_emitted':
      return {...state, dateEmitted: action.payload}
    case 'add_quantity':
      {
        const newCart = state.cart.slice()
        const index = newCart.findIndex(eq => {
          return eq.equipment_id === action.payload.equipment_id
        })
        const newEquipment = {...newCart[index]}
        newEquipment.quantity += 1
        newCart[index] = newEquipment
        return {...state, cart: newCart}
      }
    case 'remove_quantity':
      {
        const newCart = state.cart.slice()
        const index = newCart.findIndex(eq => {
          return eq.equipment_id === action.payload.equipment_id
        })
        const newEquipment = {...newCart[index]}
        newEquipment.quantity -= 1
        newCart[index] = newEquipment
        return {...state, cart: newCart}
      }
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
    case 'reset':
    {
      return {
        ...state,
        description: '',
        dateEmitted: '',
        equipments: state.equipments
          .map((equipment) => {
            return {...equipment, quantity_requested: 0}
          })
      }
    }
    default:
      return state
  }
}

const addToCart = dispatch => (equipment) => {
  dispatch({type: 'add_to_cart', payload: equipment})
}

const removeFromCart = dispatch => (equipment) => {
  dispatch({type: 'remove_from_cart', payload: equipment})
}

const setDescription = dispatch => (description) => {
  dispatch({type: 'set_description', payload: description})
}

const setDateEmitted = dispatch => (dateEmitted) => {
  dispatch({type: 'set_date_emitted', payload: dateEmitted})
}

const addQuantity = dispatch => (equipment) => {
  dispatch({type: 'add_quantity', payload: equipment})
}

const removeQuantity = dispatch => (equipment) => {
  dispatch({type: 'remove_quantity', payload: equipment})
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

const postEquipmentRequest = dispatch => async (dateEmitted, description, equipments) => {
  const newEquipmentRequest = {
    date_emitted: dateEmitted,
    description: description,
    equipment_transaction_type_id: 1,
    equipment_transaction_status_id: 1
  }
  const response = await inopack.post('equipmentTransaction', newEquipmentRequest)
  const promises = []
  equipments.forEach((equipment) => {
    const newEquipmentItem = {
      equipment_transaction_id: response.data.data.id,
      equipment_id: equipment.equipment_id,
      quantity: equipment.quantity_requested
    }
    promises.push(inopack.post('equipmentTransactionItem', newEquipmentItem))
  })
  const responses = await Promise.all(promises)
}

const resetEquipmentRequestsForm = dispatch => async () => {
  dispatch({type: 'reset'})
}

export const {Provider, Context} = createDataContext(
  equipmentReducer,
  {
    addToCart,
    removeFromCart,
    setDescription,
    setDateEmitted,
    addQuantity,
    removeQuantity,
    getEquipments,
    getEquipmentSubcategories,
    updateEquipmentQuantity,
    postEquipmentRequest,
    resetEquipmentRequestsForm
  },
  {
    equipments: [],
    equipmentSubcategories: [],
    cart: [],
    description: '',
    dateEmitted: ''
  }
)