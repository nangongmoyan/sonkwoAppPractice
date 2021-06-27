/**
 * 我的激活码
 * created by lijianpo on 2021/06/23
 */
import React, { useCallback, useMemo } from 'react'
import {
  Column,
  CustomStackHeader,
  Divider,
  MyTabBar,
  MyText,
  Row,
  Loading,
  MyScrollView,
  ImageBackground,
  ShadowBox,
} from '@ui'
import { TabView } from 'react-native-tab-view'
import { useWindowDimensions, Platform } from 'react-native'
import { deviceWidth, getBottomSpace } from '@util'
import { ThemeColors } from 'ui/theme'
import { useSonkwoCoupon } from '@features/sonkwoCoupon/model'
import { get } from 'lodash'
import { useDimensions } from '@hooks'

const SonkwoCoupon: React.FC<any> = ({}) => {
  const layout = useWindowDimensions()
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'AVALIABLE', title: '可用' },
    { key: 'HAVE_USED', title: '使用记录' },
    { key: 'HAVE_EXPIRED', title: '过期' },
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

  const renderScene = (sceneProps: any) => {
    const { route } = sceneProps
    return <CouponList type={route.key} />
  }

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

const CouponList: React.FC<any> = ({ type }) => {
  const {
    data,
    refetch,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useSonkwoCoupon(type)

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
            {page?.data?.map((coupon, index) => {
              console.log({ coupon })
              return <CouponCard {...coupon.coupon} key={index} />
            })}
          </Column>
        )
      })}
    </MyScrollView>
  )
}

const CouponCard: React.FC<any> = ({ name }) => {
  return (
    <Column style={{ marginTop: 20 }}>
      <ShadowBox boxStyle={{ paddingLeft: 0 }}>
        <Row style={{ height: 90 }}>
          <Column
            style={{
              width: 24,
              backgroundColor: '#3178F5',
              height: 90,
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
              justifyContent: 'center',
            }}
          >
            <MyText color="white">国际站</MyText>
          </Column>
          <Column>
            <MyText>{name}</MyText>
          </Column>
        </Row>
      </ShadowBox>
      {/* <ImageBackground
        source={require('@source/images/coupon.png')}
        style={{ width: width - 30, height: 90 }}
      >
        <Row>
          <Column>
            <MyText>{name}</MyText>
          </Column>
        </Row>
      </ImageBackground> */}
    </Column>
  )
}
export { SonkwoCoupon }
