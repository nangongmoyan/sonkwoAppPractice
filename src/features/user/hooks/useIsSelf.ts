/**
 *
 * created by lijianpo on 2021/04/25
 */

import { useSelector } from '@hooks'

function useUserInfo() {
  return useSelector((state) => state.UserReducer.userInfo)
}

export { useUserInfo }
