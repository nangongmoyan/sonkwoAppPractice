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
import { deviceStorage } from '@util'
import { setUserInfo } from '@actions/user_action'
import { config } from '@sonkwo/sonkwo-api'
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
  async function initApp() {
    const userInfo = await deviceStorage.get('userInfo')
    console.log({ userInfo })
    if (userInfo !== null) {
      if (userInfo.data.access_token) {
        userInfo.data.accessToken = userInfo.data.access_token
      }
      if (userInfo.data.accessToken) {
        // fetch.setToken(userInfo.data.accessToken, store.dispatch)
        // client.jwt(userInfo.data.accessToken)
        config.setToken(userInfo.data.accessToken)
      }
      store.dispatch(setUserInfo(userInfo.data))
    } else {
      deviceStorage.save('userInfo', '')
    }
  }

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
