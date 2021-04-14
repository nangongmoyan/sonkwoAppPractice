/**
 * 登录引导页
 * created by lijianpo on 2021/04/14
 */
import React, { useRef, useState, useEffect } from 'react'
import { deviceHeight } from '@util'
import { useDimensions } from '@hooks'
import { Column, MyStatusBar } from '@ui'
import { GuideOptions } from './components'
import { Animated, Easing } from 'react-native'

// 引导页
const Guide = ({ navigation }) => {
  const { width } = useDimensions()
  const [animStop, setAnimStop] = useState(false)
  const scrollY = useRef(new Animated.Value(0)).current
  const scrollY2 = useRef(new Animated.Value(0)).current
  const startTranslateAnim = () => {
    Animated.parallel([
      Animated.timing(scrollY, {
        toValue: 1,
        duration: 40000,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(scrollY2, {
        toValue: 1,
        duration: 40000,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ]).start(() => {
      scrollY.setValue(0)
      scrollY2.setValue(0)
      if (!animStop) startTranslateAnim()
    })
  }
  const stopTranslateAnim = () => {
    setAnimStop(true)
    Animated.timing(scrollY).stop()
    Animated.timing(scrollY2).stop()
  }
  useEffect(() => {
    return startTranslateAnim()
  }, [])
  useEffect(() => {
    return stopTranslateAnim()
  }, [])
  return (
    <Column style={{ flex: 1 }}>
      <MyStatusBar isDarkStyle={false} />
      <Animated.Image
        source={require('@source/images/bbg.png')}
        style={{
          width,
          height: deviceHeight,
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -deviceHeight],
              }),
            },
          ],
        }}
      />
      <Animated.Image
        source={require('@source/images/bbg.png')}
        style={{
          width,
          height: deviceHeight,
          transform: [
            {
              translateY: scrollY2.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -deviceHeight],
              }),
            },
          ],
        }}
      />
      <GuideOptions />
    </Column>
  )
}

export { Guide }
