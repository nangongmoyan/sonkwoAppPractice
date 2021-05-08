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
import { isDev } from '@util/check_config'

// const buildConfig = isDev ? 'debug' : 'release'
config.setOs(Platform.OS)
config.setVersion(MyDeviceInfo.appVersion)
config.setBuildConfig('debug')

enableScreens()
if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React, { trackallPureComponents: true })
}

AppRegistry.registerComponent(appName, () => SonkwoAppPractice)
