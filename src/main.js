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
import SplashScreen from 'react-native-splash-screen'
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
    // console.log({ userInfo })
    if (
      userInfo !== null &&
      (userInfo.data.access_token || userInfo.data.accessToken)
    ) {
      if (userInfo.data.access_token) {
        userInfo.data.accessToken = userInfo.data.access_token
      }
      if (userInfo.data.accessToken) {
        // fetch.setToken(userInfo.data.accessToken, store.dispatch)
        // client.jwt(userInfo.data.accessToken)
        config.setToken(userInfo.data.accessToken)
      }
      store.dispatch(setUserInfo(userInfo.data))
      if (!checkTokenOverdue(userInfo.data)) {
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
    SplashScreen.hide()
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
                      <Navigator screenProps={value} />
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
