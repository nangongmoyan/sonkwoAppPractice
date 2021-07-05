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
import { useActivationKeys } from '@features/activationCode/model'
import { get } from 'lodash'
const CodeKeyModal = forwardRef((props, ref) => {
  const { codeInfo, area } = props
  const keyId = get(codeInfo, 'id')
  const [visible, setVisible] = useState(false)
  const result = useActivationKeys(keyId, area)
  console.log({ result })
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
