/**
 * created by lijianpo on 2021/06/11
 */

import { walletApi } from '@sonkwo/sonkwo-api'
import moment from 'moment'
import { useInfiniteQuery } from 'react-query'

const transformBill = (data) => {
  const color = '#0288d1'
  const { title, kind, amount, discount, created_at_timestamp } = data
  const price = `+${parseFloat(amount).toFixed(2)}`
  const discountPrice = ((amount * (100 - (discount || 0))) / 100).toFixed(2)
  const date = moment(created_at_timestamp).format('YYYY-MM-DD')
  const billObj = {
    redeem: [title, price, color],
    gift: ['果币奖品', price, color],
    recharge: ['购买果币', price, color],
    purchase: [title, `-${discountPrice}`, '#333'],
    store_refund: [`${title}退回钱包`, price, color],
    refund: [`${title}退款`, `+${discountPrice}`, color],
  }
  return {
    date,
    title: billObj[kind]?.[0],
    price: billObj[kind]?.[1],
    color: billObj[kind]?.[2],
  }
}
const fetchWalletBill = async (params: any, page: number) => {
  const { list, ...meta } = await walletApi.getRecords(params, page)
  return {
    ...meta,
    list: list.map(transformBill),
  }
}

const useWalletBill = (params: any) => {
  return useInfiniteQuery(['walletBill', params], ({ pageParam = 1 }) =>
    fetchWalletBill(params, pageParam),
  )
}

export { useWalletBill }
