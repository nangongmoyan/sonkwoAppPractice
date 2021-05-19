/**
 * 阴影框
 * created by lijianpo on 2021/04/25
 */

import React from 'react'
import { Column } from '../flex'
import { ThemeColors } from '../theme'
import { adaptiveWidth, deviceWidth } from '@util'
import { StyleSheet, Platform } from 'react-native'

const ShadowBox: React.FC<ShadowBoxProps> = ({
  children,
  boxWidth = deviceWidth - adaptiveWidth(60),
  // boxHeight,
  boxBorderRadius = 8,
  boxBackgroundColor = ThemeColors.White,
  boxStyle,
  ...restProps
}) => {
  return (
    <Column
      style={[
        {
          width: boxWidth,
          // height: boxHeight,
          borderRadius: boxBorderRadius,
          backgroundColor: boxBackgroundColor,
        },
        boxStyle,
        styles.container,
      ]}
      {...restProps}
    >
      {children}
    </Column>
  )
}

export default ShadowBox

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    paddingHorizontal: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#E8E8F1',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 1,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
})
