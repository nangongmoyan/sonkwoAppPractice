/**
 *
 * created by lijianpo on 2021/04/28
 */

import { combineReducers } from 'redux'
import { WALLET } from '@util/action_types'

function wallet(state = { status: 'disabled', balance: 0 }, action) {
  switch (action.type) {
    case WALLET.SET_WALLET:
      return Object.assign({}, state, action.data)
    default:
      return state
  }
}

const WalletReducer = combineReducers({
  wallet,
})

export default WalletReducer
