/**
 * @format
 */
import React from 'react'
import { AppRegistry, Platform } from 'react-native'
import SonkwoAppPractice from './src/main'
import { config } from '@sonkwo/sonkwo-api'
import { name as appName } from './app.json'

// 初始化 sonkwo-api 请求配置
config.setOs(Platform.OS)
config.setVersion('5.9.0')
config.setBuildConfig('debug')
// config.setBuildConfig(isDev ? 'debug' : 'release')

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React, { trackallPureComponents: true })
}

AppRegistry.registerComponent(appName, () => SonkwoAppPractice)
