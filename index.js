/**
 * @format
 */
import React from 'react'
import { AppRegistry, Platform } from 'react-native'
import SonkwoAppPractice from './src/main'
import { config } from '@sonkwo/sonkwo-api'
import { name as appName } from './app.json'
import MyDeviceInfo from '@native/MyDeviceInfo'
import { enableScreens } from 'react-native-screens'
import { isDev, buildConfig } from '@util/check_config'

// 初始化 sonkwo-api 请求配置
// console.log({ isDev })
config.setOs(Platform.OS)
config.setVersion(MyDeviceInfo.appVersion)
config.setBuildConfig('debug')
// config.setBuildConfig(isDev ? 'debug' : 'release')

enableScreens()
if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React, { trackallPureComponents: true })
}

AppRegistry.registerComponent(appName, () => SonkwoAppPractice)
