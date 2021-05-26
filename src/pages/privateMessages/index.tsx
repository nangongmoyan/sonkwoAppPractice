/**
 *
 * created by lijianpo on 2021/05/23
 */
import React, { useCallback, useMemo, useRef, useState } from 'react'
import {
  Column,
  CustomStackHeader,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Dimensions,
  MyText,
  MyStatusBar,
} from '@ui'
// import { ChatScreen } from 'react-native-easy-chat-ui'
import FastImage from 'react-native-fast-image'
import { ChatView } from '@features/chat/components/ChatView'
import { isSomeMinutes } from '@features/chat/utils'
import { useRoute } from '@hooks'
import {
  usePrivateMessages,
  setConversationQueryCache,
} from '@features/conversation/model'
import { useUserInfo } from '@features/user/hooks/useIsSelf'
import moment from 'moment'

const PrivateMessages: React.FC<any> = ({}) => {
  const { params = {} } = useRoute()
  const { id, target } = params
  const { id: userId, nickname: userName, avatar: userAvatar } = useUserInfo()
  setConversationQueryCache(id)
  const { data } = usePrivateMessages(id)
  const messageArr = data?.pages[0]?.privateMessages
  const messages = useMemo(() => {
    if (messageArr) {
      return messageArr
        .sort((a, b) => a.createdAtTimestamp - b.createdAtTimestamp)
        .map((message, index) => {
          const nickname =
            message.accountId === userId ? userName : target.nickname
          const avatar =
            message.accountId === userId ? userAvatar : target.avatar
          const messageData = {
            avatar,
            nickname,
            id: index,
            type: 'text',
            renderTime: false,
            content: message.content,
            targetId: message.accountId,
            time: message.createdAtTimestamp * 1000,
          }
          const previousMessage = messageArr[index - 1] || {}

          const currentCreatedAt = moment(message.createdAtTimestamp * 1000)
          const previousCreatedAt = moment(
            previousMessage.createdAtTimestamp * 1000,
          )
          const result = currentCreatedAt.isSame(previousCreatedAt, 'm')
          console.log({ currentCreatedAt, previousCreatedAt, result })

          if (!isSomeMinutes(message, previousMessage)) {
            Object.assign(messageData, { renderTime: true })
          }
          return messageData
        })
    } else {
      return []
    }
  }, [messageArr, target.avatar, target.nickname, userAvatar, userId, userName])

  const sendMessage = useCallback(() => {
    return null
  }, [])

  const onMessagePress = useCallback(() => {
    return null
  }, [])

  return (
    <Column style={{ flex: 1, backgroundColor: 'white' }}>
      <MyStatusBar isDarkStyle={true} />
      <CustomStackHeader title={target.nickname} />
      <ChatView
        headerHeight={44}
        messageList={messages}
        sendMessage={sendMessage}
        onMessagePress={onMessagePress}
      />
    </Column>
  )
}

export { PrivateMessages }
