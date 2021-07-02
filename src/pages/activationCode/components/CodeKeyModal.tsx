/**
 * created by lijianpo on 2021/06/30
 */
import React, {
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { CenterModal, MyText } from '@ui'

const CodeKeyModal = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(true)
  useImperativeHandle(ref, () => ({
    showModal: () => setVisible(true),
  }))
  // const showModal = useCallback(() => setVisible(true), [])

  const closeModal = useCallback(() => setVisible(false), [])
  return (
    <CenterModal isVisible={visible} onClose={closeModal}>
      <MyText>asds</MyText>
    </CenterModal>
  )
})

export { CodeKeyModal }
