/**
 *
 * created by lijianpo on 2021/05/25
 */
import { StyleSheet } from '@ui'
import { deviceWidth, isiOS } from '@util'
import React from 'react'
import { Animated } from 'react-native'
import { EmojiPanel } from './EmojiPanel'
import { PlusPanel } from './PlusPanel'

const PanelContainer: React.FC<any> = ({
  emojiHeight,
  panelHeight,
  visibleHeight,
  panelContainerHeight,
}) => {
  const bottom = visibleHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [-panelContainerHeight, -panelContainerHeight],
  })
  const opacity = visibleHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  })

  return (
    <Animated.View
      style={
        isiOS
          ? [
              styles.container,
              { bottom, opacity, height: panelContainerHeight },
            ]
          : {}
      }
    >
      <PlusPanel
        panelHeight={panelHeight}
        panelContainerHeight={panelContainerHeight}
      />
      <EmojiPanel
        emojiHeight={emojiHeight}
        panelContainerHeight={panelContainerHeight}
      />
    </Animated.View>
  )
}

export { PanelContainer }

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: deviceWidth,
    backgroundColor: '#f5f5f5',
  },
})
