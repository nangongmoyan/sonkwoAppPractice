/**
 *
 * created by lijianpo on 2021/05/27
 */
import { isiOS } from '@util'
import React, { useRef, useEffect } from 'react'
import { Keyboard } from 'react-native'

const useKeyboardStatus = (
  showCallback: (e) => void,
  hideCallback: (e) => void,
) => {
  const keyboardShowName = isiOS ? 'keyboardWillShow' : 'keyboardDidShow'
  const keyboardHideName = isiOS ? 'keyboardWillHide' : 'keyboardDidShow'

  useEffect(() => {
    Keyboard.addListener(keyboardShowName, (e) => showCallback(e))
    Keyboard.addListener(keyboardHideName, (e) => hideCallback(e))

    // cleanup function
    return () => {
      Keyboard.removeListener(keyboardShowName, (e) => showCallback(e))
      Keyboard.removeListener(keyboardHideName, (e) => hideCallback(e))
    }
  }, [])
}

export default useKeyboardStatus
