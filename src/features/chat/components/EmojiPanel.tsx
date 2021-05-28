/**
 *
 * created by lijianpo on 2021/05/25
 */
import { MyText } from '@ui'
import { deviceWidth, isiOS } from '@util'
import React, { useEffect, useRef } from 'react'
import {
  Animated,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { SONKWO_EMOJI } from 'source/skemoji/skemoji'
import { ViewPagerAndroidContainer } from './ViewPagerAndroidContainer'
const EmojiPanel: React.FC<any> = ({
  emojiHeight,
  onEmojiSelected,
  panelContainerHeight,
}) => {
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
        <ScrollView ref={scroll} contentContainerStyle={{ paddingBottom: 30 }}>
          {SONKWO_EMOJI.map((items, index) => {
            return (
              <View
                key={index}
                style={{
                  width: deviceWidth,
                  paddingHorizontal: 20,
                }}
              >
                <MyText style={{ textAlign: 'left', marginTop: 15 }}>
                  {items[0].packageName}
                </MyText>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}
                >
                  {items.map((emoji, i) => {
                    return (
                      <TouchableOpacity
                        key={i}
                        activeOpacity={0.7}
                        style={{
                          width: (deviceWidth - 40) / 8,
                          height: 45,
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingTop: 15,
                          paddingHorizontal: 20,
                        }}
                        onPress={() => onEmojiSelected(emoji.value)}
                      >
                        <FastImage
                          resizeMode="contain"
                          source={emoji.key}
                          style={{ width: 30, height: 30 }}
                        />
                      </TouchableOpacity>
                    )
                  })}
                </View>
              </View>
            )
          })}
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            right: 15,
            bottom: 50,
            width: 90,
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity
            style={{
              width: 40,
              height: 30,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text>删除</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 40,
              height: 30,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
            }}
          >
            <Text>发送</Text>
          </TouchableOpacity>
        </View>
      </ViewPagerAndroidContainer>
    </Animated.View>
  )
}

export { EmojiPanel }
