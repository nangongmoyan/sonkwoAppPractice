/**
 *
 * created by lijianpo on 2021/05/23
 */
import {
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from '@ui'
import React, { useCallback, useMemo, useState } from 'react'

const ChatItem: React.FC<any> = ({
  type,
  // isOpen,
  chatType,
  showUserName,
  selectMultiple,
  rowId,
  message,
  closeAll,
  renderMessageTime,
  renderTextMessage,
}) => {
  const [loading, setLoading] = useState(false)
  const [isSelect, setIsSelect] = useState(false)

  const showName = useMemo(() => {
    return chatType === 'group' && showUserName && type !== 'system'
  }, [chatType, showUserName, type])

  const onPress = useCallback(() => {
    setIsSelect(!isSelect)
    selectMultiple(!isSelect, parseInt(rowId), message)
  }, [])
  // const Element = isOpen ? TouchableWithoutFeedback : View

  const renderContent = useCallback(() => {
    const { content = {}, type = '' } = message
    switch (type) {
      case 'text':
        if (renderTextMessage) {
          // renderTextMessage({true,true,message, views: message.content,index:parseInt(rowId)})
        } else {
          return <Text>{message.content}</Text>
        }
    }
  }, [])
  return (
    <View>
      <View onPress={onPress}>
        <View>
          {type === 'system' ? null : (
            <TouchableOpacity activeOpacity={1}>
              {message.renderTime ? renderMessageTime(message.time) : null}
            </TouchableOpacity>
          )}
          {/* <TouchableOpacity onPress={closeAll()}>

          </TouchableOpacity> */}
          <View
            style={StyleSheet.flatten([
              { justifyContent: 'center' },
              type === 'system' && { flex: 1 },
            ])}
          >
            {showName ? <Text>{message.chatInfo.nickName}</Text> : null}
            {renderContent()}
          </View>
        </View>
      </View>
    </View>
  )
}

export { ChatItem }
