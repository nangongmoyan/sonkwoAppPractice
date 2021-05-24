/**
 *
 * created by lijianpo on 2021/04/25
 */

import { useSelector } from '@hooks'

const useUserInfo = () => {
  return useSelector((state) => state.UserReducer.userInfo)
}

const useIsSelf = (userId: number) => {
  const { id } = useUserInfo()
  return id === userId
}
export { useUserInfo, useIsSelf }
