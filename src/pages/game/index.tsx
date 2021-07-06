/**
 * 游戏页
 * created by lijianpo on 2021/04/12
 */

import {
  Column,
  CustomStackHeader,
  MyText,
  MyTabBar,
  Row,
  MyStatusBar,
} from '@ui'
import React, { useCallback } from 'react'
import { View, useWindowDimensions } from 'react-native'
import { TabView } from 'react-native-tab-view'
import { GameList } from './components/GameList'
const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
)

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
)

const Game: React.FC<any> = ({}) => {
  const layout = useWindowDimensions()
  const [routes] = React.useState([
    { key: 'first', title: '畅销' },
    { key: 'second', title: '折扣' },
    { key: 'third', title: '新品' },
    { key: 'fourth', title: '评分' },
    { key: 'fifth', title: '人气' },
    { key: 'sixth', title: '价格' },
  ])
  const [index, setIndex] = React.useState(0)
  const renderTabBar = useCallback((props) => {
    return (
      <Row>
        <MyTabBar {...props} tabWidth={60} style={{ width: 420 }} />
      </Row>
    )
  }, [])
  const renderScene = (sceneProps: any) => {
    const { route } = sceneProps
    return <GameList area={route.key} />
  }
  return (
    <Column style={{ flex: 1, backgroundColor: 'white' }}>
      <MyStatusBar isDarkStyle={true} />
      <CustomStackHeader
        renderLeft={() => (
          <MyText size={18} weight="semibold">
            游戏
          </MyText>
        )}
        showBack={false}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{ width: layout.width }}
      />
      {/* <Divider height={10} color="#f7f7fb" /> */}
    </Column>
  )
}

export { Game }
