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
import { setUserInfo, refreshToken, getUserInfo } from '@actions/user_action'
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
    const { data } = userInfo
    if (userInfo !== null) {
      if (data.access_token) {
        data.accessToken = data.access_token
      }
      if (data.accessToken) {
        // fetch.setToken(userInfo.data.accessToken, store.dispatch)
        // client.jwt(userInfo.data.accessToken)
        config.setToken(data.accessToken)
      }
      store.dispatch(setUserInfo(data))
      if (!checkTokenOverdue(data)) {
        store.dispatch(getUserInfo())
      }
    } else {
      deviceStorage.save('userInfo', '')
    }
  }

  checkTokenOverdue = (tokenInfo) => {
    const now = Date.now()
    const { refreshToken: rt, expiresIn, createdAt } = tokenInfo
    const expiresDate = 1000 * (createdAt + expiresIn)
    const distance = expiresDate - now
    const isExpiresToday = Math.floor(distance / (1000 * 60 * 60 * 24)) < 2
    if (isExpiresToday) {
      store.dispatch(refreshToken(rt))
      return true
    }
    if (distance > 0) {
      return false
    }
    return true
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
