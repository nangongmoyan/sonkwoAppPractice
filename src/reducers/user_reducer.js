/**
 *
 * created by lijianpo on 2021/04/12
 */
import { combineReducers } from 'redux'
import { USER } from '@util/action_types'
import { deviceStorage } from '@util'

const defaultUserInfo = {
  id: '',
  nick_name: '',
  gender: 2,
  credential_num: '',
  email: '',
  phone_number: '',
  set_password: true,
  show_steam_review: 'hidden',
  steam: null,
  wechat: null,
  weibo: null,
  real_name: '',
  accessToken: '',
  refresh_token: '',
  point: {
    score: 0,
    xp: 0,
  },
  configs: [],
}

function userInfo(state = defaultUserInfo, action) {
  switch (action.type) {
    case USER.SET_USER_INFO:
      return action.data
    case USER.UPDATE_USER_INFO:
      return Object.assign({}, state, action.data)
    case USER.CLEAR_USER_INFO:
      deviceStorage.delete('userInfo')
      return { ...defaultUserInfo }
    default:
      return state
  }
}

function avatarInfo(state = {}, action) {
  switch (action.type) {
    case USER.SET_TEMP_AVATAR:
      return Object.assign({}, state, { image: action.data })
    case USER.SET_AVATAR_TOKEN:
      return Object.assign({}, { token: action.data, image: null })
    default:
      return state
  }
}

function checkin(state = false, action) {
  switch (action.type) {
    case USER.SET_CHECKIN:
      return action.data
    default:
      return state
  }
}

const UserReducer = combineReducers({
  checkin,
  userInfo,
  avatarInfo,
})

export default UserReducer
