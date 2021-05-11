/**
 *
 * created by lijianpo on 2021/05/11
 */
import React from 'react'
import { Column, CustomStackHeader, MyStatusBar } from '@ui'
import { addressApi } from '@sonkwo/sonkwo-api'

const ShippingAddress: React.FC<any> = ({}) => {
  addressApi.getAddressSelections()
  return (
    <Column>
      <MyStatusBar isDarkStyle={true} />
      <CustomStackHeader title="请选择收获地址" />
    </Column>
  )
}

export { ShippingAddress }
