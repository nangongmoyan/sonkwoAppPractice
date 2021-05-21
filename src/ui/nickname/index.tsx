/**
 *
 * created by lijianpo on 2021/05/21
 */

import React, { useMemo } from 'react'
import MyText from '../text'

const Nickname: React.FC<any> = ({
  nickname,
  size = 12,
  show_status = null,
  ...otherProps
}) => {
  const { name } = useMemo(() => {
    return {
      name: show_status === 'closed' || !nickname ? '用户已注销' : nickname,
    }
  }, [show_status, nickname])

  return (
    <MyText size={size} numberOfLines={1} {...otherProps}>
      {name}
    </MyText>
  )
}

export default Nickname
