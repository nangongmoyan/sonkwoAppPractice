/**
 * 应用主入口
 * created by lijianpo on 2021/0412
 */
import { SafeAreaProvider } from '@ui'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Navigator from './router'
import { RootSiblingParent } from 'react-native-root-siblings'

// 在正式环境中清空console.log()
if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    error: () => {},
  }
}

const SonkwoAppPractice = () => {
  // async function initApp() {}

  // useEffect(() => {
  //   initApp()
  // }, [])
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <RootSiblingParent>
          <Navigator />
        </RootSiblingParent>
      </Provider>
    </SafeAreaProvider>
  )
}

export default SonkwoAppPractice
