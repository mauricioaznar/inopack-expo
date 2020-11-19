import React, {useContext} from 'react'
import createDataContext from './createDataContext'
import inopack from '../api/inopack'
import AsyncStorage from '@react-native-async-storage/async-storage'

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signin':
      return {...state, token: action.payload, firstTry: true}
    case 'first_try':
      return {...state, firstTry: true}
    default:
      return state
  }
}

const login = dispatch => async (email, password, callback) => {
  try {
    const result = await inopack.post('auth/login', {email, password})
    const token = result.data.data.token
    await AsyncStorage.setItem('token', token)
    dispatch({type: 'signin', payload: token})
    if (callback) {
      callback(true)
    }
  } catch (e) {
    if (callback) {
      callback(false)
    }
  }
}

const initialTry = dispatch => async (email, password, callback) => {
  dispatch({type: 'first_try'})
}

export const {Provider, Context} = createDataContext(
  authReducer,
  { login, initialTry },
  { token: null, firstTry: false }
)