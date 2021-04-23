/**
 *
 * created by lijianpo on 2021/04/14
 */

import { authApi, config } from '@sonkwo/sonkwo-api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { deviceStorage, toastShort } from '@util'
import { NativeModules } from 'react-native'
import store from '../store'
import { USER } from '@util/action_types'
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
