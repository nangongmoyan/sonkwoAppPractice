import {
  clearUserInfo,
  getUserInfo,
  updateUserInfo,
} from '@actions/user_action'
import { useDispatch, useNavigation } from '@hooks'
import { authApi, AuthToken, config } from '@sonkwo/sonkwo-api'
import { createStore } from '@util'
import phoenix from '@util/phoenix'
import { useCallback } from 'react'
import store from 'store'
const initialState: AuthToken = {
  id: 0,
  avatar: '',
  region: 'cn',
  expiresIn: 0,
  nickname: '',
  createdAt: 0,
  accessToken: '',
  refreshToken: '',
  tokenType: 'bearer',
}

interface TokenStore extends AuthToken {
  setToken: (data: AuthToken) => void
  clearToken: () => void
}

export const useTokenStore = createStore<TokenStore>((set) => ({
  ...initialState,
  setToken: (data) => set((_) => data),
  clearToken: () => set((_) => initialState),
}))

export const useSetToken = () => useTokenStore((state) => state.setToken)

export const useAfterLogin = () => {
  const setToken = useTokenStore((state) => state.setToken)
  return (data: any) => {
    setToken(data)
    // navigation
  }
}

/** 登出 */
export const useSignOut = () => {
  const dispatch = useDispatch()
  const { id, clearToken } = useTokenStore()

  const afterSignOut = useCallback(() => {
    clearToken()
    dispatch(clearUserInfo())
    phoenix.disconnect()
  }, [clearToken, dispatch])

  return useCallback(() => {
    authApi
      .signOut()
      .then((_) => {
        afterSignOut()
      })
      .catch((error) => {
        afterSignOut()
      })
  }, [afterSignOut])
}

/** 用户是否登录 */
export const useLoginState = () => {
  return !!useTokenStore((state) => state.id)
}

/** 登录用户基本信息 */
export const useAuthUser = () => {
  return useTokenStore((state) => ({
    id: state.id,
    avatar: state.avatar,
    token: state.accessToken,
    nickname: state.nickname,
  }))
}

useTokenStore.subscribe((data) => {
  if (data.accessToken) {
    console.log('subscribe data', data)
    const { setToken, clearToken, ...rest } = data
    config.setToken(data.accessToken)
    store.dispatch(updateUserInfo({ ...rest }))
    store.dispatch(getUserInfo())
  }
})
