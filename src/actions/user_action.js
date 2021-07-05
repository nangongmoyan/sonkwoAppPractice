/**
 *
 * created by lijianpo on 2021/04/14
 */

import { authApi, tokenMessageApi, usersApi } from '@sonkwo/sonkwo-api'
import { checkNullObj, deviceStorage, toastMessage } from '@util'
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

export const clearUserInfo = () => ({
  type: USER.CLEAR_USER_INFO,
})

const setCheckin = (data) => ({
  type: USER.SET_CHECKIN,
  data,
})
const setAvatarToken = (data) => {
  return { type: USER.SET_AVATAR_TOKEN, data }
}

const setTempAvatar = (data) => {
  return { type: USER.SET_TEMP_AVATAR, data }
}

export const sendSms = (message) => async () => {
  try {
    const result = await tokenMessageApi.sendToken(message)
    console.log({ result })
    toastMessage('发送成功')
  } catch (e) {
    console.log({ e })
  }
}

export const signInBySms = (params, cb) => async () => {
  console.log({ params })
  const { phone, token } = params
  try {
    const result = await authApi.signInBySms(phone, token)
    cb && cb(result)
  } catch (e) {
    console.log({ e })
  }
}

export const signInByPwd = (params, cb) => async () => {
  const { account, password } = params
  try {
    const result = await authApi.signIn(account, password)
    cb && cb(result)
  } catch (e) {
    console.log({ e })
  }
}

export const getImageToken = () => async (dispatch) => {
  const result = await usersApi.getImageToken()
  result && store.dispatch(setAvatarToken(result))
}

export const uploadImage = (file, token) => async (dispatch) => {
  const formData = new FormData()
  const xhr = new XMLHttpRequest()
  const response = function (e) {
    if (e.target) {
      if (e.target.status === 200) {
        const result = JSON.parse(e.target.responseText)
        store.dispatch(changeUserInfo({ avatar: result.dest_url }))
      } else {
        switch (e.target.status) {
          case 400:
            toast('格式错误')
            break
          case 401:
            toast('上传凭证无效')
            store.dispatch(getImageToken())
            break
          case 413:
            toast('图片大小不能超过4M')
            break
          case 614:
            toast('目标资源已存在')
            break
          default:
            break
        }
      }
    }
  }
  xhr.addEventListener('load', response, false)
  xhr.open('POST', 'https://up.qbox.me', true)
  formData.append('token', token.token)
  formData.append('file', file)
  formData.append('x:account_id', token.x.accountId)
  formData.append('x:timestamp', token.x.timestamp)
  formData.append('x:sonkwo_token', token.x.sonkwoToken)
  formData.append('x:bucket_name', token.x.bucketName)
  xhr.send(formData)
}

export const toggleSteamReview = (show) => async (dispatch) => {
  const result = await usersApi.toggleSteamReview(show)
  if (checkNullObj(result)) {
    store.dispatch(changeUserInfo({ showSteamReview: show }))
  }
}

export const changeWaterMark = (configs_attributes) => async (dispatch) => {
  const res = await usersApi.patchUserInfo({ configs_attributes })
  if (checkNullObj(res)) {
    const result = await usersApi.queryAuthUserInfo({
      configs: {
        id: true,
        kind: true,
        key: true,
        value: true,
      },
    })
    store.dispatch(updateUserInfo({ configs: result.configs }))
  }
}

export const changeUserInfo = (user, cb) => async (dispatch) => {
  const result = await usersApi.changeUserInfo(user)
  console.log({ result })
  if (checkNullObj(result)) {
    if (user.nick_name) {
      Object.assign(user, { nickname: user.nick_name })
      delete user.nick_name
    }
    store.dispatch(updateUserInfo(user))
    toastMessage('修改成功')
    cb && cb()
  }
}

const defaultAuthQuery = {
  gender: true,
  birthday: true,
  introduction: true,
  email_asterisks: true,
  show_steam_review: true,
  real_name_asterisks: true,
  phone_number_asterisks: true,
  credential_num_asterisks: true,
  wallet: { balance: true, status: true },
  platforms: { show_id: true, kind: true },
  configs: { id: true, kind: true, key: true, value: true },
  point: { xp: true, tasks: true, score: true, history_score: true },
}
export const getUserInfo = () => async (dispatch) => {
  const result = await usersApi.queryAuthUserInfo(defaultAuthQuery)

  const ordersCount = await Promise.all([
    usersApi.getAuthUserInfo(),
    usersApi.getAuthUserInfo('abroad'),
  ])
    .then((res) => {
      return res[0].ordersCount + res[1].ordersCount
    })
    .catch((_) => 0)

  const {
    wallet,
    avatar,
    gender,
    configs,
    birthday,
    nickname,
    platforms,
    introduction,
    emailAsterisks,
    showSteamReview,
    realNameAsterisks,
    point = { tasks: {} },
    phoneNumberAsterisks,
    credentialNumAsterisks,
  } = result

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
      point,
      avatar,
      gender,
      configs,
      birthday,
      nickname,
      ordersCount,
      introduction,
      showSteamReview,
      email: emailAsterisks,
      real_name: realNameAsterisks,
      phone_number: phoneNumberAsterisks,
      credential_num: credentialNumAsterisks,
      ...platform,
    }),
  )
}
