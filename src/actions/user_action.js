/**
 *
 * created by lijianpo on 2021/04/14
 */

import { authApi, config, usersApi } from '@sonkwo/sonkwo-api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { deviceStorage, toastShort } from '@util'
import store from '../store'
import { USER } from '@util/action_types'
import { setWallet } from './wallet_action'
export const setUserInfo = (data) => ({
  type: USER.SET_USER_INFO,
  data,
})

export const updateUserInfo = (data) => ({
  type: USER.UPDATE_USER_INFO,
  data,
})

const clearUserInfo = () => ({
  type: USER.CLEAR_USER_INFO,
})

const setCheckin = (data) => ({
  type: USER.SET_CHECKIN,
  data,
})
const setAvatarToken = (data) => {
  return { type: SET_AVATAR_TOKEN, data }
}

const setTempAvatar = (data) => {
  return { type: USER.SET_TEMP_AVATAR, data }
}

const afterLogin = (res) => {
  const { id, region, accessToken } = res
  /**只针对大陆用户开放 */
  if (region && region !== 'cn') {
    return toastShort('仅对中国大陆开放')
  }

  // NativeModules.CookieManager.clearAll()
  deviceStorage.save('userInfo', res)
  // client.jwt(res.accessToken)
  // fetch.sendToken(res.accessToken, dispatch)
  config.setToken(accessToken)
  // dispatch(getUserInfo())//
  store.dispatch(updateUserInfo(res))
}

const afterLogout = (res) => {
  // const { id } = res
  // client.jwt('')
  // fetch.sendToken('', dispatch)
  store.dispatch(clearUserInfo())
}
const sendToken = (type) => (params, cb) => async (dispatch) => {
  const result = await authApi.sendValidateToken(params, type)
  if (result) {
    // dispatch(pushToast('sent_success'))
    cb && cb()
  } else {
  }
}

export const sendSms = sendToken('Sms')
export const sendEmail = sendToken('Email')

export const signInWithSms = (params, cb) => async (dispatch) => {
  const { data, signParams } = params
  const { phone, token } = data
  console.log({ data })
  const result = await authApi.signInBySms(phone, token)
  console.log({ result })
  if ('status' in result) {
  } else {
    afterLogin(result)
  }
}

export const signInWithPass = (params, cb) => async (dispatch) => {
  console.log({ params })
  const { account, password } = params
  const data = {
    account: {
      email_or_phone_number_eq: account,
      password: password,
      remember_me: true,
    },
  }
  const result = await authApi.signIn(data)
  console.log({ result })
  if ('status' in result) {
  } else {
    afterLogin(result)
  }
}

export const signOut = () => async (dispatch) => {
  const result = await authApi.signOut()
  console.log({ result })
  afterLogout()
}

export const refreshToken = (refresh_token) => async (dispatch) => {
  const result = await authApi.refreshToken(refresh_token)
  console.log({ result })
  if (result && result.refreshToken) {
    deviceStorage.update('userInfo', result)
    store.dispatch(updateUserInfo(result))
    store.dispatch(getUserInfo())
  } else {
    store.dispatch(clearUserInfo())
  }
}

export const getImageToken = async (dispatch) => {
  const result = await usersApi.getImageToken()
  console.log({ result })
  if (result) {
    dispatch(setAvatarToken(result))
  }
}

const defaultAuthQuery = {
  gender: true,
  birthday: true,
  email_asterisks: true,
  phone_number_asterisks: true,
  show_steam_review: true,
  credential_num_asterisks: true,
  real_name_asterisks: true,
  platforms: {
    show_id: true,
    kind: true,
  },
  point: {
    score: true,
    xp: true,
    tasks: true,
    history_score: true,
  },
  wallet: {
    balance: true,
    status: true,
  },
  configs: {
    id: true,
    kind: true,
    key: true,
    value: true,
  },
}
export const getUserInfo = () => async (dispatch) => {
  const res = await usersApi.queryAuthUserInfo(defaultAuthQuery)
  console.log({ res })
  // const res = await queryAuthUserInfo()
  const {
    avatar,
    nickname,
    birthday,
    emailAsterisks,
    phoneNumberAsterisks,
    credentialNumAsterisks,
    realNameAsterisks,
    gender,
    showSteamReview,
    platforms,
    point = { tasks: {} },
    wallet,
    configs,
  } = res

  wallet && dispatch(setWallet(wallet))

  if (point.tasks.clockIn && +point.tasks.clockIn > 0) {
    dispatch(setCheckin(true))
  }

  const platform =
    platforms?.reduce((p, c) => {
      p[c.kind] = c.showId
      return p
    }, {}) || {}

  deviceStorage.update('userInfo', {
    phone_number: phoneNumberAsterisks,
    credential_num: credentialNumAsterisks,
  })
  dispatch(
    updateUserInfo({
      nickname,
      avatar,
      birthday,
      email: emailAsterisks,
      phone_number: phoneNumberAsterisks,
      credential_num: credentialNumAsterisks,
      real_name: realNameAsterisks,
      gender,
      showSteamReview,
      point,
      configs,
      ...platform,
    }),
  )
}
