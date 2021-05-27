/**
 *
 * created by lijianpo on 2021/05/24
 */
import { StyleSheet, View, Platform, TouchableOpacity, Image } from '@ui'
import { deviceWidth, isiOS } from '@util'
import React, { useCallback, useMemo, useRef } from 'react'
import { Container } from './Container'
import { Input } from './Input'

const InputBar: React.FC<any> = ({
  xHeight,
  onFocus,
  isShowEmoji,
  isEmojiShow,
  isPanelShow,
  isShowPanel,
  inputHeightFix,
  messageContent,
  inputChangeSize,
  onSubmitEditing,
  textChange = () => {},
  placeholder = '请输入...',
  onContentSizeChange = () => {},
}) => {
  const inputHeight = useRef(0)
  const setInputHeight = useCallback((height) => {
    inputHeight.current = height
  }, [])

  const enabled = useMemo(() => {
    if (isiOS) {
      return false
    } else {
      if (isPanelShow) {
        return true
      }
      if (isEmojiShow) {
        return true
      }
      return false
    }
  }, [isPanelShow, isEmojiShow])

  const renderEmojieIcon = useCallback(() => {
    if (isEmojiShow) {
      return (
        <Image
          source={require('@source/images/keyboard.png')}
          style={{ width: 30, height: 30 }}
        />
      )
    } else {
      return (
        <Image
          source={require('@source/images/emoji.png')}
          style={{ width: 30, height: 30 }}
        />
      )
    }
  }, [isEmojiShow])

  const renderIcon = useCallback(() => {
    const sendAbleIcon = (
      <Image
        source={require('@source/images/sendAble.png')}
        style={{ width: 30, height: 30 }}
      />
    )
    const sendUnableIconDefault = (
      <Image
        source={require('@source/images/send.png')}
        style={{ width: 30, height: 30 }}
      />
    )
    if (messageContent.trim().length) {
      return sendAbleIcon
    } else {
      return sendUnableIconDefault
      // return (
      //   <Image
      //     source={require('@source/images/more.png')}
      //     style={{ width: 30, height: 30 }}
      //   />
      // )
    }
  }, [messageContent])
  return (
    <Container xHeight={xHeight} setInputHeight={setInputHeight}>
      <View style={styles.container}>
        <Input
          enabled={enabled}
          onFocus={onFocus}
          textChange={textChange}
          placeholder={placeholder}
          messageContent={messageContent}
          inputHeightFix={inputHeightFix}
          inputChangeSize={inputChangeSize}
          onContentSizeChange={onContentSizeChange}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => isShowEmoji()}>
          {renderEmojieIcon()}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={messageContent.trim().length === 0}
          style={{ marginLeft: 8 }}
          onPress={() => {
            if (messageContent.trim().length > 0) {
              onSubmitEditing(messageContent)
            } else {
              isShowPanel()
            }
          }}
        >
          {renderIcon()}
        </TouchableOpacity>
      </View>
    </Container>
  )
}

export { InputBar }

const styles = StyleSheet.create({
  commentBar: {
    width: deviceWidth,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    borderColor: '#ccc',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  container: {
    marginHorizontal: 8,
    borderRadius: 18,
    borderColor: '#ccc',
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: 0.8,
  },
  commentBar__input: {
    borderRadius: 18,
    height: 26,
    width: '100%',
    padding: 0,
    paddingHorizontal: 20,
  },
})
