/**
 *
 * created by lijianpo on 2021/05/13
 */
import React, { memo, useMemo, useRef, useState } from 'react'
import { Column } from '../flex'
import { sendEvent } from './util'
const webviewUrl = '/mobile/webview'
import service from 'router/service'
import { MyDeviceInfo } from '@native'
import { useNavigation } from '@hooks'
import config from '@util/check_config'
import { StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'
import { snakelizeKeys } from '@util/ramdaUtil'
import { useRoute } from '@react-navigation/native'
import CustomStackHeader from '../header/customStackHeader'
import { useUserInfo } from '@features/user/hooks/useIsSelf'

// 处理单页应用无法触发 onNavigationStateChange
const historyJs = `
(function() {
  function wrap(fn) {
    return function wrapper() {
      var res = fn.apply(this, arguments);
      window.ReactNativeWebView.postMessage('URL_CHANGE');
      return res;
    }
  }

  history.pushState = wrap(history.pushState);
  history.replaceState = wrap(history.replaceState);
  window.addEventListener('popstate', function() {
    window.ReactNativeWebView.postMessage('URL_CHANGE');
  });
})();
true;
`

const Browser = memo(({ navigation }) => {
  const webview = useRef()
  const shareRef = useRef()
  const userInfo = useUserInfo()
  const route = useRoute()
  const { url = '', title = '' } = route.params

  const { setParams } = useNavigation()
  const [canBack, setCanBack] = useState(false)

  const middleUrl = useMemo(() => {
    const baseUrl = url.includes('hk') ? config.hk : config.fetchUrl
    return baseUrl + webviewUrl
  }, [url])

  const onShouldStartLoadWithRequest = (event) => {
    const hasPath = service.navigateByUrl(event.url, {
      inWebview: true,
    })
    return !hasPath
  }
  console.log({ middleUrl })

  const onNavigationStateChange = (navState) => {
    setCanBack(navState.canGoBack)
    if (navState.title) setParams({ title: navState.title })

    const hasPath = service.navigateByUrl(navState.url, {
      inWebview: true,
    })
    console.log({ hasPath })
    if (hasPath) {
      // this may not work on android
      // use onShouldStartLoadWithRequest to stop loading
      webview.current.stopLoading()
      return
    }

    // send userInfo when in webviewUrl
    if (navState.url.includes(webviewUrl)) {
      let data = { targetUrl: url, action: 'login' }
      if (userInfo && userInfo.id) {
        data.userInfo = snakelizeKeys(userInfo)
      }
      webview.current.injectJavaScript(sendEvent(data))
    }
  }

  const userAgent = `sonkwoApp/${MyDeviceInfo.appVersion}`

  return (
    <Column style={{ flex: 1, backgroundColor: 'white' }}>
      <CustomStackHeader />
      <WebView
        useWebKit
        ref={webview}
        textZoom={100}
        javaScriptEnabled
        domStorageEnabled
        sharedCookiesEnabled
        // onMessage={onMessage}
        thirdPartyCookiesEnabled
        mixedContentMode={'always'}
        style={styles.webview}
        injectedJavaScript={historyJs}
        setSupportMultipleWindows={false}
        applicationNameForUserAgent={userAgent}
        onNavigationStateChange={onNavigationStateChange}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        source={{
          uri: middleUrl,
          headers: { 'Cache-Control': 'no-cache' },
        }}
      />
    </Column>
  )
})

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    marginTop: -44,
  },
})

export default Browser
