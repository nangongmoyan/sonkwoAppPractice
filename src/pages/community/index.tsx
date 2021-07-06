/**
 * 社区页
 * created by lijianpo on 2021/04/12
 */
import { Column, CustomStackHeader, MyTabBar } from '@ui'
import React, { useCallback } from 'react'
import { View, useWindowDimensions } from 'react-native'
import { TabView } from 'react-native-tab-view'

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
)

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
)

const Community: React.FC<any> = ({}) => {
  const layout = useWindowDimensions()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'first', title: '推荐' },
    { key: 'second', title: '果贴' },
    { key: 'third', title: '小组' },
  ])

  const renderTabBar = useCallback((props) => {
    return (
      <CustomStackHeader showBack={false}>
        <MyTabBar {...props} tabWidth={60} style={{ width: 420 }} />
      </CustomStackHeader>
    )
  }, [])

  const renderScene = (sceneProps: any) => {
    const { route } = sceneProps
    switch (route.key) {
      case 'first':
      case 'third':
        return <FirstRoute />
      case 'second':
        return <SecondRoute />
    }
  }

  return (
    <Column style={{ flex: 1, backgroundColor: 'white' }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{ width: layout.width }}
      />
    </Column>
  )
}

export { Community }
