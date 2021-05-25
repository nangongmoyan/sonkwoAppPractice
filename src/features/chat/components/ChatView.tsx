/**
 *
 * created by lijianpo on 2021/05/22
 */
import React, { useCallback, useRef, useState, useMemo } from 'react'
import { FlatList, StyleSheet, View, TouchableOpacity } from '@ui'
import { Animated, Easing } from 'react-native'
import { deviceHeight, isiOS } from '@util'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { ChatItem } from './ChatItem'
import { InputBar } from './InputBar'
import { PanelContainer } from './PanelContainer'

const ChatView: React.FC<any> = ({
  messageList,
  headerHeight,
  flatListProps,
  extraData = null,
  inverted = false,
  allPanelHeight = 200,
  iphoneXBottomPadding = 34,
  renderLoadEarlier = () => {},
  allPanelAnimateDuration = 100,
}) => {
  const rootHeight = useRef(0)
  const chatList = useRef(null)
  const inputBar = useRef(null).current
  const viewHeaderHeight = useRef(headerHeight).current
  const listHeight = useRef(deviceHeight - viewHeaderHeight.current)
  const [isEmojiShow, setIsEmojiShow] = useState(false)
  const [isPanelShow, setIsPanelShow] = useState(false)
  const [keyboardHeight, setKeyboardHeight] = useState(0)
  const [keyboardShow, setKeyboardShow] = useState(false)
  const [panelShow, setPanelShow] = useState(false)
  const [emojiShow, setEmojiShow] = useState(false)
  const [xHeight, setXHeight] = useState(iphoneXBottomPadding)

  const visibleHeight = useRef(new Animated.Value(0)).current
  const panelHeight = useRef(new Animated.Value(0)).current
  const paddingHeight = useRef(new Animated.Value(0)).current
  const emojiHeight = useRef(new Animated.Value(0)).current
  const [messageContent, setMessageContent] = useState('')
  const [inputChangeSize, setInputChangeSize] = useState(0)
  const panelContainerHeight =
    allPanelHeight + (isIphoneX() ? iphoneXBottomPadding : 0)

  const closeAll = useCallback((callback = () => {}) => {
    if (panelShow) {
      setXHeight(iphoneXBottomPadding)
      return closePanel(true, callback)
    }
    if (emojiShow) {
      setXHeight(iphoneXBottomPadding)
      return closeEmoji(true, callback)
    }
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

  const closeEmoji = useCallback((realClose = false, callback) => {
    Animated.parallel([
      Animated.timing(isiOS ? visibleHeight : paddingHeight, {
        useNativeDriver: false,
        toValue: realClose ? 0 : 1,
        duration: allPanelAnimateDuration,
      }),
      Animated.timing(emojiHeight, {
        toValue: 0,
        useNativeDriver: false,
        easing: Easing.inOut(Easing.ease),
        duration: allPanelAnimateDuration,
      }),
    ]).start(() => {
      setEmojiShow(false)
      callback && callback()
    })
  }, [])

  const showPanel = useCallback((callback = () => {}) => {
    setXHeight(0)
    Animated.parallel([
      Animated.timing(isiOS ? visibleHeight : paddingHeight, {
        toValue: 1,
        useNativeDriver: false,
        duration: allPanelAnimateDuration,
      }),
      Animated.timing(panelHeight, {
        toValue: 1,
        useNativeDriver: false,
        easing: Easing.inOut(Easing.ease),
        duration: allPanelAnimateDuration,
      }),
    ]).start(() => {
      callback && callback()
      setPanelShow(true)
    })
  }, [])

  const closePanel = useCallback((realClose = false, callback = () => {}) => {
    Animated.parallel([
      Animated.timing(isiOS ? visibleHeight : paddingHeight, {
        useNativeDriver: false,
        toValue: realClose ? 0 : 1,
        duration: allPanelAnimateDuration,
      }),
      Animated.timing(panelHeight, {
        toValue: 0,
        useNativeDriver: false,
        easing: Easing.inOut(Easing.ease),
        duration: allPanelAnimateDuration,
      }),
    ]).start(() => {
      setPanelShow(false)
      callback && callback
    })
  }, [])

  const isShowPanel = useCallback(() => {
    if (panelShow) {
      return isiOS
        ? inputBar?.input?.focus()
        : closePanel(true, () => {
            inputBar?.input?.focus()
          })
    } else {
      if (emojiShow) {
        return closeEmoji(false, () => showPanel())
      }
      if (!keyboardShow) {
        showPanel()
      } else {
        setPanelShow(true)
        setKeyboardShow(false)
        if (isiOS) {
          setXHeight(0)
          setKeyboardHeight(0)
        }
        inputBar?.input?.blur()
      }
    }
  }, [])
  const animatedHeight = visibleHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [
      deviceHeight - viewHeaderHeight,
      keyboardShow
        ? deviceHeight - keyboardHeight - viewHeaderHeight
        : deviceHeight - viewHeaderHeight - panelContainerHeight,
    ],
  })

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
        style={[
          styles.animated,
          isiOS ? { height: animatedHeight } : { flex: 1 },
        ]}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => closeAll}
          style={{ flex: 1, backgroundColor: 'transparent' }}
        >
          <FlatList
            {...flatListProps}
            ref={chatList}
            data={messageList}
            inverted={inverted}
            enableEmptySections
            extraData={extraData}
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
          ref={inputBar}
          xHeight={xHeight}
          onFocus={onFocus}
          isEmojiShow={emojiShow}
          isPanelShow={panelShow}
          inputHeightFix={0}
          messageContent={messageContent}
          inputChangeSize={inputChangeSize}
          isShowPanel={isShowPanel}
          // inputContainerStyle,
          textChange={_changeText}
          // inputOutContainerStyle,
          onContentSizeChange={_onContentSizeChange}
        />
        <PanelContainer
          panelHeight={panelHeight}
          visibleHeight={visibleHeight}
          panelContainerHeight={panelContainerHeight}
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
