/**
 * 组件样式集
 * create by lijianpo on 2021/04/14
 */

import { StyleSheet } from '@ui'
import { adaptiveWidth, adaptiveHeight, vw, deviceWidth } from '@util'
import { ThemeColors } from 'ui/theme'

export const TOAST_MAX_WIDTH = 0.8
export const TOAST_ANIMATION_DURATION = 200
export const PADDING_TOP_BOTTOM = 10
export const MARGIN_IMAGE_TEXT = 10

const componentsStyles = StyleSheet.create({
  submitLoading: {
    width: vw(32),
    height: vw(32),
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#00000080',
    paddingHorizontal: adaptiveWidth(30),
    paddingVertical: adaptiveWidth(30),
  },
  toastMaskStyle: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  toastDefaultStyle: {
    width: deviceWidth,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toastContainerStyle: {
    opacity: 0.85,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    paddingVertical: PADDING_TOP_BOTTOM,
    paddingHorizontal: PADDING_TOP_BOTTOM * 2,
    marginHorizontal: deviceWidth * ((1 - TOAST_MAX_WIDTH) / 2),
  },
  toastShadowStyle: {
    elevation: 10,
    shadowRadius: 6,
    shadowOpacity: 0.8,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
  },
  toastIconStyle: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: MARGIN_IMAGE_TEXT,
  },
  toastTextStyle: {
    fontSize: 14,
    lineHeight: 16,
    textAlign: 'center',
    color: ThemeColors.White,
  },
})

export { componentsStyles }
