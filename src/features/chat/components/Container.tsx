/**
 *
 * created by lijianpo on 2021/05/24
 */
import React from 'react'
import Animated from 'react-native-reanimated'
import { StyleSheet, View } from 'react-native'
import { deviceWidth, isiOS } from '@util'
import { isIphoneX } from 'react-native-iphone-x-helper'

const Container: React.FC<any> = ({ children, xHeight, setInputHeight }) => {
  return (
    <Animated.View
      style={[
        styles.commentBar,
        isiOS ? { paddingBottom: isIphoneX() ? xHeight : 0 } : {},
      ]}
      onLayout={(e) => setInputHeight(e.nativeEvent.layout.height)}
    >
      <View style={styles.container}>{children}</View>
    </Animated.View>
  )
}

export { Container }

const styles = StyleSheet.create({
  commentBar: {
    width: deviceWidth,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    borderColor: '#ccc',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  container: {
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
})
