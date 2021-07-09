/**
 * created by lijianpo on 2021/07/06
 */
import { skuApi } from '@sonkwo/sonkwo-api'
import { useInfiniteQuery } from 'react-query'
import { get, flatten } from 'lodash'
const fetchGameList = async (order: string, page: number) => {
  return skuApi.searchSkusByQuery({ order, cate: 'game', page })
}
const useGameList = (order: string) => {
  const res = useInfiniteQuery(
    ['gameList', order],
    ({ pageParam = 1 }) => fetchGameList(order, pageParam),
    {
      getNextPageParam: (lastPage) => lastPage?.nextPage ?? false,
      getPreviousPageParam: (firstPage) => firstPage?.prePage ?? false,
    },
  )
  const pages = get(res, 'data.pages', [])
  const list = flatten(pages.map((page) => page.list))
  // console.log({ res, list })
  return { list, ...res }
}

export { useGameList }
