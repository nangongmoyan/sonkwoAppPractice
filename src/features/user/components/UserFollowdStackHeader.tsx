/**
 * created by lijianpo on 2021/06/11
 */

import { MyText } from '@ui'
import React from 'react'
import { useIsSelf } from '../hooks/useIsSelf'

const UserFollowdStackHeader: React.FC<any> = ({ userId, title }) => {
  const isSelf = useIsSelf(userId)

  const renderSelf = () => {
    return <MyText>.....</MyText>
  }

  return <>{isSelf && renderSelf()}</>
}

export { UserFollowdStackHeader }
