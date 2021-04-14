/**
 *
 * created by lijianpo on 2021/04/13
 */
import { StatusBar, Platform, Dimensions } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
// iPhone X、iPhone XS
const X_WIDTH = 375
const X_HEIGHT = 812

//iPhone XR、iPhone XS Max
const XSMAX_WIDTH = 414
const XSMAX_HEIGHT = 896
const { D_WIDTH, D_HEIGHT } = Dimensions.get('window')

const isiOS = () => Platform.OS === 'ios'

const isiPhoneX = () => {
  return (
    (isiOS() &&
      ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
        (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))) ||
    (D_HEIGHT === XSMAX_HEIGHT && D_WIDTH === XSMAX_WIDTH) ||
    (D_HEIGHT === XSMAX_WIDTH && D_WIDTH === XSMAX_HEIGHT)
  )
}

// function getStatusBarHeight() {
//   if (Platform.OS === 'android') return StatusBar.currentHeight
//   if (isiPhoneX()) return getStatusBarHeight()
//   return 20
// }

const statusBarHeight = isiOS() ? getStatusBarHeight() : StatusBar.currentHeight

//标题栏高度
const titleHeight =
  Platform.OS === 'android' ? 33 + statusBarHeight : 44 + statusBarHeight

export { isiOS, isiPhoneX, getStatusBarHeight, statusBarHeight, titleHeight }
