/**
 * @format
 */
import React from 'react'
import { AppRegistry, Platform } from 'react-native'
import SonkwoAppPractice from './src/main'
import { config, AuthToken, authApi } from '@sonkwo/sonkwo-api'
import { name as appName } from './app.json'
import MyDeviceInfo from '@native/MyDeviceInfo'
import { enableScreens } from 'react-native-screens'
import { isDev } from '@util/check_config'
import { deviceStorage } from '@util'
import { useTokenStore } from '@features/auth/model'
const TWO_DAY = 1000 * 60 * 60 * 24 * 2

deviceStorage.get('userInfo').then((userInfo) => {
  if (!userInfo) return
  const now = new Date()
  const data = userInfo.data
  const { refreshToken, expiresIn, createdAt } = data
  const createdAtDate = new Date(createdAt * 1000)
  const expiresDate = new Date(createdAt * 1000 + expiresIn * 1000)
  // token 超时则清理
  if (now >= expiresDate) {
    deviceStorage.save('userInfo', null)
  } else if (now - createdAtDate >= TWO_DAY) {
    // 生成 token 超过两天，刷新 token
    authApi.refreshToken(refreshToken).then((newData) => {
      deviceStorage.save('userInfo', newData)
      useTokenStore.setState(newData)
    })
  } else {
    useTokenStore.setState(data)
  }
})

// 初始化 sonkwo-api 请求配置
config.setOs(Platform.OS)
config.setVersion(MyDeviceInfo.appVersion)
config.setBuildConfig(isDev ? 'debug' : 'release')

enableScreens()
if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React, { trackallPureComponents: true })
}

AppRegistry.registerComponent(appName, () => SonkwoAppPractice)
