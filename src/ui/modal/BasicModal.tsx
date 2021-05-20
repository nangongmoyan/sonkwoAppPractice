/**
 *
 * created by lijianpo on 2021/05/20
 */

import { useDimensions } from '@hooks'
import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import Modal, { ModalProps } from 'react-native-modal'

export interface BasicModalProps extends Partial<ModalProps> {
  /**
   * modal 开闭状态
   */
  isVisible: boolean
  /**
   * modal 位置: 居中,靠右或底部
   */
  type: ModalType
  /**
   * 关闭 modal
   */
  onClose: () => void
}

const BasicModal: React.FC<BasicModalProps> = ({
  type = 'center',
  style,
  onClose,
  children,
  ...throughProps
}) => {
  const { width, height } = useDimensions()
  const { modalStyle, Container } = useMemo(() => {
    return {
      modalStyle: styles[type],
      Container: type === 'right' ? SafeAreaView : View,
    }
  }, [])

  return (
    <Modal
      useNativeDriver
      style={modalStyle}
      deviceWidth={width}
      deviceHeight={height}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      hideModalContentWhileAnimating
      {...throughProps}
    >
      <Container
        forceInset={{ bottom: 'always', top: 'always' }}
        style={StyleSheet.flatten([styles.container, style])}
      >
        {children}
      </Container>
    </Modal>
  )
}

export default BasicModal

const styles = StyleSheet.create({
  center: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  right: {
    margin: 0,
    alignItems: 'flex-end',
  },
  container: {
    backgroundColor: 'white',
  },
})
