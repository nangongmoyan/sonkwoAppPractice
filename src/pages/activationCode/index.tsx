/**
 * 我的激活码
 * created by lijianpo on 2021/06/23
 */
import React, { useCallback } from 'react'
import { Column, CustomStackHeader, Divider, MyTabBar, MyText, Row } from '@ui'
import { TabView, SceneMap } from 'react-native-tab-view'
import { View, useWindowDimensions } from 'react-native'

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
)

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
)

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
})

const ActivationCode: React.FC<any> = ({}) => {
  const layout = useWindowDimensions()
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'first', title: '国际站' },
    { key: 'second', title: '大陆站' },
  ])

  const renderTabBar = useCallback((props) => {
    return (
      <Column align="center">
        <MyTabBar {...props} tabWidth={100} style={{ width: 200 }} />
      </Column>
    )
  }, [])
  return (
    <Column style={{ flex: 1, backgroundColor: 'white' }}>
      <CustomStackHeader title="我的激活码" />
      <Divider height={1} color="#f5f5f5" />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{ width: layout.width }}
      />
      <MyText>兑换激活码</MyText>
    </Column>
  )
}

export { ActivationCode }
