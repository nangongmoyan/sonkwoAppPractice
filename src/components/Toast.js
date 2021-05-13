/**
 *
 * created by lijianpo on 2021/05/13
 */
import React, { Component } from 'react'
import RootSiblings from 'react-native-root-siblings'
import ToastContainer, { positions, durations } from './ToastContainer'

let lastToast = null

let defaultOptions = {}

class Toast extends Component {
  static displayName = 'Toast'
  static propTypes = ToastContainer.propTypes
  static positions = positions
  static durations = durations
  static setDefaultOptions = (options) => (defaultOptions = options)

  //convenience method
  static showLoading = (message, options) => {
    const opts = Object.assign({ duration: 9007199254740992 }, options, {
      image: defaultOptions.imageLoading
        ? defaultOptions.imageLoading
        : require('@source/images/toastLoading.gif'),
    })

    this.show(message, opts)
  }

  static showSuccess = (message, options) => {
    const opts = Object.assign({}, options, {
      image: defaultOptions.imageSuccess
        ? defaultOptions.imageSuccess
        : require('@source/images/toastSuccess.png'),
    })

    this.show(message, opts)
  }

  static showFail = (message, options) => {
    const opts = Object.assign({}, options, {
      image: defaultOptions.imageFail
        ? defaultOptions.imageFail
        : require('@source/images/toastError.png'),
    })

    this.show(message, opts)
  }

  static showInfo = (message, options) => {
    let opts = Object.assign({}, options, {
      image: defaultOptions.imageInfo
        ? defaultOptions.imageInfo
        : require('@source/images/toastInfo.png'),
    })

    this.show(message, opts)
  }

  static showWarn = (message, options) => {
    const opts = Object.assign({}, options, {
      image: defaultOptions.imageWarn
        ? defaultOptions.imageWarn
        : require('@source/images/toastWarn.png'),
    })

    this.show(message, opts)
  }

  static hide = () => lastToast !== null && lastToast.destroy()

  //raw method
  static show = (message, options) => {
    lastToast !== null && lastToast.destroy()

    let RawDefaultOptions = {
      duration: durations.SHORT,
      position: positions.CENTER,
    }

    let opts = Object.assign(RawDefaultOptions, defaultOptions, options)

    let onHidden = opts.onHidden

    let hidenFunc = () => {
      toast && toast.destroy()
      onHidden && onHidden()
    }

    opts.onHidden = hidenFunc

    let toast = new RootSiblings(
      (
        <ToastContainer {...opts} visible={true}>
          {message}
        </ToastContainer>
      ),
    )

    lastToast = toast

    return toast
  }

  static hide = (toast) => {
    toast instanceof RootSiblings && toast.destroy()
    lastToast !== null && lastToast.destroy()
  }

  _toast = null

  constructor(props) {
    super(props)
  }

  componentDidMount = () => {
    this._toast = new RootSiblings(
      <ToastContainer {...this.props} duration={0} />,
    )
  }

  componentDidUpdate = (prevProps) => {
    this._toast.update(<ToastContainer {...this.props} duration={0} />)
  }
  componentWillUnmount = () => this._toast.destroy()

  render() {
    return null
  }
}

export { RootSiblings as Manager }
export default Toast
