/**
 *
 * created by lijianpo on 2021/06/23
 */
import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

const Loading: React.FC<any> = ({}) => {
  return (
    <View
      style={{
        zIndex: 100,
        alignItems: 'center',
        justifyContent: 'center',
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(255,255,255, 0.6)',
      }}
    >
      <Image
        source={require('@source/images/loading.gif')}
        style={{ width: 100, height: 100 }}
      />
    </View>
  )
}

export default Loading
