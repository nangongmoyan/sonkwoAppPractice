/**
 *
 * created by lijianpo on 2021/05/21
 */
import { Avatar, Badge, Column, Date, MyText, Nickname, Row } from '@ui'
import React from 'react'

const ConversationItem: React.FC<any> = ({
  id,
  target,
  unreadCount,
  privateMessage,
}) => {
  return (
    <Row style={{ paddingHorizontal: 25, height: 74, paddingVertical: 15 }}>
      <Column>
        <Avatar disabled avatar={target.avatar} size={44} />
        {/* <Badge/> */}
      </Column>
      <Column
        style={{
          flex: 1,
          height: 44,
          paddingLeft: 15,
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <Row>
          <Nickname nickname={target.nickname} size={14} color="#222" />
          <Column style={{ flex: 1 }} />
          <Date timestamp={privateMessage.createdAtTimestamp} />
        </Row>
        <MyText color="#85858C" numberOfLines={1}>
          {privateMessage.content}
        </MyText>
      </Column>
    </Row>
  )
}

export { ConversationItem }
