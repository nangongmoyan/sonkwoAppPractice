import { usersApi } from '@sonkwo/sonkwo-api'
import { FriendKind } from 'enum/user'
import { useInfiniteQuery } from 'react-query'
import { get } from 'lodash'
const fetchFriends = async (userId: Id, kind: FriendKind, page: number) => {
  const result = await usersApi.getFriendsByKind(userId, kind, page)
  const accounts = get(result, 'accounts', [])
  const userIds = accounts.map((user: any) => user.id)
  const userGameCountMap = await usersApi.queryUsersGame(userIds)
  console.log({ result, userGameCountMap })
  const list = accounts.map((account: any) => {
    return {
      ...account,
      gameCount: userGameCountMap[account.id] ?? 0,
    }
  })
  return {
    ...result,
    accounts: list,
  }
}
const useFriends = (userId: Id, kind: FriendKind) => {
  const { data, isLoading } = useInfiniteQuery(
    ['friends', userId, kind],
    ({ pageParam = 1 }) => fetchFriends(userId, kind, pageParam),
  )

  const accounts = get(data, 'pages[0].accounts', [])

  return {
    isLoading,
    friends: accounts,
  }
}

export { useFriends }
