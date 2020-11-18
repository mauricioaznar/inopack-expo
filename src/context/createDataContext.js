import React from 'react'
import {createContext, useReducer} from 'react'

export default (reducer, actions, defaultValue) => {
  const Context = createContext()

  const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, defaultValue)

    const boundActions = {}

    for (let key in actions) {
      if (actions.hasOwnProperty(key)) {
        boundActions[key] = actions[key](dispatch)
      }
    }

    return (
      <Context.Provider value={{...state, ...boundActions}}>
        {children}
      </Context.Provider>
    )
  }

  return {Context: Context, Provider: Provider}
}