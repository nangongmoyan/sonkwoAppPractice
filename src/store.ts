/**
 *
 * created by lijianpo on 2021/04/12
 */
import thunk from 'redux-thunk'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import UserReducer from './reducers/user_reducer'
import WalletReducer from './reducers/wallet_reducer'

const rootReducer = combineReducers({
  UserReducer,
  WalletReducer,
})
const middleware = []
middleware.push(thunk)

const logger = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    console.log('dispatch a function')
  } else {
    console.log('dispatch', action)
  }
  const result = next(action)
  console.log('nextState', store.getState())
  return result
}

if (__DEV__) {
  middleware.push(logger)
}

export type RootState = ReturnType<typeof rootReducer>
const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: false,
})

export default store
