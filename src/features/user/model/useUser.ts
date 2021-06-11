import { useQuery } from '@hooks'
import { usersApi } from '@sonkwo/sonkwo-api'

const fetchUser = (id: Id) =>
  Promise.all([usersApi.getUserProfile(id), usersApi.getUserService(id)]).then(
    (res) => {
      return {
        ...res[0],
        ...res[1],
        groupCount: res[1].groupIds?.length ?? 0,
      }
    },
  )
function useUser(id: Id) {
  const { data: user } = useQuery(['user', id], () => fetchUser(id), {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  })
  return user
}
export { useUser }
