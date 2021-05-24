/**
 *
 * created by lijianpo on 2021/05/24
 */
import { StyleSheet, View, Platform } from '@ui'
import { deviceWidth } from '@util'
import React, { useCallback } from 'react'
import { Container } from './Container'
import { Input } from './Input'

const InputBar: React.FC<any> = ({
  xHeight,
  onFocus,
  inputStyle,
  isIphoneX,
  placeholder = '请输入...',
  isEmojiShow,
  isPanelShow,
  inputHeightFix,
  messageContent,
  inputChangeSize,
  inputContainerStyle,
  textChange = () => {},
  inputOutContainerStyle,
  onContentSizeChange = () => {},
}) => {
  const setInputHeight = useCallback(() => {
    return null
  }, [])

  const enabled = (() => {
    if (Platform.OS === 'android') {
      if (isPanelShow) {
        return true
      }
      if (isEmojiShow) {
        return true
      }
      return false
    } else {
      return false
    }
  })()
  return (
    <Container
      setInputHeight={setInputHeight}
      inputOutContainerStyle={inputOutContainerStyle}
      isIphoneX={isIphoneX}
      xHeight={xHeight}
      inputContainerStyle={inputContainerStyle}
    >
      <View style={styles.container}>
        <Input
          enabled={enabled}
          onFocus={onFocus}
          placeholder={placeholder}
          onContentSizeChange={onContentSizeChange}
          textChange={textChange}
          messageContent={messageContent}
          inputHeightFix={inputHeightFix}
          inputChangeSize={inputChangeSize}
          inputStyle={inputStyle}
        />
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
