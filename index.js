/**
 * @format
 */
import React from 'react'
import { AppRegistry } from 'react-native'
import SonkwoAppPractice from './src/main'
import { name as appName } from './app.json'

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React, { trackallPureComponents: true })
}

AppRegistry.registerComponent(appName, () => SonkwoAppPractice)
