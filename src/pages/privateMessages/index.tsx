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
import { getCurrentTime } from '@features/chat/utils'
import { useRoute } from '@hooks'
import {
  setConversationQueryCache,
  usePrivateMessages,
} from '@features/conversation/model'
import { conversationApi } from '@sonkwo/sonkwo-api'
import { then } from 'ramda-adjunct'
import { useUserInfo } from '@features/user/hooks/useIsSelf'

const { width, height } = Dimensions.get('window')

const PrivateMessages: React.FC<any> = ({}) => {
  const { params = {} } = useRoute()
  const { id, target } = params
  const { id: userId, nickname, avatar } = useUserInfo()
  setConversationQueryCache(id)
  const { data = {} } = usePrivateMessages(id)
  const { pages = [] } = data
  console.log({ data })
  const messages = useMemo(() => {
    if (pages[0]?.privateMessages) {
      return pages[0].privateMessages.map((message, index) => {
        const messageData = {
          id: index,
          type: 'text',
          targetId: message.accountId,
          time: message.createdAtTimestamp * 1000,
          ...message,
        }
        if (message.accountId == userId) {
          Object.assign(messageData, { nickname, avatar })
        } else {
          Object.assign(messageData, {
            avatar: target.avatar,
            nickname: target.nickname,
          })
        }
        return messageData
      })
    } else {
      return []
    }
  }, [pages, nickname, avatar, target])
  console.log({ messages })
  // conversationApi
  //   .getPrivateMessages(id, 1)
  //   .then((data) => console.log({ data }))
  // const [messages, setMessages] = useState([
  //   {
  //     id: '1',
  //     type: 'text',
  //     content: 'hello world',
  //     targetId: '12345678',
  //     chatInfo: {
  //       avatar: require('@source/images/defaultAvatar.png'),
  //       id: '12345678',
  //       nickName: 'Test',
  //     },
  //     renderTime: true,
  //     sendStatus: 0,
  //     time: '1542006036549',
  //   },
  //   {
  //     id: '2',
  //     type: 'text',
  //     content: 'hi/{se}',
  //     targetId: '12345678',
  //     chatInfo: {
  //       avatar: require('@source/images/defaultAvatar.png'),
  //       id: '12345678',
  //       nickName: 'Test',
  //     },
  //     renderTime: true,
  //     sendStatus: 0,
  //     time: '1542106036549',
  //   },
  //   {
  //     id: '3',
  //     type: 'image',
  //     content: {
  //       uri:
  //         'https://upload-images.jianshu.io/upload_images/11942126-044bd33212dcbfb8.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240',
  //       width: 100,
  //       height: 80,
  //     },
  //     targetId: '12345678',
  //     chatInfo: {
  //       avatar: require('@source/images/defaultAvatar.png'),
  //       id: '12345678',
  //       nickName: 'Test',
  //     },
  //     renderTime: false,
  //     sendStatus: 0,
  //     time: '1542106037000',
  //   },
  //   {
  //     id: '4',
  //     type: 'text',
  //     content: '你好/{weixiao}',
  //     targetId: '88886666',
  //     chatInfo: {
  //       avatar: require('@source/images/avatar.png'),
  //       id: '12345678',
  //     },
  //     renderTime: true,
  //     sendStatus: -2,
  //     time: '1542177036549',
  //   },
  //   {
  //     id: '5',
  //     type: 'voice',
  //     content: {
  //       uri: 'http://music.163.com/song/media/outer/url?id=317151.mp3',
  //       length: 10,
  //     },
  //     targetId: '12345678',
  //     chatInfo: {
  //       avatar: require('@source/images/defaultAvatar.png'),
  //       id: '12345678',
  //       nickName: 'Test',
  //     },
  //     renderTime: true,
  //     sendStatus: 1,
  //     time: '1542260667161',
  //   },
  //   {
  //     id: '6',
  //     type: 'voice',
  //     content: {
  //       uri: 'http://music.163.com/song/media/outer/url?id=317151.mp3',
  //       length: 30,
  //     },
  //     targetId: '88886666',
  //     chatInfo: {
  //       avatar: require('@source/images/avatar.png'),
  //       id: '12345678',
  //     },
  //     renderTime: true,
  //     sendStatus: 0,
  //     time: '1542264667161',
  //   },
  // ])

  return (
    <Column style={{ flex: 1, backgroundColor: 'white' }}>
      <MyStatusBar isDarkStyle={true} />
      <CustomStackHeader title={target.nickname} />
      <ChatView messageList={messages} headerHeight={50} />
    </Column>
  )
}

export { PrivateMessages }
