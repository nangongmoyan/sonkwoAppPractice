/**
 * created by lijianpo on 2021/06/11
 */

import { walletApi } from '@sonkwo/sonkwo-api'
import { useInfiniteQuery } from 'react-query'

const fetchWalletBill = async (params: any, page: number) => {
  const result = await walletApi.getRecords(params, page)
  // const xxx = result.list
  return result
}

const useWalletBill = (params: any) => {
  return useInfiniteQuery(['walletBill', params], ({ pageParam = 1 }) =>
    fetchWalletBill(params, pageParam),
  )
}

export { useWalletBill }
