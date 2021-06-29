/**
 * created by lijianpo on 2021/06/27
 */

import { gameApi } from '@sonkwo/sonkwo-api'
import { useInfiniteQuery } from 'react-query'
import { get } from 'lodash'

const fetchSonkwoCoupon = async (type: string, pageParam: any) => {
  const { nativeMeta, abroadMeta } = pageParam
  const nativeTotalPages = get(nativeMeta, 'totalPages')
  const nativeCurrentPage = get(nativeMeta, 'currentPage')
  const abroadTotalPages = get(abroadMeta, 'totalPages')
  const abroadCurrentPage = get(abroadMeta, 'currentPage')
  console.log({ nativeCurrentPage, nativeTotalPages })
  const nativeRes =
    nativeCurrentPage >= nativeTotalPages
      ? { coupons: [], nativeMeta }
      : await gameApi.getMyCoupons(type, 'native', nativeCurrentPage + 1)

  const abroadRes =
    abroadCurrentPage >= abroadTotalPages
      ? { coupons: [], abroadMeta }
      : await gameApi.getMyCoupons(type, 'abroad', abroadCurrentPage + 1)

  const coupons = [...nativeRes.coupons, ...abroadRes.coupons].sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1,
  )
  console.log({ nativeRes, abroadRes, coupons })

  return {
    data: coupons,
    nativeMeta: nativeRes.meta,
    abroadMeta: abroadRes.meta,
  }
}

const useSonkwoCoupon = (type: string) => {
  const defaultPageParams = {
    data: [],
    nativeMeta: { currentPage: 0, totalPages: 1 },
    abroadMeta: { currentPage: 0, totalPages: 1 },
  }
  const xxx = useInfiniteQuery(
    ['SonkwoCoupon  ', type],
    ({ pageParam = defaultPageParams }) => fetchSonkwoCoupon(type, pageParam),
    // {
    //   getNextPageParam: (lastPage) => lastPage,
    //   getPreviousPageParam: (lastPage) => lastPage,
    // },
  )
  console.log({ xxx })
  return xxx
}

export { useSonkwoCoupon }
