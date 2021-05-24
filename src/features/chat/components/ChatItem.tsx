/**
 *
 * created by lijianpo on 2021/05/23
 */
import { useIsSelf } from '@features/user/hooks/useIsSelf'
import {
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Avatar,
} from '@ui'
import React, { useCallback, useMemo, useState } from 'react'
import { MessageTime } from './MessageTime'
import { TextMessage } from './TextMessage'

const ChatItem: React.FC<any> = ({
  type,
  // isOpen,
  chatType,
  showUserName,
  selectMultiple,
  rowId,
  message,
  closeAll,
}) => {
  const [loading, setLoading] = useState(false)
  const [isSelect, setIsSelect] = useState(false)
  const isSelf = useIsSelf(message.targetId)
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
        return <TextMessage isSelf={isSelf} message={message} />
    }
  }, [])
  return (
    <View>
      <View onPress={onPress}>
        <View>
          {type === 'system' ? null : (
            <TouchableOpacity activeOpacity={1}>
              <MessageTime time={message.time} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.chat, isSelf ? styles.right : styles.left]}
          >
            {type === 'system' ? null : (
              <TouchableOpacity>
                <Avatar
                  avatar={message.avatar}
                  style={{
                    marginLeft: 8,
                    borderRadius: 24,
                    width: 48,
                    height: 48,
                  }}
                />
              </TouchableOpacity>
            )}
            <View
              style={StyleSheet.flatten([
                { justifyContent: 'center' },
                type === 'system' && { flex: 1 },
              ])}
            >
              {showName ? <Text>{message.nickName}</Text> : null}
              {renderContent()}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export { ChatItem }

const styles = StyleSheet.create({
  chat: {
    paddingHorizontal: 10,
    paddingVertical: 14,
  },
  right: {
    flexDirection: 'row-reverse',
  },
  left: {
    flexDirection: 'row',
  },
})
