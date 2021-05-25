/**
 *
 * created by lijianpo on 2021/05/22
 */
import React, { useCallback, useRef, useState, useMemo } from 'react'
import { FlatList, StyleSheet, View, TouchableOpacity } from '@ui'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated'
import { deviceHeight, isiOS } from '@util'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { ChatItem } from './ChatItem'
import { MessageTime } from './MessageTime'
import { isSomeMinutes } from '../utils'
import { InputBar } from './InputBar'

const ChatView: React.FC<any> = ({
  messageList,
  headerHeight,
  flatListProps,
  inverted = false,
  allPanelHeight = 200,
  iphoneXBottomPadding = 34,
}) => {
  const rootHeight = useRef(0)
  const chatList = useRef(null)
  const viewHeaderHeight = useRef(headerHeight)
  const listHeight = useRef(deviceHeight - viewHeaderHeight.current)
  const [isEmojiShow, setIsEmojiShow] = useState(false)
  const [isPanelShow, setIsPanelShow] = useState(false)
  const [keyboardHeight, setKeyboardHeight] = useState(0)
  const [keyboardShow, setKeyboardShow] = useState(false)
  const [xHeight, setXHeight] = useState(iphoneXBottomPadding)
  const [visibleHeight, setVisibleHeight] = useState(useSharedValue(0))
  // const [viewHeaderHeight, setViewHeaderHeight] = useState(headerHeight)
  const [messageContent, setMessageContent] = useState('')
  const [inputChangeSize, setInputChangeSize] = useState(0)
  const panelContainerHeight =
    allPanelHeight + (isIphoneX() ? iphoneXBottomPadding : 0)

  const height = useDerivedValue(() => {
    return interpolate(
      visibleHeight.value,
      [0, 1],
      [
        deviceHeight - viewHeaderHeight.current,
        keyboardShow
          ? deviceHeight - keyboardHeight - viewHeaderHeight.current
          : deviceHeight - viewHeaderHeight.current - panelContainerHeight,
      ],
      Extrapolate.CLAMP,
    )
  })

  const animatedStyle = useAnimatedStyle(() => {
    return { height: height.value }
  })

  const closeAll = useCallback(() => {
    return console.log('xxx')
  }, [])

  const renderItem = useCallback(({ item, index }) => {
    return <ChatItem message={item} />
  }, [])

  const onFocus = useCallback(() => {
    if (!isiOS) {
      return null
    }
  }, [])

  const _changeText = useCallback((value) => {
    setMessageContent(value)
  }, [])

  const _onContentSizeChange = useCallback((e) => {
    const changeHeight = e.nativeEvent.contentSize.height
    if (changeHeight === 34) return
    setInputChangeSize(changeHeight <= 70 ? changeHeight : 70)
    if (!inverted) {
    }
  }, [])

  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
        backgroundColor: '#f0f0f0',
      }}
      onLayout={(e) => (rootHeight.current = e.nativeEvent.layout.height)}
    >
      <Animated.View
        style={[styles.animated, isiOS ? animatedStyle : { flex: 1 }]}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={closeAll}
          style={{ flex: 1, backgroundColor: 'transparent' }}
        >
          <FlatList
            {...flatListProps}
            ref={chatList}
            data={messageList}
            inverted={inverted}
            enableEmptySections
            renderItem={renderItem}
            scrollEventThrottle={100}
            onEndReachedThreshold={0.1}
            showsVerticalScrollIndicator={true}
            keyExtractor={(item) => `${item.id}`}
            automaticallyAdjustContentInsets={false}
            onLayout={(e) => {
              listHeight.current = e.nativeEvent.layout.height
            }}
            // ListFooterComponent={renderLoadEarlier}
          />
        </TouchableOpacity>
        <InputBar
          xHeight={xHeight}
          onFocus={onFocus}
          isEmojiShow={isEmojiShow}
          isPanelShow={isPanelShow}
          inputHeightFix={0}
          messageContent={messageContent}
          inputChangeSize={inputChangeSize}
          // inputContainerStyle,
          textChange={_changeText}
          // inputOutContainerStyle,
          onContentSizeChange={_onContentSizeChange}
        />
      </Animated.View>
    </View>
  )
}

export { ChatView }

const styles = StyleSheet.create({
  animated: {
    backgroundColor: 'transparent',
  },
})
