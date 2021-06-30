/**
 * created by lijianpo on 2021/06/30
 */
import React, { useState, useCallback } from 'react'
import { CenterModal, MyText } from '@ui'

const CodeKeyModal: React.FC<any> = ({}) => {
  const [visible, setVisible] = useState(true)

  const showModal = useCallback(() => setVisible(true), [])

  const closeModal = useCallback(() => setVisible(false), [])
  return (
    <CenterModal isVisible={visible} onClose={closeModal}>
      <MyText>asds</MyText>
    </CenterModal>
  )
}

export { CodeKeyModal }
