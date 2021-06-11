/**
 * created by lijianpo on 2021/06/11
 */
import { useWalletBill } from '@features/wallet/model'
import { Column, CustomStackHeader, MyListView, MyText, Row } from '@ui'
import moment from 'moment'
import React, { useCallback, useMemo, useState } from 'react'

const FORMAT = 'YYYY-MM-DD'

const WalletBill: React.FC<any> = ({}) => {
  const [endDate, setEndDate] = useState(moment().format(FORMAT))
  const [startDate, setStartDate] = useState(
    moment().subtract(3, 'month').format(FORMAT),
  )
  const params = useMemo(() => {
    return {
      q: {
        kind_eq: 'purchase',
        created_at_end_with: endDate,
        created_at_start_with: startDate,
      },
    }
  }, [endDate, startDate])
  console.log({ params })
  const { data } = useWalletBill(params)
  // const billArr = data?.pages[0]?.list
  // console.log({ billArr })

  const renderItem = useCallback(({ item }) => {
    return (
      <Row style={{ height: 72 }}>
        <Column>
          <MyText>{item.title}</MyText>
        </Column>
        <MyText>{item.amount}</MyText>
      </Row>
    )
  }, [])
  return (
    <Column>
      <CustomStackHeader title="交易明细" />
      {/* <MyListView data={billArr || []} renderItem={renderItem} /> */}
    </Column>
  )
}

export { WalletBill }
