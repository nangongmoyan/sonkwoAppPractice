/**
 * created by lijianpo on 2021/06/11
 */
import React, { useCallback, useMemo, useState } from 'react'
import { useWalletBill } from '@features/wallet/model'
import { useRoute } from '@hooks'
import {
  Column,
  CustomStackHeader,
  Divider,
  Loading,
  MyScrollView,
  MyText,
  Row,
} from '@ui'
import { vw } from '@util'
import moment from 'moment'
import { get } from 'lodash'

const FORMAT = 'YYYY-MM-DD'

const WalletBill: React.FC<any> = ({}) => {
  const route = useRoute()
  const { kind } = route?.params
  const [endDate, setEndDate] = useState(moment().format(FORMAT))
  const [startDate, setStartDate] = useState(
    moment().subtract(3, 'month').format(FORMAT),
  )
  const params = useMemo(() => {
    return {
      q: {
        kind_eq: kind.toLowerCase(),
        created_at_end_with: endDate,
        created_at_start_with: startDate,
      },
    }
  }, [endDate, kind, startDate])

  const {
    data,
    refetch,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useWalletBill(params)

  const pages = get(data, 'pages', [])

  const showEmpty = useMemo(() => get(pages, '[0].data.length') === 0, [pages])

  const renderStickyHeader = () => {
    return (
      <Column>
        <CustomStackHeader title="交易明细" />
        <Divider height={1} color="#f5f5f5" />
      </Column>
    )
  }

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
      emptymessage={'一笔交易都木有呢'}
      isFetchingNextPage={isFetchingNextPage}
      StickyHeaderComponent={renderStickyHeader}
    >
      {pages.map((page, i) => {
        return (
          <Column key={i}>
            {page?.data?.map((bill, index) => {
              return <BillCard {...bill} key={index} />
            })}
          </Column>
        )
      })}
    </MyScrollView>
  )
}

const BillCard: React.FC<any> = ({
  title,
  date,
  price,
  color,
  unshowSeparator,
}) => {
  return (
    <Column>
      <Row
        style={{
          height: 72,
          justifyContent: 'space-between',
          paddingHorizontal: 15,
        }}
      >
        <Column
          style={{
            height: 72,
            paddingVertical: 12,
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <MyText style={{ fontSize: 15, maxWidth: vw(72) }} numberOfLines={1}>
            {title}
          </MyText>
          <MyText color="#999">{date}</MyText>
        </Column>
        <MyText color={color} size={20}>
          {price}
        </MyText>
      </Row>
      {unshowSeparator ? null : <Divider height={1} color="#f5f5f5" />}
    </Column>
  )
}
export { WalletBill }
