import { gameApi } from '@sonkwo/sonkwo-api'
import { useInfiniteQuery } from 'react-query'

const fetchActivationCode = async (area: string, page: number) => {
  return gameApi.getAccountSkus(area, page)
}

const useActivationCode = (area: string) => {
  return useInfiniteQuery(
    ['ActivationCode ', area],
    ({ pageParam = 1 }) => fetchActivationCode(area, pageParam),
    {
      getNextPageParam: (lastPage) => lastPage?.meta?.nextPage ?? false,
      getPreviousPageParam: (firstPage) => firstPage?.meta?.prePage ?? false,
    },
  )
}

export { useActivationCode }
