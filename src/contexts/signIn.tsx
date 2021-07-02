/**
 * created by lijianpo on 2021/07/02
 */
import React, { createContext } from 'react'

const SignInContext = createContext({
  btnText: '',
  type: 'normal',
  callback: (_) => {},
})

const SignInProvider = ({ type, callback, children }) => {
  const btnText = type === 'normal' ? '登录' : '绑定并登录'
  return (
    <SignInContext.Provider value={{ type, callback, btnText }}>
      {children}
    </SignInContext.Provider>
  )
}

export { SignInProvider, SignInContext }
