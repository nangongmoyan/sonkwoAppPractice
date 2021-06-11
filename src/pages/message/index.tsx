/**
 *
 * created by lijianpo on 2021/05/20
 */
import { useLocale } from '@contexts/locale'
import { useConversation } from '@features/conversation/model'
import {
  Badge,
  Column,
  CustomStackHeader,
  ImageBackground,
  MyListView,
  MyStatusBar,
  MyText,
  Row,
  View,
} from '@ui'
import { adaptiveWidth, deviceWidth } from '@util'
import React, { useCallback, useMemo } from 'react'
import { ConversationItem } from './components'

const KINDS = [
  {
    value: ['wish', 'key', 'operate', 'register_reward'],
    route: 'XiaoMi',
    label: 'LANG129',
    uri: require('@source/images/messageOfYh.png'),
  },
  {
    value: ['comment', 'reply'],
    route: 'Comment/Reply',
    label: 'LANG130',
    uri: require('@source/images/messageOfTalk.png'),
  },
  {
    value: ['at'],
    route: 'At',
    label: 'LANG131',
    uri: require('@source/images/messageOfAt.png'),
  },
  {
    value: ['like', 'follow'],
    route: 'Like/Follow',
    label: 'LANG132',
    uri: require('@source/images/messageOfBx.png'),
  },
]

const Message: React.FC<any> = ({}) => {
  const { t } = useLocale()
  const { data } = useConversation()
  const allRoutes = useMemo(() => {
    return KINDS.map((kind) => {
      switch (kind.route) {
        case 'XiaoMi':
        case 'Comment/Reply':
        case 'At':
        case 'Like/Follow':
          return { ...kind, title: t(kind.label) }
      }
    })
  }, [t])
  const renderHeader = useCallback(() => {
    return (
      <Row
        style={{
          marginBottom: 20,
          width: deviceWidth,
          paddingHorizontal: 15,
          justifyContent: 'space-around',
        }}
      >
        {allRoutes.map((item, index) => (
          <Column align="center" key={index}>
            <ImageBackground
              source={item?.uri}
              style={{ width: 44, height: 44, marginVertical: 10 }}
            />
            <MyText>{item?.title}</MyText>
            {/* <Badge
              count={10}
              containerstyle={{ top: 0, right: 0, position: 'absolute' }}
            /> */}
          </Column>
        ))}
      </Row>
    )
  }, [])
  const renderRight = useCallback(() => {
    return (
      <MyText style={{ fontSize: 13, width: adaptiveWidth(150) }}>
        创建聊天
      </MyText>
    )
  }, [])
  const renderItem = useCallback(({ item }) => {
    return <ConversationItem {...item} />
  }, [])
  return (
    <Column style={{ flex: 1, backgroundColor: 'white' }}>
      <MyStatusBar isDarkStyle={true} />
      <CustomStackHeader
        title={t('LANG33')}
        renderRight={renderRight}
        rightWidth={adaptiveWidth(150)}
      />
      <MyListView
        data={data?.conversations || []}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
      />
    </Column>
  )
}

export { Message }
