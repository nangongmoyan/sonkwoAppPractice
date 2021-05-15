/**
 *
 * created by lijianpo on 2021/05/13
 */
import URI from 'urijs'
import { debounce, urlToPathAndParams, toastFail } from '@util'
import { NavigationActions } from 'react-navigation'
import { StackRouter, StackActions } from '@react-navigation/native'

let _navigator
/**
 *
 * @param {*} navigatorRef
 * @returns
 */
const setTopLevelNavigator = (navigatorRef) => {
  _navigator = navigatorRef
  const router = StackRouter()
  console.log({ router })
}

/**
 *
 * @param {*} routeName
 * @param {*} params
 */
const navigate = (routeName, params) => {
  console.log({ routeName, params })
  _navigator.dispatch(NavigationActions.navigate(routeName, { params }))
}

/**
 *
 * @param {*} routeName
 * @param {*} params
 */
const push = (routeName, params) => {
  _navigator.dispatch(StackActions.push(routeName, { params }))
}

/**
 *
 * @param {*} routeName
 * @param {*} params
 */
const replace = (routeName, params) => {
  _navigator.dispatch(StackActions.replace(routeName, { params }))
}

/**
 *
 * @param {*} routeName
 * @param {*} params
 */
const reset = (routeName, params) => {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Tabs' })],
  })
  _navigator.dispatch(resetAction)
}

/**
 *
 * @param {*} key
 * @returns
 */
const pop = (key) => _navigator.dispatch(NavigationActions.back({ key }))

/**
 *
 * @param {*} url
 * @param {*} options
 * @returns
 */
const navigateByUrl = (url, options = { inWebview: false }) => {
  // 当 navigatorRef 没有赋值前， 延迟执行
  // if (!_navigator) {
  //   debounce(() => navigateByUrl(url, options), 1000)
  //   return
  // }

  if (!_navigator) {
    setTimeout(() => {
      navigateByUrl(url, options)
    }, 1000)
    return
  }

  const blackList = ['/headlines_list']
  if (blackList.some((item) => url.includes(item))) return
  const inWebview = options.inWebview ?? false

  const uri = URI(url)

  if (uri.host().includes('club') && uri.path() === '/') {
    uri.path('/community')
  }

  //add host null
  uri.host() === '' && uri.protocol('http').host('www.sonkwo.com')

  // add region query if domain is hk
  // 为了兼容以前 hk， cn 的变量， 确认全部移除后去掉 region
  if (uri.host().includes('.hk') || uri.host().includes('hktest')) {
    uri.addQuery('region', 'hk')
    uri.addQuery('area', 'abroad')
  } else {
    uri.addQuery('region', 'cn')
    uri.addQuery('area', 'native')
  }

  // remove /mobile
  if (uri.host().includes('sonkwo') && uri.segment()[0] === 'mobile') {
    uri.segment(0, '')
  }

  const urlHost = uri.host()
  const urlStr = uri.toString()
  const prefix = `${uri.protocol()}://${uri.host()}`
  const parsedUrl = urlToPathAndParams(urlStr, prefix)

  if (parsedUrl) {
    const { path, params } = parsedUrl
    console.log({ parsedUrl })
    // const action = router.getActionForPathAndParams(path, params)

    // if (action && !urlHost.include('support.sonkwo.com')) {
    //   if (!_navigator) {
    //     toastFail('_navigator dose not exist!!!')
    //     return true
    //   }
    //   if (action?.params?.id) {
    //     _navigator.dispatch(
    //       Object.assign({}, action, {
    //         key: `${action.routeName}_${action.params.id}`,
    //       }),
    //     )
    //   } else if (action?.params?.game_id) {
    //     _navigator.dispatch(
    //       Object.assign({}, action, {
    //         key: `${action.routeName}_${action.params.game_id}`,
    //       }),
    //     )
    //   } else {
    //     _navigator.dispatch(action)
    //   }
    //   return true
    // }

    if (!inWebview) {
      // navigate('AppWebView', { url })
      return true
    }
    return false
  }
}

export default {
  pop,
  push,
  reset,
  replace,
  navigate,
  navigateByUrl,
  setTopLevelNavigator,
}
