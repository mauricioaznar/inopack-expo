import React from 'react'
import createDataContext from './createDataContext'

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

export const {Provider, Context} = createDataContext(
  equipmentReducer,
  {
    addToCart,
    removeFromCart,
    setDescription,
    setDateEmitted,
    addQuantity,
    removeQuantity,
  },
  {
    cart: [],
    description: '',
    dateEmitted: ''
  }
)