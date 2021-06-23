/**
 * 我的激活码
 * created by lijianpo on 2021/06/23
 */
import React, { useCallback } from 'react'
import { Column, CustomStackHeader, Divider, MyTabBar, MyText, Row } from '@ui'
import { TabView, SceneMap } from 'react-native-tab-view'
import { View, useWindowDimensions } from 'react-native'
import { deviceWidth } from '@util'
import { ThemeColors } from 'ui/theme'

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
)

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
)

const ThirdRoute = () => <View style={{ flex: 1, backgroundColor: '#675' }} />
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
})

const SonkwoCoupon: React.FC<any> = ({}) => {
  const layout = useWindowDimensions()
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'first', title: '可用' },
    { key: 'second', title: '使用记录' },
    { key: 'third', title: '过期' },
  ])

  const renderTabBar = useCallback((props) => {
    return (
      <Column align="center">
        <MyTabBar {...props} tabWidth={100} style={{ width: 300 }} />
        <Row
          style={{
            width: deviceWidth,
            backgroundColor: ThemeColors.Default,
            paddingHorizontal: 15,
            paddingVertical: 5,
            marginVertical: 8,
          }}
          justify="space-between"
        >
          <MyText color="white">优惠券不够用，众多优惠券等你领</MyText>
          <MyText color="white">前往领券中心</MyText>
        </Row>
      </Column>
    )
  }, [])
  return (
    <Column style={{ flex: 1, backgroundColor: 'white' }}>
      <CustomStackHeader title="我的优惠券" />
      <Divider height={1} color="#f5f5f5" />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{ width: layout.width }}
      />
      <MyText>兑换优惠券</MyText>
    </Column>
  )
}

export { SonkwoCoupon }
