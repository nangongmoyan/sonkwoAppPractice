/**
 * 引导页样式集
 * created by lijianpo on 2021/04/14
 */

import { StyleSheet } from '@ui'
import { adaptiveWidth, adaptiveHeight, deviceWidth } from '@util'
import { ThemeColors } from 'ui/theme'

const guideStyles = StyleSheet.create({
  guideOptions: {
    width: deviceWidth,
    position: 'absolute',
    bottom: adaptiveHeight(120),
  },
  guideOptionsBtn: {
    width: adaptiveWidth(560),
    height: adaptiveHeight(72),
    backgroundColor: ThemeColors.White,
    borderRadius: 8,
  },
  guideOptionsThird: {
    width: adaptiveWidth(80),
    height: adaptiveWidth(80),
    borderRadius: adaptiveWidth(40),
  },
})

export { guideStyles }
