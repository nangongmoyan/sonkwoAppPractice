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
  Image,
  Loading,
  MyScrollView,
  MyButton,
  ShadowBox,
} from '@ui'
import { TabView } from 'react-native-tab-view'
import { useWindowDimensions, Platform } from 'react-native'
import { adaptiveWidth, deviceWidth, getBottomSpace } from '@util'
import { ThemeColors } from 'ui/theme'
import { useSonkwoCoupon } from '@features/sonkwoCoupon/model'
import { get } from 'lodash'
import moment from 'moment'

const SonkwoCoupon: React.FC<any> = ({}) => {
  const layout = useWindowDimensions()
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'Avalible', title: '可用' },
    { key: 'HaveUsed', title: '使用记录' },
    { key: 'HaveExpired', title: '过期' },
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
              return <CouponCard {...coupon} key={index} type={type} />
            })}
          </Column>
        )
      })}
    </MyScrollView>
  )
}

const DAY = 1000 * 60 * 60 * 24

const CouponCard: React.FC<any> = ({
  area,
  name,
  type,
  value,
  usageInfo,
  discountType,
  minimumOrder,
  validFromTimestamp,
  validUntilTimestamp,
}) => {
  const disabled = type !== 'Avalible'
  const price =
    discountType === 'percentage' ? `${parseInt(value)}%off` : `¥${value}`
  const endDate = moment(validUntilTimestamp * 1000).format('YYYY-MM-DD')
  const startDate = moment(validFromTimestamp * 1000).format('YYYY-MM-DD')

  const { areaName, areaBg } = useMemo(() => {
    const domain = area === 'abroad'
    return {
      areaName: domain ? '国际站' : '大陆站',
      areaBg: disabled ? ThemeColors.LightGrey : domain ? '#3178F5' : '#FFB540',
    }
  }, [area, disabled])

  const newDate = moment(new Date()).valueOf()
  const leftDay = (validUntilTimestamp * 1000 - newDate) / DAY
  const almostOverdue = leftDay <= 1 && leftDay > 0

  return (
    <Column style={{ marginTop: 20 }}>
      <ShadowBox>
        <Row style={{ height: 90 }}>
          <Column
            style={{
              width: adaptiveWidth(160),
              alignItems: 'flex-start',
              paddingTop: 12,
            }}
          >
            <MyText
              size={18}
              weight="semibold"
              color={disabled ? ThemeColors.LightGrey : ThemeColors.Default}
            >
              {price}
            </MyText>
            <MyText
              size={11}
              weight="medium"
              color={disabled ? ThemeColors.LightGrey : ThemeColors.Default}
            >
              满{minimumOrder}使用
            </MyText>
          </Column>
          <Column
            style={{
              width: adaptiveWidth(350),
              alignItems: 'flex-start',
              height: 90,
              paddingVertical: 10,
              justifyContent: 'space-between',
            }}
          >
            <MyText
              size={13}
              weight="semibold"
              numberOfLines={1}
              color={disabled ? ThemeColors.LightGrey : 'black'}
            >
              {name}
            </MyText>
            <MyText
              numberOfLines={1}
              color={disabled ? ThemeColors.LightGrey : 'grey'}
            >
              {usageInfo}
            </MyText>
            <MyText color={disabled ? ThemeColors.LightGrey : 'grey'}>
              {startDate} 至 {endDate}
            </MyText>
          </Column>
          <MyButton
            title="查看使用"
            disabled={disabled}
            linear={disabled ? [] : ['#FF9017', '#FF6D3F']}
            style={{ width: 65, height: 26, borderRadius: 13 }}
            containerStyle={{ position: 'absolute', right: 5 }}
          />
          <Column
            style={{
              backgroundColor: areaBg,
              paddingHorizontal: 5,
              paddingVertical: 1,
              position: 'absolute',
              top: 0,
              left: -10,
              borderTopLeftRadius: 8,
            }}
          >
            <MyText color="white">{areaName}</MyText>
          </Column>
          {almostOverdue && !disabled ? (
            <Image
              source={require('@source/images/couponOverdue.png')}
              style={{ position: 'absolute', top: 0, right: -10 }}
            />
          ) : null}
        </Row>
      </ShadowBox>
    </Column>
  )
}
export { SonkwoCoupon }
