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
import moment from 'moment'
import { TabView } from 'react-native-tab-view'
import { useWindowDimensions, Platform } from 'react-native'
import { useActivationCode } from '@features/activationCode/model/useActivationCode'
import { get } from 'lodash'
import { getBottomSpace, vw } from '@util'
import { SkuKeyIcon } from '@features/common/components'
import { getSkuKeyType } from '@features/common/utils'
import { ThemeColors } from 'ui/theme'

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
        onIndexChange={setIndex}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        initialLayout={{ width: layout.width }}
      />
      <Column
        style={{
          paddingVertical: getBottomSpace() / 2,
          backgroundColor: 'white',
          shadowColor: '#E8E8F1',
          ...Platform.select({
            ios: {
              // shadowColor: '#E8E8F1',
              shadowOffset: {
                width: 0,
                height: -2,
              },
              shadowOpacity: 1,
            },
            android: {
              elevation: 5,
            },
          }),
        }}
      >
        <MyText>兑换礼物</MyText>
      </Column>
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

  const pages = get(data, 'pages', [])

  const showEmpty = useMemo(() => get(pages, '[0].data.length') === 0, [pages])

  const onEndReached = useCallback(() => {
    hasNextPage && !isFetchingNextPage && fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  return isLoading ? (
    <Loading />
  ) : (
    <MyScrollView
      refresh
      showEmpty={showEmpty}
      onRefresh={refetch}
      hasNextPage={hasNextPage}
      onEndReached={onEndReached}
      // emptymessage={'一笔交易都木有呢'}
      isFetchingNextPage={isFetchingNextPage}
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

const ActivationCard: React.FC<any> = ({
  keyType,
  pubdate = 0,
  skuNames,
  skuCovers,
}) => {
  const cover = get(skuCovers, 'default', '')
  const name = get(skuNames, 'default', '')
  const skuKeyType = getSkuKeyType(keyType)
  const skuKeyName = get(skuKeyType, 'name', '')
  const pubdateTime = moment(pubdate * 1000).format('YYYY-MM-DD')
  return (
    <Row style={{ paddingHorizontal: 15, marginTop: 15 }}>
      <MyImage
        uri={cover}
        width={vw(27)}
        height={vw(16)}
        style={{ borderRadius: 8, marginRight: 15 }}
      />
      <Column
        style={{ height: vw(16), width: vw(38) }}
        justify="space-between"
        align="flex-start"
      >
        <MyText size={15} numberOfLines={1}>
          {name}
        </MyText>
        <Row>
          <MyText>激活类型：</MyText>
          <SkuKeyIcon keyType={keyType} style={{ marginRight: 5 }} />
          <MyText>{skuKeyName}</MyText>
        </Row>
        <Row>
          <MyText>发布时间：{pubdateTime}</MyText>
        </Row>
      </Column>
      <Column style={{ flex: 1 }} />
      {keyType === 'no_key' ? (
        <MyText color={ThemeColors.Default}>免激活码</MyText>
      ) : (
        <MyText
          style={{
            borderWidth: 1,
            borderRadius: 4,
            borderColor: ThemeColors.Default,
            paddingVertical: 5,
            paddingHorizontal: 10,
            color: ThemeColors.Default,
          }}
        >
          查看激活码
        </MyText>
      )}
    </Row>
  )
}
export { ActivationCode }
