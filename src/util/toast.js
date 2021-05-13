/**
 * 潜提示
 * created by lijianpo on 2021/04/13
 */

import Toast from '@components/Toast'

Toast.setDefaultOptions({
  backgroundColor: 'black',
  opacity: 0.95,
  textColor: 'white',
})
const toastMessage = (message, options) => {
  Toast.show(message)
}

const toastSuccess = (message, options) => {
  Toast.showSuccess(message)
}

const toastFail = (message, options) => {
  Toast.showFail(message)
}

export { toastMessage, toastSuccess, toastFail }
