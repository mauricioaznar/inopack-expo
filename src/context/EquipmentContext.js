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
    case 'set_equipments':
    {
      return {...state, equipments: action.payload}
    }
    case 'set_equipment_subcategories':
    {
      return {...state, equipmentSubcategories: action.payload}
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
    getEquipmentSubcategories
  },
  {
    equipments: [],
    equipmentSubcategories: [],
    cart: [],
    description: '',
    dateEmitted: ''
  }
)