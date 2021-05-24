/**
 *
 * created by lijianpo on 2021/05/24
 */
import React from 'react'
import Animated from 'react-native-reanimated'
import { StyleSheet, View } from 'react-native'
import { deviceWidth, isiOS } from '@util'

const Container: React.FC<any> = ({
  children,
  xHeight,
  isIphoneX,
  setInputHeight,
  inputContainerStyle,
  inputOutContainerStyle,
}) => {
  return (
    <Animated.View
      style={[
        styles.commentBar,
        inputOutContainerStyle,
        isiOS ? { paddingBottom: isIphoneX ? xHeight : 0 } : {},
      ]}
      onLayout={(e) => setInputHeight(e.nativeEvent.layout.height)}
    >
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 8,
            paddingHorizontal: 10,
          },
          inputContainerStyle,
        ]}
      >
        {children}
      </View>
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
})
