/**
 *
 * created by lijianpo on 2021/05/13
 */
import { useUserInfo } from '@features/user/hooks/useIsSelf'
import { useNavigation, useNavigationParam } from '@hooks'
import React, { memo, useMemo, useRef, useState } from 'react'
import config from '@util/check_config'
import { Column, StyleSheet } from '@ui'
import { WebView } from 'react-native-webview'

const webviewUrl = '/mobile/webview'

const Browser = memo(({ navigation }) => {
  const webview = useRef()
  const shareRef = useRef()
  const userInfo = useUserInfo()
  const url = useNavigationParam('url')
  const { setParams } = useNavigation()
  const title = navigation.getParam('title', '')
  const [canBack, setCanBack] = useState(false)

  const middleUrl = useMemo(() => {
    const baseUrl = url.includes('hk') ? config.hk : config.fetchUrl
    return baseUrl + webviewUrl
  }, [url])

  // const onShouldStartLoadWithRequest = (event) => {
  //   // const hasPath
  // }

  return (
    <Column style={{ flex: 1 }}>
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
        // injectedJavaScript={historyJs}
        setSupportMultipleWindows={false}
        // applicationNameForUserAgent={userAgent}
        // onNavigationStateChange={onNavigationStateChange}
        // onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        source={{ uri: middleUrl, headers: { 'Cache-Control': 'no-cache' } }}
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
