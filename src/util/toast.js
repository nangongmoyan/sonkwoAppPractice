/**
 * 潜提示
 * created by lijianpo on 2021/04/13
 */
import Toast from 'react-native-root-toast'
let toast

/**
 * 短时间(2000ms) 弹窗
 * @param content 内容5566
 * @param onShow  显示前回调函数
 * @param onShown 显示后回调函数
 * @param onHide  隐藏前回调函数
 * @param onHidden 隐藏后回调函数
 */

const toastShort = (content, position, onShow, onShown, onHide, onHidden) => {
  if (toast !== undefined) Toast.hide(toast)
  let toastPosition = Toast.positions.CENTER
  switch (position) {
    case 'top':
      toastPosition = Toast.positions.TOP
      break
    case 'bottom':
      toastPosition = Toast.positions.BOTTOM
      break
    default:
      toastPosition = Toast.positions.CENTER
  }

  toast = Toast.show(content.toString(), {
    duration: Toast.durations.SHORT,
    position: toastPosition,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    onShow: onShow,
    onShown: onShown,
    onHide: onHide,
    onHidden: onHidden,
  })
}

/**
 * 长时间(3500ms)弹窗
 * @param content 内容
 * @param onShow  显示前回调函数
 * @param onShown 显示后回调函数
 * @param onHide  隐藏前回调函数
 * @param onHidden 隐藏后回调函数
 */
const toastLong = (content, position, onShow, onShown, onHide, onHidden) => {
  if (toast !== undefined) Toast.hide(toast)

  let toastPosition = Toast.positions.CENTER

  switch (position) {
    case 'top':
      toastPosition = Toast.positions.TOP
      break
    case 'bottom':
      toastPosition = Toast.positions.BOTTOM
      break
    default:
      toastPosition = Toast.positions.CENTER
  }
  toast = Toast.show(content.toString(), {
    duration: Toast.durations.LONG,
    position: toastPosition,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    onShow: onShow,
    onShown: onShown,
    onHide: onHide,
    onHidden: onHidden,
  })
}

export { toastShort, toastLong }
