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
  selectMultiple,
  rowId,
  message,
  closeAll,
}) => {
  const [loading, setLoading] = useState(false)
  const [isSelect, setIsSelect] = useState(false)
  const isSelf = useIsSelf(message.targetId)

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
      <View>
        {message.renderTime ? <MessageTime time={message.time} /> : null}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => closeAll()}
          style={[styles.chat, isSelf ? styles.right : styles.left]}
        >
          <Avatar size={32} avatar={message.avatar} />
          {renderContent()}
        </TouchableOpacity>
      </View>
    </View>
  )
}

export { ChatItem }

const styles = StyleSheet.create({
  chat: {
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  right: {
    flexDirection: 'row-reverse',
  },
  left: {
    flexDirection: 'row',
  },
})
