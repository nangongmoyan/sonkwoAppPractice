/**
 * created by lijianpo on 2021/07/06
 */
import { skuApi } from '@sonkwo/sonkwo-api'
import { useInfiniteQuery } from 'react-query'

const fetchGameList = async (order: string, page: number) => {
  const res = await skuApi.searchSkusByQuery({ order, cate: 'game', page })
  console.log({ res })
  return res
}
const useGameList = (order: string) => {
  return useInfiniteQuery(
    ['gameList', order],
    ({ pageParam = 1 }) => fetchGameList(order, pageParam),
    {
      getNextPageParam: (lastPage) => lastPage?.nextPage ?? false,
      getPreviousPageParam: (firstPage) => firstPage?.prePage ?? false,
    },
  )
}

export { useGameList }
