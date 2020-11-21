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

export const {Provider, Context} = createDataContext(
  equipmentReducer,
  {addToCart, removeFromCart},
  {
    cart: []
  }
)