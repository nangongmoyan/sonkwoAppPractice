/**
 *
 * created by lijianpo on 2021/05/23
 */
import React, { useCallback, useRef, useState } from 'react'
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

const { width, height } = Dimensions.get('window')

const Conversation: React.FC<any> = ({}) => {
  const { params = { nickname: '' } } = useRoute()
  const { nickname } = params
  const [messages, setMessages] = useState([
    {
      id: '1',
      type: 'text',
      content: 'hello world',
      targetId: '12345678',
      chatInfo: {
        avatar: require('@source/images/defaultAvatar.png'),
        id: '12345678',
        nickName: 'Test',
      },
      renderTime: true,
      sendStatus: 0,
      time: '1542006036549',
    },
    {
      id: '2',
      type: 'text',
      content: 'hi/{se}',
      targetId: '12345678',
      chatInfo: {
        avatar: require('@source/images/defaultAvatar.png'),
        id: '12345678',
        nickName: 'Test',
      },
      renderTime: true,
      sendStatus: 0,
      time: '1542106036549',
    },
    {
      id: '3',
      type: 'image',
      content: {
        uri:
          'https://upload-images.jianshu.io/upload_images/11942126-044bd33212dcbfb8.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240',
        width: 100,
        height: 80,
      },
      targetId: '12345678',
      chatInfo: {
        avatar: require('@source/images/defaultAvatar.png'),
        id: '12345678',
        nickName: 'Test',
      },
      renderTime: false,
      sendStatus: 0,
      time: '1542106037000',
    },
    {
      id: '4',
      type: 'text',
      content: '你好/{weixiao}',
      targetId: '88886666',
      chatInfo: {
        avatar: require('@source/images/avatar.png'),
        id: '12345678',
      },
      renderTime: true,
      sendStatus: -2,
      time: '1542177036549',
    },
    {
      id: '5',
      type: 'voice',
      content: {
        uri: 'http://music.163.com/song/media/outer/url?id=317151.mp3',
        length: 10,
      },
      targetId: '12345678',
      chatInfo: {
        avatar: require('@source/images/defaultAvatar.png'),
        id: '12345678',
        nickName: 'Test',
      },
      renderTime: true,
      sendStatus: 1,
      time: '1542260667161',
    },
    {
      id: '6',
      type: 'voice',
      content: {
        uri: 'http://music.163.com/song/media/outer/url?id=317151.mp3',
        length: 30,
      },
      targetId: '88886666',
      chatInfo: {
        avatar: require('@source/images/avatar.png'),
        id: '12345678',
      },
      renderTime: true,
      sendStatus: 0,
      time: '1542264667161',
    },
  ])

  return (
    <Column style={{ flex: 1, backgroundColor: 'white' }}>
      <MyStatusBar isDarkStyle={true} />
      <CustomStackHeader title={nickname} />
      <ChatView messageList={messages} headerHeight={50} />
    </Column>
  )
}

export { Conversation }
