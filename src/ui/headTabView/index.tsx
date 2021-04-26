/**
 *
 * created by lijianpo on 2021/04/26
 */

import React, { useState, useEffect, useMemo, useRef } from 'react'
import { deviceWidth } from '@util'
import { ThemeColors } from 'ui/theme'
import { useDimensions } from '@hooks'
import { MyText, StyleSheet } from '@ui'
import Animated from 'react-native-reanimated'
import { TabBar } from 'react-native-tab-view'
import { CollapsibleHeaderTabView } from 'react-native-tab-view-collapsible-header'

const MyTabBar = ({
  tabWidth = 60,
  indicatorWidth = 20,
  style,
  alignSelf = false,
  ...restProps
}) => {
  const { width } = useDimensions()
  const tabCount = restProps.navigationState.routes.length

  const tabMarginLeft = useMemo(() => {
    return alignSelf ? (width - tabCount * tabWidth) / 2 : 0
  }, [alignSelf, width, tabCount, tabWidth])

  const indicatorLeft = useMemo(() => {
    return Math.floor(tabWidth / 2 - indicatorWidth / 2 - 1) + tabMarginLeft
  }, [tabWidth, indicatorWidth, tabMarginLeft])

  const renderLabel = ({ route, focused, color }) => {
    return (
      <MyText
        size={14}
        numberOfLines={1}
        color={focused ? 'black' : 'grey'}
        weight={focused ? 'medium' : 'normal'}
      >
        {route.title}
      </MyText>
    )
  }
  return (
    <TabBar
      renderLabel={renderLabel}
      tabStyle={{
        width: tabWidth,
      }}
      style={[
        {
          backgroundColor: 'white',
          height: 44,
          elevation: 0,
          shadowColor: 'white',
          paddingLeft: tabMarginLeft,
        },
        style,
      ]}
      indicatorStyle={{
        backgroundColor: ThemeColors.Default,
        width: indicatorWidth,
        height: 4,
        borderRadius: 2,
        marginLeft: indicatorLeft,
      }}
      {...restProps}
    />
  )
}
interface Props {
  frozeTop?: number
  tabbarProps?: any
  routes: { key: string; title: string }[]
  renderScene: (info: any) => React.ReactElement | null | undefined
  renderScrollHeader: () => React.ComponentType<any> | React.ReactElement | null
  makeScrollTrans: (scrollValue: Animated.SharedValue<number>) => void
}

const HeadTabView: React.FC<Props> = ({
  routes,
  renderScene,
  tabbarProps,
  ...restProps
}) => {
  const timeRef = useRef<NodeJS.Timeout>()
  const [index, setIndex] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    return () => {
      timeRef.current && clearTimeout(timeRef.current)
    }
  }, [])

  const onStartRefresh = () => {
    setIsRefreshing(true)
    const mTimer = setTimeout(() => {
      setIsRefreshing(false)
    }, 3000)
    timeRef.current = mTimer
  }
  return (
    <CollapsibleHeaderTabView
      lazy
      onIndexChange={setIndex}
      renderScene={renderScene}
      isRefreshing={isRefreshing}
      onStartRefresh={onStartRefresh}
      navigationState={{ index, routes }}
      initialLayout={styles.tabviewLayout}
      renderTabBar={(props) => <MyTabBar {...props} {...tabbarProps} />}
      {...restProps}
    />
  )
}

export default React.memo(HeadTabView)

const styles = StyleSheet.create({
  tabviewLayout: {
    height: 100,
    width: deviceWidth,
  },
})
