/**
 *
 * created by lijianpo on 2021/05/13
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  Image,
  Easing,
  Keyboard,
  Animated,
  ViewPropTypes,
  TouchableWithoutFeedback,
} from 'react-native'
import { deviceHeight } from '@util'
import {
  componentsStyles,
  PADDING_TOP_BOTTOM,
  TOAST_ANIMATION_DURATION,
} from './css'

let KEYBOARD_HEIGHT = 0
Keyboard.addListener('keyboardDidChangeFrame', ({ endCoordinates }) => {
  KEYBOARD_HEIGHT = deviceHeight - endCoordinates.screenY
})

const positions = {
  TOP: 20,
  BOTTOM: -20,
  CENTER: 0,
}

const durations = {
  LONG: 3500,
  SHORT: 2000,
}

class ToastContainer extends Component {
  static displayName = 'ToastContainer'
  static propTypes = {
    ...ViewPropTypes,
    containerStyle: ViewPropTypes.style,
    duration: PropTypes.number,
    visible: PropTypes.bool,
    position: PropTypes.number,
    animation: PropTypes.bool,

    delay: PropTypes.number,
    hideOnPress: PropTypes.bool,

    backgroundColor: PropTypes.string,
    opacity: PropTypes.number,

    shadow: PropTypes.bool,
    shadowColor: PropTypes.string,

    mask: PropTypes.bool,
    maskColor: PropTypes.string,
    maskOpacity: PropTypes.number,

    showLoading: PropTypes.bool,
    showSuccess: PropTypes.bool,
    showFail: PropTypes.bool,

    image: PropTypes.any,
    imageLoading: PropTypes.any,
    imageSuccess: PropTypes.any,
    imageFail: PropTypes.any,
    imageWarn: PropTypes.any,
    imageInfo: PropTypes.any,
    imageStyle: PropTypes.any,

    showText: PropTypes.bool,
    textColor: PropTypes.string,
    textFont: PropTypes.number,
    textStyle: Text.propTypes.style,

    onHide: PropTypes.func,
    onHidden: PropTypes.func,
    onShow: PropTypes.func,
    onShown: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    duration: durations.SHORT,
    animation: true,
    shadow: true,
    showText: true,
    position: positions.CENTER,
    opacity: 0.86,
    maskOpacity: 0.4,
    delay: 0,
    hideOnPress: false,
  }

  constructor() {
    super(...arguments)
    this.state = {
      visible: this.props.visible,
      opacity: new Animated.Value(0),
    }
  }

  componentDidMount = () => {
    if (this.state.visible) {
      this._showTimeout = setTimeout(() => this._show(), this.props.delay)
    }
  }
  componentDidUpdate = (prevProps) => {
    const { visible, delay } = this.props
    if (visible !== prevProps.visible) {
      if (visible) {
        clearTimeout(this._showTimeout)
        clearTimeout(this._hideTimeout)
        this._showTimeout = setTimeout(() => this._show(), delay)
      } else {
        this._hide()
      }
      this.setState({ visible })
    }
  }

  componentWillUnmount = () => this._hide()

  _root = null
  _animating = false
  _hideTimeout = null
  _showTimeout = null

  _show = () => {
    clearTimeout(this._showTimeout)
    const { animation, opacity, onShow, onShown, siblingManager } = this.props
    if (!this._animating) {
      clearTimeout(this._hideTimeout)
      this._animating = true
      this._root.setNativeProps({ pointerEvents: 'auto' })
      onShow && onShow(siblingManager)
      Animated.timing(this.state.opacity, {
        toValue: opacity,
        duration: animation ? TOAST_ANIMATION_DURATION : 0,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          this._animating = !finished
          onShown && onShown(siblingManager)
          if (this.props.duration > 0) {
            this._hideTimeout = setTimeout(
              () => this._hide(),
              this.props.duration,
            )
          }
        }
      })
    }
  }

  _hide = () => {
    clearTimeout(this._showTimeout)
    clearTimeout(this._hideTimeout)
    const { animation, onHide, onHidden, siblingManager } = this.props
    if (!this._animating) {
      this._root.setNativeProps({ pointerEvents: 'none' })
      onHide && onHide(siblingManager)
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: animation ? TOAST_ANIMATION_DURATION : 0,
        easing: Easing.in(Easing.ease),
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          this._animating = false
          onHidden && onHidden(siblingManager)
        }
      })
    }
  }

  render() {
    let {
      mask,
      image,
      shadow,
      children,
      position,
      showFail,
      showText,
      textFont,
      textStyle,
      textColor,
      maskColor,
      imageStyle,
      shadowColor,
      maskOpacity,
      showSuccess,
      showLoading,
      hideOnPress,
      containerStyle,
      backgroundColor,
    } = this.props
    let tmpPosition = position
      ? {
          [position < 0 ? 'bottom' : 'top']:
            position < 0 ? KEYBOARD_HEIGHT - position : position,
        }
      : {
          top: 0,
          bottom: KEYBOARD_HEIGHT,
        }

    return this.state.visible || this._animating ? (
      <Mask mask={mask} maskColor={maskColor} maskOpacity={maskOpacity}>
        <View
          pointerEvents="box-none"
          style={[componentsStyles.toastDefaultStyle, tmpPosition]}
        >
          <TouchableWithoutFeedback onPress={hideOnPress ? this._hide : null}>
            <Animated.View
              pointerEvents="none"
              ref={(ele) => (this._root = ele)}
              style={[
                componentsStyles.toastContainerStyle,
                (!showText ||
                  !image ||
                  !showSuccess ||
                  !showFail ||
                  !showLoading) && {
                  paddingTop: PADDING_TOP_BOTTOM * 2,
                  paddingBottom: PADDING_TOP_BOTTOM * 2,
                },
                containerStyle,
                { opacity: this.state.opacity },
                backgroundColor && { backgroundColor },

                shadow && componentsStyles.toastShadowStyle,
                shadowColor && { shadowColor },
              ]}
            >
              {/* {image ? (
                <Image
                  style={[
                    imageStyle,
                    componentsStyles.toastIconStyle,
                    !showText && { marginBottom: 0 },
                  ]}
                  source={
                    image
                      ? image
                      : showSuccess
                      ? require('@source/images/toastSuccess.png')
                      : showFail
                      ? require('@source/images/toastError.png')
                      : showLoading
                      ? require('@source/images/toastLoading.gif')
                      : null
                  }
                />
              ) : null} */}
              {image ? (
                <Image
                  style={[
                    imageStyle,
                    componentsStyles.toastIconStyle,
                    !showText && { marginBottom: 0 },
                  ]}
                  source={image}
                ></Image>
              ) : showSuccess ? (
                <Image
                  style={[
                    imageStyle,
                    componentsStyles.toastIconStyle,
                    !showText && { marginBottom: 0 },
                  ]}
                  source={require('@source/images/toastSuccess.png')}
                ></Image>
              ) : showFail ? (
                <Image
                  style={[
                    imageStyle,
                    componentsStyles.toastIconStyle,
                    !showText && { marginBottom: 0 },
                  ]}
                  source={require('@source/images/toastError.png')}
                ></Image>
              ) : showLoading ? (
                <Image
                  style={[
                    imageStyle,
                    componentsStyles.toastIconStyle,
                    !showText && { marginBottom: 0 },
                  ]}
                  source={require('@source/images/toastLoading.gif')}
                ></Image>
              ) : null}
              {showText ? (
                <Text
                  style={[
                    componentsStyles.toastTextStyle,
                    textStyle,
                    textColor && { color: textColor },
                    textFont && {
                      fontSize: textFont,
                      lineHeight: textFont + 2,
                    },
                  ]}
                >
                  {children}
                </Text>
              ) : null}
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </Mask>
    ) : null
  }
}

class Mask extends Component {
  render() {
    let { mask, maskColor, maskOpacity, children } = this.props
    return mask ? (
      <View style={styles.toastMaskStyle}>
        <View
          style={[
            styles.toastMaskStyle,
            maskOpacity && { opacity: maskOpacity },
            maskColor && { backgroundColor: maskColor },
          ]}
        ></View>
        {children}
      </View>
    ) : (
      children
    )
  }
}

export default ToastContainer
export { positions, durations }
