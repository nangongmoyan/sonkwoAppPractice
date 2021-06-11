/**
 * created by lijianpo on 2021/06/11
 */
import { useWalletBill } from '@features/wallet/model'
import { useRoute } from '@hooks'
import {
  Column,
  CustomStackHeader,
  Divider,
  MyListView,
  MyText,
  Row,
} from '@ui'
import { vw } from '@util'
import moment from 'moment'
import React, { useCallback, useMemo, useState } from 'react'

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
  }, [endDate, startDate])
  const { data } = useWalletBill(params)
  const billArr = data?.pages[0]?.list

  const renderItem = useCallback(({ item }) => {
    const { title, date, price, color } = item
    return (
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
    )
  }, [])
  const renderSeparator = useCallback(() => {
    return <Divider height={1} color="#f5f5f5" />
  }, [])
  return (
    <Column style={{ flex: 1, backgroundColor: 'white' }}>
      <CustomStackHeader title="交易明细" />
      <Divider height={1} color="#f5f5f5" />
      <MyListView
        data={billArr || []}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
      />
    </Column>
  )
}

export { WalletBill }
