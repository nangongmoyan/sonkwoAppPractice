/**
 * 我的激活码
 * created by lijianpo on 2021/06/23
 */
import React, { useCallback, useState, useMemo } from 'react'
import {
  Column,
  CustomStackHeader,
  Divider,
  MyTabBar,
  MyText,
  Loading,
  MyScrollView,
  Row,
  MyImage,
} from '@ui'
import { TabView } from 'react-native-tab-view'
import { View, useWindowDimensions } from 'react-native'
import { useActivationCode } from '@features/activationCode/model/useActivationCode'
import { get } from 'lodash'
import { vw } from '@util'

const ActivationCode: React.FC<any> = ({}) => {
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
    return <ActivationList area={route.key} />
  }
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

const ActivationList: React.FC<any> = ({ area }) => {
  const {
    data,
    refetch,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useActivationCode(area)

  console.log({ area, data })
  const pages = get(data, 'pages', [])

  const showEmpty = useMemo(() => get(pages, '[0].data.length') === 0, [pages])

  return isLoading ? (
    <Loading />
  ) : (
    <MyScrollView
    // refresh
    // showEmpty={showEmpty}
    // onRefresh={refetch}
    // hasNextPage={hasNextPage}
    // onEndReached={onEndReached}
    // emptymessage={'一笔交易都木有呢'}
    // isFetchingNextPage={isFetchingNextPage}
    // StickyHeaderComponent={renderStickyHeader}
    >
      {pages.map((page, i) => {
        return (
          <Column key={i}>
            {page?.games?.map((activation, index) => {
              return <ActivationCard {...activation} key={index} />
            })}
          </Column>
        )
      })}
    </MyScrollView>
  )
}

const ActivationCard: React.FC<any> = ({ skuCovers }) => {
  const cover = get(skuCovers, 'default', '')
  console.log({ cover })
  return (
    <Row>
      <MyImage uri={cover} width={vw(27)} height={vw(16)} />
      <MyText>ASDFSA</MyText>
    </Row>
  )
}
export { ActivationCode }
