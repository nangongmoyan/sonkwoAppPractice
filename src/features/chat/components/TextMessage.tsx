/**
 *
 * created by lijianpo on 2021/05/23
 */
import { View, TouchableOpacity, StyleSheet, Text, Platform } from '@ui'
import { deviceWidth } from '@util'
import React from 'react'
import { ThemeColors } from 'ui/theme'

const TextMessage: React.FC<any> = ({
  isSelf,
  message,
  leftMessageBackground = ThemeColors.White,
  rightMessageBackground = ThemeColors.Default,
}) => {
  return (
    <View style={[isSelf ? styles.right : styles.left]} collapsable={false}>
      <View
        style={[
          styles.triangle,
          isSelf ? styles.right_triangle : styles.left_triangle,
          {
            borderColor: isSelf
              ? rightMessageBackground
              : leftMessageBackground,
          },
        ]}
      />
      <TouchableOpacity activeOpacity={1} disabled={true}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: isSelf
                ? rightMessageBackground
                : leftMessageBackground,
            },
          ]}
        >
          <Text>{message.content}</Text>
        </View>
      </TouchableOpacity>
      {/* <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
          }}
        ></View> */}
    </View>
  )
}

export { TextMessage }

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    maxWidth: deviceWidth - 160,
    minHeight: 20,
  },
  triangle: {
    width: 0,
    height: 0,
    zIndex: 999,
    borderWidth: 6,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderColor: '#fff',
    marginTop: 16,
  },
  left_triangle: {
    borderLeftWidth: 0,
    borderRightWidth: Platform.OS === 'android' ? 6 : 10,
    marginLeft: 5,
  },
  right_triangle: {
    borderRightWidth: 0,
    borderLeftWidth: Platform.OS === 'android' ? 6 : 10,
    borderColor: ThemeColors.Default,
    marginRight: 5,
  },
  left: {
    flexDirection: 'row',
  },
  right: {
    flexDirection: 'row-reverse',
  },
})
