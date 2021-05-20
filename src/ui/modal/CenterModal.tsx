/**
 *
 * created by lijianpoo on 2021/05/20
 */
import { vw } from '@util'
import React from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import MyText from 'ui/text'
import BasicModal, { BasicModalProps } from './BasicModal'

interface CenterModalProps extends Omit<BasicModalProps, 'type'> {
  title?: string
  style?: ViewStyle
  noCloseIcon?: boolean
}
const CenterModal: React.FC<CenterModalProps> = ({
  title,
  style,
  children,
  noCloseIcon = false,
  ...otherProps
}) => {
  return (
    <BasicModal
      type="center"
      {...otherProps}
      style={StyleSheet.flatten([styles.container, style])}
    >
      {title && <MyText style={styles.title}>{title}</MyText>}
      {children}
    </BasicModal>
  )
}

export default CenterModal

const styles = StyleSheet.create({
  container: {
    padding: 15,
    width: vw(80),
    borderRadius: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    marginBottom: 20,
    alignSelf: 'center',
  },
})
