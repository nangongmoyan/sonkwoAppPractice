/**
 * 工具导出类
 * changed by lijianpo on 2021/04/14
 */

//
export {
  isiOS,
  titleHeight,
  isiPhoneX,
  statusBarHeight,
  getBottomSpace,
} from './fullscreen'

//
export { default as deviceStorage } from './deviceStorage'

//
export {
  vw,
  vh,
  deviceWidth,
  deviceHeight,
  adaptiveFont,
  adaptiveWidth,
  adaptiveHeight,
} from './scale'

//
export { toastMessage, toastSuccess, toastFail } from './toast'

export { checkNullObj, debounce } from './common'

export { urlToPathAndParams } from './pathUtils'

export { getActualText } from './emojiTransform'

export * from './store'
