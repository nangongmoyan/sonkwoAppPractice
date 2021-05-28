/**
 *
 * created by lijianpo on 2021/05/22
 */
import React, { useCallback, useRef, useState } from 'react'
import { FlatList, StyleSheet, View, TouchableOpacity } from '@ui'
import { Animated, Easing } from 'react-native'
import { debounce, deviceHeight, isiOS } from '@util'
import { isIphoneX, getBottomSpace } from 'react-native-iphone-x-helper'
import { ChatItem } from './ChatItem'
import { InputBar } from './InputBar'
import { PanelContainer } from './PanelContainer'
import useKeyboardStatus from 'hooks/useKeyboardStatus'

const emojiReg = new RegExp('\\[[^\\]]+\\]', 'g')

const ChatView: React.FC<any> = ({
  messageList,
  headerHeight,
  sendMessage,
  inverted = false,
  allPanelHeight = 200,
  allPanelAnimateDuration = 100,
  iphoneXBottomPadding = getBottomSpace(),
}) => {
  const chatList = useRef()
  const inputBar = useRef(null)
  const viewHeaderHeight = useRef(headerHeight).current
  const listHeight = useRef(deviceHeight - viewHeaderHeight)
  const isInverted = useRef(false)
  const _userHasBeenInputed = useRef(false)
  const [cursorIndex, setCursorIndex] = useState(0)
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

  const keyboardShowListener = (e) => {
    setKeyboardShow(true)
    if (isiOS) {
      setXHeight(0)
      setKeyboardHeight(e.endCoordinates.height)
      Animated.timing(visibleHeight, {
        toValue: 1,
        duration: e.duration,
        useNativeDriver: false,
        easing: Easing.inOut(Easing.ease),
      }).start()
      if (emojiShow) {
        return closeEmoji()
      }
      if (panelShow) {
        return closePanel()
      }
    }
  }

  const keyboardHideListener = (e) => {
    setKeyboardShow(false)
    if (isiOS) {
      if (emojiShow) {
        return showEmoji()
      }
      if (panelShow) {
        return showPanel()
      }
      Animated.timing(visibleHeight, {
        toValue: 0,
        duration: e.duration,
        useNativeDriver: false,
        easing: Easing.inOut(Easing.ease),
      }).start()
      setXHeight(iphoneXBottomPadding)
    }
  }

  useKeyboardStatus(keyboardShowListener, keyboardHideListener)

  const closeAll = useCallback(
    (callback = () => {}) => {
      if (panelShow) {
        setXHeight(iphoneXBottomPadding)
        return closePanel(true, callback)
      }
      if (emojiShow) {
        setXHeight(iphoneXBottomPadding)
        return closeEmoji(true, callback)
      }
    },
    [panelShow, emojiShow, iphoneXBottomPadding],
  )

  const renderItem = useCallback(
    ({ item, index }) => {
      return <ChatItem message={item} closeAll={closeAll} />
    },
    [closeAll],
  )

  const onFocus = () => {
    if (panelShow) {
      return closePanel(false)
    }
    if (emojiShow) {
      return closeEmoji(false)
    }
  }

  const onBlur = () => {
    if (emojiShow) {
      return showEmoji()
    }
  }
  const _changeText = useCallback((value) => {
    setMessageContent(value)
  }, [])

  const showEmoji = useCallback((callback = () => {}) => {
    setXHeight(0)
    Animated.parallel([
      Animated.timing(isiOS ? visibleHeight : paddingHeight, {
        toValue: 1,
        useNativeDriver: false,
        duration: allPanelAnimateDuration,
      }),
      Animated.timing(emojiHeight, {
        toValue: 1,
        useNativeDriver: false,
        easing: Easing.inOut(Easing.ease),
        duration: allPanelAnimateDuration,
      }),
    ]).start(() => {
      setEmojiShow(true)
      callback && callback()
    })
  }, [])

  const closeEmoji = useCallback((realClose = false, callback = () => {}) => {
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
      callback && callback()
    })
  }, [])

  const isShowPanel = useCallback(() => {
    if (panelShow) {
      return isiOS
        ? inputBar.current?.focus()
        : closePanel(true, () => {
            inputBar.current?.focus()
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
        inputBar.current?.blur()
      }
    }
  }, [isiOS, panelShow, emojiShow, keyboardShow])

  const isShowEmoji = () => {
    if (emojiShow) {
      return isiOS
        ? inputBar.current?.focus()
        : closeEmoji(true, () => {
            inputBar.current?.focus()
          })
    } else {
      if (panelShow) {
        return closePanel(false, () => showEmoji())
      }
      if (!keyboardShow) {
        showEmoji()
      } else {
        setEmojiShow(true)
        setKeyboardShow(true)
        if (isiOS) {
          setXHeight(0)
          setKeyboardHeight(0)
        }
        inputBar.current?.blur()
      }
    }
  }

  const scrollToBottom = (listHeightAndWidth) => {
    if (listHeightAndWidth !== undefined) {
      const { contentHeight } = listHeightAndWidth
      isInverted.current = contentHeight > listHeight
    }

    if (!inverted) {
      debounce(
        () => {
          chatList?.current?.scrollToEnd({
            animated: _userHasBeenInputed.current,
          })
        },
        _userHasBeenInputed ? 0 : 130,
      )
    }
  }

  const _sendMessage = useCallback((messageContent) => {
    _userHasBeenInputed.current = true
    sendMessage(messageContent)
    inputBar.current?.clear()
  }, [])

  const _onContentSizeChange = useCallback((e) => {
    const changeHeight = e.nativeEvent.contentSize.height
    if (changeHeight === 34) return
    setInputChangeSize(changeHeight <= 70 ? changeHeight : 70)
    if (!inverted) {
      chatList?.current?.scrollToEnd({ animated: true })
    }
  }, [])

  /** 添加表情 */
  const onEmojiSelected = (code: string) => {
    if (code === '') return
    let lastText = ''
    const currentTextLength = messageContent.length

    //删除按钮
    if (code === '/{del') {
      //当前文本长度为0直接返回
      if (currentTextLength === 0) return
      //光标在字符串中间
      if (cursorIndex < currentTextLength) {
        // 匹配到的第一个表情符位置
        const emojiIndex = messageContent.search(emojiReg)
        const preStr = messageContent.substring(0, cursorIndex)
        const nextStr = messageContent.substring(cursorIndex)
        // 没有匹配到表情符
        if (emojiIndex === -1) {
          lastText = preStr.substring(0, preStr.length - 1) + nextStr
          setCursorIndex(preStr.length - 1)
        } else {
          // const preStr = messageContent.substring(0, cursorIndex)
          // const nextStr = messageContent.substring(cursorIndex)
          const lastChar = preStr.charAt(preStr.length - 1)
          // 末尾以}结尾的
          if (lastChar === '}') {
            const castArray = preStr.match(emojiReg)
            if (!castArray) {
              const cast = castArray[castArray.length - 1]

              lastText =
                preStr.substring(0, preStr.length - cast.length) + nextStr
              setCursorIndex(preStr.length - 1)
            }
          } else {
            lastText = preStr.substring(0, preStr.length - 1) + nextStr
            setCursorIndex(preStr.length - 1)
          }
        }
      } else {
        // 光标在字符串最后
        const lastChar = messageContent.charAt(currentTextLength - 1)
        // 末尾以}结尾的
        if (lastChar === '}') {
          const castArray = messageContent.match(emojiReg)
          if (castArray) {
            const cast = castArray[castArray.length - 1]
            lastText = messageContent.substring(
              0,
              messageContent.length - cast.length,
            )
            setCursorIndex(messageContent.length - cast.length)
          } else {
            lastText = messageContent.substring(0, messageContent.length - 1)
            setCursorIndex(messageContent.length - 1)
          }
        } else {
          lastText = messageContent.substring(0, currentTextLength - 1)
          setCursorIndex(currentTextLength - 1)
        }
      }
    } else {
      if (cursorIndex <= currentTextLength) {
        lastText = messageContent + code
        setCursorIndex(lastText.length)
      } else {
        const preTemp = messageContent.substring(0, cursorIndex)
        const nextTemp = messageContent.substring(
          cursorIndex,
          currentTextLength,
        )
        lastText = preTemp + code + nextTemp
        setCursorIndex(cursorIndex + code.length)
      }
    }
    setMessageContent(lastText)
  }
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
      // onLayout={(e) => (rootHeight.current = e.nativeEvent.layout.height)}
    >
      <Animated.View
        style={[
          styles.animated,
          isiOS ? { height: animatedHeight } : { flex: 1 },
        ]}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => closeAll()}
          style={{ flex: 1, backgroundColor: 'transparent' }}
        >
          <FlatList
            ref={chatList}
            extraData={messageList}
            data={messageList}
            inverted={inverted}
            renderItem={renderItem}
            scrollEventThrottle={100}
            onEndReachedThreshold={0.1}
            showsVerticalScrollIndicator={true}
            keyExtractor={(item) => `${item.id}`}
            automaticallyAdjustContentInsets={false}
            onLayout={(e) => {
              scrollToBottom(undefined)
              listHeight.current = e.nativeEvent.layout.height
            }}
            onContentSizeChange={(contentWidth, contentHeight) => {
              scrollToBottom({ contentWidth, contentHeight })
            }}
            // ListFooterComponent={renderLoadEarlier}
          />
        </TouchableOpacity>
        <InputBar
          inputRef={inputBar}
          // ref={inputBar}
          xHeight={xHeight}
          onFocus={onFocus}
          onBlur={onBlur}
          inputHeightFix={0}
          isEmojiShow={emojiShow}
          isPanelShow={panelShow}
          isShowEmoji={isShowEmoji}
          isShowPanel={isShowPanel}
          textChange={_changeText}
          messageContent={messageContent}
          inputChangeSize={inputChangeSize}
          onContentSizeChange={_onContentSizeChange}
          onSubmitEditing={_sendMessage}
        />
        <PanelContainer
          emojiHeight={emojiHeight}
          panelHeight={panelHeight}
          visibleHeight={visibleHeight}
          onEmojiSelected={onEmojiSelected}
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
