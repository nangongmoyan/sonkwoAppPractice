/**
 *
 * created by lijianpo on 2021/05/25
 */
import { deviceWidth, isiOS } from '@util'
import React, { useRef } from 'react'
import { Animated, ScrollView, Text } from 'react-native'
import { ViewPagerAndroidContainer } from './ViewPagerAndroidContainer'
const EmojiPanel: React.FC<any> = ({ emojiHeight, panelContainerHeight }) => {
  const scroll = useRef(null)
  const height = emojiHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, panelContainerHeight],
  })

  const bottom = emojiHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [-panelContainerHeight, 0],
  })

  const opacity = emojiHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  })

  return (
    <Animated.View
      style={[
        { backgroundColor: '#f5f5f5', opacity },
        isiOS
          ? { position: 'absolute', height: panelContainerHeight, bottom }
          : { height },
      ]}
    >
      <ViewPagerAndroidContainer
        style={{ height: panelContainerHeight, width: deviceWidth }}
      >
        <ScrollView ref={scroll} style={{ flex: 1, backgroundColor: 'red' }}>
          <Text>sdfsdfsdf</Text>
          <Text>sdfsdfsdf</Text>
          <Text>sdfsdfsdf</Text>
          <Text>sdfsdfsdf</Text>
          <Text>sdfsdfsdf</Text>
          <Text>sdfsdfsdf</Text>
          <Text>sdfsdfsdf</Text>
          <Text>sdfsdfsdf</Text>
          <Text>sdfsdfsdf</Text>
          <Text>sdfsdfsdf</Text>
          <Text>sdfsdfsdf</Text>
        </ScrollView>
      </ViewPagerAndroidContainer>
    </Animated.View>
  )
}

export { EmojiPanel }
