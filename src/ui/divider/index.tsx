/**
 *
 * created by lijianpo on 2021/04/13
 */

import React from 'react'
import { View, StyleSheet } from '@ui'

const Divider: React.FC<DividerProps> = (props) => {
  const {
    height = StyleSheet.hairlineWidth,
    color = 'transparent',
    style,
  } = props
  return (
    <View
      style={StyleSheet.flatten([{ height, backgroundColor: color }, style])}
    />
  )
}

export default Divider
