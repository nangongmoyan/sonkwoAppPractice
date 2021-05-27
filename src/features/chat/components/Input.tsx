/**
 *
 * created by lijianpo on 2021/05/24
 */
import { isiOS } from '@util'
import React, { useRef } from 'react'
import { TouchableOpacity, TextInput, StyleSheet } from 'react-native'

const Input: React.FC<any> = ({
  enabled,
  onFocus,
  inputRef,
  inputStyle,
  placeholder,
  textChange,
  inputHeightFix,
  messageContent,
  inputChangeSize,
  onContentSizeChange,
}) => {
  // const input = useRef(null)
  return (
    <TouchableOpacity activeOpacity={1} disabled={!enabled} onPress={onFocus}>
      <TextInput
        multiline
        ref={inputRef}
        editable={!enabled}
        blurOnSubmit={false}
        value={messageContent}
        placeholder={placeholder}
        onChangeText={textChange}
        placeholderTextColor="#5f5d70"
        underlineColorAndroid="transparent"
        onContentSizeChange={onContentSizeChange}
        style={[
          styles.commentBar__input,
          { height: Math.max(35 + inputHeightFix, inputChangeSize) },
          inputStyle,
        ]}
      />
    </TouchableOpacity>
  )
}

export { Input }

const styles = StyleSheet.create({
  commentBar__input: {
    borderRadius: 18,
    height: 26,
    width: '100%',
    padding: 0,
    paddingHorizontal: 16,
    paddingTop: isiOS ? 8 : 0,
  },
})
