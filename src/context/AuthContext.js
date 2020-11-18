import React, {useContext} from 'react'
import createDataContext from './createDataContext'
import inopack from '../api/inopack'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {call} from 'react-native-reanimated'

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signin':
      return {...state, token: action.payload}
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
    console.log(e)
    callback(false)
  }
}

export const {Provider, Context} = createDataContext(
  authReducer,
  {login},
  {token: null}
)