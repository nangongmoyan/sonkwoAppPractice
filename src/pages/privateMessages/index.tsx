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
import { useRoute, useSafeArea } from '@hooks'
import {
  usePrivateMessages,
  setConversationQueryCache,
  postPrivateMessage,
  invalidateMessaqgesQueries,
} from '@features/conversation/model'
import { useUserInfo } from '@features/user/hooks/useIsSelf'

const PrivateMessages: React.FC<any> = ({}) => {
  const { params = {} } = useRoute()
  const { id, target } = params
  setConversationQueryCache(id)
  const { top } = useSafeArea()
  const headerHeight = top + 44
  const { id: userId, nickname: userName, avatar: userAvatar } = useUserInfo()
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
          if (!isSomeMinutes(message, previousMessage)) {
            Object.assign(messageData, { renderTime: true })
          }
          return messageData
        })
    } else {
      return []
    }
  }, [messageArr, target.avatar, target.nickname, userAvatar, userId, userName])

  const sendMessage = useCallback(async (content) => {
    const success = await postPrivateMessage(id, content)
    success && invalidateMessaqgesQueries(id)
  }, [])

  const onMessagePress = useCallback(() => {
    return null
  }, [])

  return (
    <Column style={{ flex: 1, backgroundColor: 'white' }}>
      <MyStatusBar isDarkStyle={true} />
      <CustomStackHeader title={target.nickname} />
      <ChatView
        messageList={messages}
        headerHeight={headerHeight}
        sendMessage={sendMessage}
        onMessagePress={onMessagePress}
      />
    </Column>
  )
}

export { PrivateMessages }
