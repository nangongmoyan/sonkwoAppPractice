/**
 *
 * created by lijianpo on 2021/04/13
 */
import { Dimensions, PixelRatio } from '@ui'
import { isiOS } from './fullscreen'
import ExtraDimensions from 'react-native-extra-dimensions-android'

const { width: deviceWidth, height: deviceHeight } = isiOS
  ? Dimensions.get('window')
  : {
      width: ExtraDimensions.get('REAL_WINDOW_WIDTH'),
      height: ExtraDimensions.get('REAL_WINDOW_HEIGHT'),
    }
// 设计图的宽高
const UI_WIDTH = 750
const UI_HEIGHT = 1334

// 获取字体大小缩放比例
const fontScale = PixelRatio.getFontScale()
// 获取设备的像素密度
const pixelRatio = PixelRatio.get()

// 将一个布局尺寸(dp)转换为像素尺寸(px)
const screenWidthPx = PixelRatio.getPixelSizeForLayoutSize(deviceWidth)
const screenHeightPx = PixelRatio.getPixelSizeForLayoutSize(deviceHeight)

// 设置宽度
function adaptiveWidth(size: number) {
  const scaleWidth = (size * screenWidthPx) / UI_WIDTH
  const resSize = Math.round(scaleWidth / pixelRatio)
  return resSize
}

// 设置高度
function adaptiveHeight(size: number) {
  const scaleHeight = (size * screenHeightPx) / UI_HEIGHT
  const resSize = Math.round(scaleHeight / pixelRatio)
  return resSize
}

function vw(percentageWidth: number) {
  return Math.round(deviceWidth * (percentageWidth / 100))
}

function vh(percentageHeight: number) {
  return Math.round(deviceHeight * (percentageHeight / 100))
}
// 设置字体
function adaptiveFont(size: number) {
  if (deviceWidth < 360) {
    return size - 1
  }
  // iphone 5
  else if (deviceHeight < 667) {
    return size
  }
  // iphone 6-6s
  else if (deviceHeight >= 667 && deviceHeight <= 735) {
    return size + 1
  } else if (deviceHeight >= 735) {
    return size + 2
  }
  return size
}

export {
  vw,
  vh,
  deviceWidth,
  deviceHeight,
  adaptiveFont,
  adaptiveWidth,
  adaptiveHeight,
}
