/**
 *
 * created by lijianpo on 2021/04/14
 */

import { authApi } from '@sonkwo/sonkwo-api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
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

export const signInWithSms = createAsyncThunk(
  'auth/signInWithSms',
  async (params, thunkApi) => {
    const { data, signParams } = params
    const result = await authApi.signInBySms(...data)
    console.log({ result })
  },
)
