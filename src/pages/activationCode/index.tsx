/**
 * 我的激活码
 * created by lijianpo on 2021/06/23
 */
import { TabView } from 'react-native-tab-view'
import React, { useCallback, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import { ActivationList } from './components/ActivationList'
import { CodeKeyModal } from './components/CodeKeyModal'
import { RedeemGifts } from '@features/common/components'

import { Column, CustomStackHeader, Divider, MyTabBar } from '@ui'
import { useRef } from 'react'

const ActivationCode: React.FC<any> = ({}) => {
  const codeKeyRef = useRef()
  const layout = useWindowDimensions()
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'abroad', title: '国际站' },
    { key: 'native', title: '大陆站' },
  ])
  const renderTabBar = useCallback((props) => {
    return (
      <Column align="center">
        <MyTabBar {...props} tabWidth={100} style={{ width: 200 }} />
      </Column>
    )
  }, [])
  const renderScene = (sceneProps: any) => {
    const { route } = sceneProps
    return <ActivationList area={route.key} codeKeyRef={codeKeyRef} />
  }
  return (
    <Column style={{ flex: 1, backgroundColor: 'white' }}>
      <CustomStackHeader title="我的激活码" />
      <Divider height={1} color="#f5f5f5" />
      <TabView
        onIndexChange={setIndex}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        initialLayout={{ width: layout.width }}
      />
      <RedeemGifts />
      <CodeKeyModal ref={codeKeyRef} />
    </Column>
  )
}

export { ActivationCode }
