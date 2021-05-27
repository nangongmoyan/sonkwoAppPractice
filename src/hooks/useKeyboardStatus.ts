/**
 *
 * created by lijianpo on 2021/05/27
 */
import { isiOS } from '@util'
import React, { useRef, useEffect } from 'react'
import { Keyboard } from 'react-native'

const useKeyboardStatus = (
  showCallback = (e) => {},
  hideCallback = (e) => {},
) => {
  const keyboardShowListener = useRef(null)
  const keyboardHideListener = useRef(null)

  const keyboardShowName = isiOS ? 'keyboardWillShow' : 'keyboardDidShow'
  const keyboardHideName = isiOS ? 'keyboardWillHide' : 'keyboardDidShow'

  useEffect(() => {
    keyboardShowListener.current = Keyboard.addListener(
      keyboardShowName,
      (e) => {
        showCallback && showCallback(e)
      },
    )
    keyboardHideListener.current = Keyboard.addListener(
      keyboardHideName,
      (e) => {
        hideCallback && hideCallback(e)
      },
    )

    return () => {
      keyboardShowListener.current.remove()
      keyboardHideListener.current.remove()
    }
  })
}

export default useKeyboardStatus
