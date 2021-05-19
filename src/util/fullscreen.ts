/**
 * 平台、设备相关的数据
 * changed by lijianpo on 2021/04/14
 */
import { StatusBar, Platform } from 'react-native'
import { deviceHeight, deviceWidth } from './scale'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

const D_WIDTH = deviceWidth
const D_HEIGHT = deviceHeight
/**iPhone X、iPhone XS */
const X_WIDTH = 375
const X_HEIGHT = 812

/**iPhone XR、iPhone XS Max */
const XSMAX_WIDTH = 414
const XSMAX_HEIGHT = 896

/**判断当前设备是否为ios */
const isiOS = Platform.OS === 'ios'

/**判断是否为iPhoneX */
const isiPhoneX = () => {
  return (
    (isiOS &&
      ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
        (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))) ||
    (D_HEIGHT === XSMAX_HEIGHT && D_WIDTH === XSMAX_WIDTH) ||
    (D_HEIGHT === XSMAX_WIDTH && D_WIDTH === XSMAX_HEIGHT)
  )
}

/**状态栏高度 */
const statusBarHeight =
  (isiOS ? getStatusBarHeight() : StatusBar.currentHeight) ?? 20

/**标题栏高度 */
const titleHeight = statusBarHeight + (isiOS ? 44 : 33)

export { isiOS, isiPhoneX, statusBarHeight, titleHeight }
