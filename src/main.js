/**
 * 应用主入口
 * changed by lijianpo on 2021/04/12
 */
import React, { useEffect } from 'react'
import store from './store'
import Navigator from './router'
import { SafeAreaProvider } from '@ui'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@contexts/theme'
import { NetinfoProvider } from '@contexts/netinfo'
import { LoadingProvider } from '@contexts/loading'
import { initPermissions } from '@util/permissions'
import { RootSiblingParent } from 'react-native-root-siblings'
import { LocaleContext, LocaleProvider } from '@contexts/locale'

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
  async function initApp() {}

  useEffect(() => {
    initApp()
    initPermissions()
  }, [])
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <LocaleProvider>
          <NetinfoProvider>
            <Provider store={store}>
              <LoadingProvider>
                <LocaleContext.Consumer>
                  {(value) => (
                    <RootSiblingParent>
                      <Navigator />
                    </RootSiblingParent>
                  )}
                </LocaleContext.Consumer>
              </LoadingProvider>
            </Provider>
          </NetinfoProvider>
        </LocaleProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

export default SonkwoAppPractice
