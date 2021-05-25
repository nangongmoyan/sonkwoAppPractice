/**
 *
 * created by lijianpo on 2021/05/24
 */
import { StyleSheet, View, Platform, TouchableOpacity, Image } from '@ui'
import { deviceWidth, isiOS } from '@util'
import React, { useCallback, useMemo } from 'react'
import { Container } from './Container'
import { Input } from './Input'

const InputBar: React.FC<any> = ({
  xHeight,
  onFocus,
  plusIcon,
  sendIcon,
  emojiIcon,
  inputStyle,
  isShowEmoji,
  isEmojiShow,
  isPanelShow,
  isShowPanel,
  keyboardIcon,
  sendUnableIcon,
  inputHeightFix,
  messageContent,
  inputChangeSize,
  inputContainerStyle,
  textChange = () => {},
  inputOutContainerStyle,
  placeholder = '请输入...',
  onContentSizeChange = () => {},
}) => {
  const setInputHeight = useCallback(() => {
    return null
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
        keyboardIcon || (
          <Image
            source={require('@source/images/keyboard.png')}
            style={{ width: 30, height: 30 }}
          />
        )
      )
    } else {
      return (
        emojiIcon || (
          <Image
            source={require('@source/images/emoji.png')}
            style={{ width: 30, height: 30 }}
          />
        )
      )
    }
  }, [])

  const renderIcon = useCallback(() => {
    const sendAbleIcon = sendIcon || (
      <Image
        source={require('@source/images/sendAble.png')}
        style={{ width: 30, height: 30 }}
      />
    )
    const sendUnableIconDefault = sendUnableIcon || (
      <Image
        source={require('@source/images/send.png')}
        style={{ width: 30, height: 30 }}
      />
    )
    if (messageContent.trim().length) {
      return sendAbleIcon
    } else {
      return (
        plusIcon || (
          <Image
            source={require('@source/images/more.png')}
            style={{ width: 30, height: 30 }}
          />
        )
      )
    }
  }, [])
  return (
    <Container
      xHeight={xHeight}
      setInputHeight={setInputHeight}
      inputContainerStyle={inputContainerStyle}
      inputOutContainerStyle={inputOutContainerStyle}
    >
      <View style={styles.container}>
        <Input
          enabled={enabled}
          onFocus={onFocus}
          textChange={textChange}
          inputStyle={inputStyle}
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
          style={{ marginLeft: 8 }}
          onPress={() => {
            if (messageContent.trim().length > 0) {
            } else {
              isShowPanel(!isPanelShow)
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
