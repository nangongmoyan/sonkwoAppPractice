/**
 * created by lijianpo on 2021/06/11
 */
import moment from 'moment'
import { walletApi } from '@sonkwo/sonkwo-api'
import { useInfiniteQuery } from 'react-query'

const transformBill = (data, index, res) => {
  const { currentPage, totalPages } = res
  const listLenght = res.list.length - 1
  const unshowSeparator = currentPage === totalPages && index === listLenght

  const color = '#0288d1'
  const { title, kind, amount, discount, createdAtTimestamp } = data
  const price = `+${parseFloat(amount).toFixed(2)}`
  const discountPrice = ((amount * (100 - (discount || 0))) / 100).toFixed(2)
  const date = moment(createdAtTimestamp * 1000).format('YYYY-MM-DD')
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
    unshowSeparator,
  }
}
const fetchWalletBill = async (params: any, page: number) => {
  const result = await walletApi.getRecords(params, page)
  const { list, ...meta } = result

  return {
    ...meta,
    data: list.map((v, index) => transformBill(v, index, result)),
  }
}

const useWalletBill = (params: any) => {
  return useInfiniteQuery(
    ['walletBill', params],
    ({ pageParam = 1 }) => fetchWalletBill(params, pageParam),
    {
      getNextPageParam: (lastPage) => lastPage?.nextPage ?? false,
      getPreviousPageParam: (firstPage) => firstPage?.prePage ?? false,
    },
  )
}

export { useWalletBill }
