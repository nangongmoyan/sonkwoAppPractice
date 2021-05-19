/**
 * 状态栏组件
 * created by lijianpo on 2021/04/13
 */
import React, { useCallback } from 'react'
import { StatusBar, Platform } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

const MyStatusBar: React.FC<StatusBarProps> = (props) => {
  const { isDarkStyle = true, statusBarBgColor = 'transparent' } = props

  const barStyle = isDarkStyle ? 'dark-content' : 'light-content'

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(barStyle, true)
      if (Platform.OS === 'android') {
        StatusBar.setTranslucent(true)
        StatusBar.setBackgroundColor(statusBarBgColor)
      }
    }, [barStyle, statusBarBgColor]),
  )

  return (
    <StatusBar
      translucent={true}
      backgroundColor="transparent"
      barStyle={barStyle}
    />
  )
}

export default MyStatusBar
