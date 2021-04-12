/**
 *
 * created by lijianpo on 2021/04/12
 */
import { combineReducers } from 'redux'
import { USER } from '@util/action_types'
// import { deviceStorage } from '@util'

const defaultUserInfo = {
  id: '',
}

function userInfo(state = defaultUserInfo, action) {
  switch (action.type) {
    case USER.SET_USER_INFO:
      return action.data
    case USER.UPDATE_USER_INFO:
      return Object.assign({}, state, action.data)
    case USER.CLEAR_USER_INFO:
      // deviceStorage.delete('userInfo')
      return { ...defaultUserInfo }
    default:
      return state
  }
}

const UserReducer = combineReducers({
  userInfo,
})

export default UserReducer
