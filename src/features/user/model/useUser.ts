import { useQuery } from '@hooks'
import { usersApi, wishApi } from '@sonkwo/sonkwo-api'
import { get } from 'lodash'
const fetchUser = (id: Id) =>
  Promise.all([
    usersApi.getUserInfo(id),
    usersApi.getUserProfile(id),
    usersApi.getUserService(id),
    wishApi.getWishes(id, 'abroad'),
    wishApi.getWishes(id, 'native'),
  ]).then((res) => {
    const abroadWishCount = get(res[3], 'meta.totalCount', 0)
    const nativeWishCount = get(res[4], 'meta.totalCount', 0)
    return {
      ...res[0],
      ...res[1],
      ...res[2],
      groupCount: res[2].groupIds?.length ?? 0,
      wishCount: abroadWishCount + nativeWishCount,
    }
  })
function useUser(id: Id) {
  const { data: user } = useQuery(['user', id], () => fetchUser(id), {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  })
  return user
}
export { useUser }
