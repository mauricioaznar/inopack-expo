import React, {useContext} from 'react'
import createDataContext from './createDataContext'
import inopack from '../api/inopack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import sleep from '../helpers/sleep'

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signin':
      return {...state, token: action.payload, firstTry: true}
    case 'first_try':
      return {...state, firstTry: true}
    case 'signout':
      return {...state, token: null}
    case 'error_message':
      return {...state, errorMessage: action.payload}
    default:
      return state
  }
}

const login = dispatch => async (email, password, callback) => {
  try {
    dispatch({type: 'error_message', payload: ''})
    const result = await inopack.post('auth/login', {email, password})
    const token = result.data.data.token
    await AsyncStorage.setItem('token', token)
    dispatch({type: 'signin', payload: token})
    if (callback) {
      callback(true)
    }
  } catch (e) {
    dispatch({type: 'error_message', payload: 'Hubo un error. Por favor, vuelva a intentarlo'})
    if (callback) {
      callback(false)
    }
  }
}

const logout = dispatch => async () => {
  try {
    await AsyncStorage.removeItem('token')
    dispatch({type: 'signout'})
  } catch (e) {

  }
}

const initialTry = dispatch => async (email, password, callback) => {
  dispatch({type: 'first_try'})
}

export const {Provider, Context} = createDataContext(
  authReducer,
  {
    login,
    initialTry,
    logout,
  },
  {
    token: null,
    firstTry: false
  }
)