/**
 *
 * created by lijianpo on 2021/05/25
 */
import { View, StyleSheet, TouchableOpacity, Text } from '@ui'
import { deviceWidth, isiOS, toastFail } from '@util'
import React from 'react'
import FastImage from 'react-native-fast-image'
import { Animated } from 'react-native'

const panelSource = [
  { icon: require('@source/images/photo.png'), label: '照片' },
  { icon: require('@source/images/camera.png'), label: '拍照' },
]
const PlusPanel: React.FC<any> = ({ panelHeight, panelContainerHeight }) => {
  const height = panelHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, panelContainerHeight],
  })

  const bottom = panelHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [-panelContainerHeight, 0],
  })

  const opacity = panelHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  })

  return (
    <Animated.View
      style={[
        { width: deviceWidth, opacity },
        isiOS
          ? { position: 'absolute', height: panelContainerHeight, bottom }
          : { height },
      ]}
    >
      <View style={styles.container}>
        {panelSource.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.panelRow}
            onPress={() => toastFail('此功能尚未开放！！！')}
          >
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 8,
                padding: 15,
                borderColor: '#ccc',
                borderWidth: StyleSheet.hairlineWidth,
              }}
            >
              <FastImage source={item.icon} style={{ width: 30, height: 30 }} />
            </View>
            <Text style={{ color: '#7a7a7a', marginTop: 10 }}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  )
}

export { PlusPanel }

const styles = StyleSheet.create({
  animatedView: {
    position: 'absolute',
    width: deviceWidth,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    paddingHorizontal: 15,
    paddingTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  panelRow: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: (deviceWidth - 30) / 4,
    height: (deviceWidth - 30) / 4,
  },
})
