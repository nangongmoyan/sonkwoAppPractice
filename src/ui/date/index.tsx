/**
 *
 * created by lijianpo on 2021/05/21
 */
import { useDate } from '@hooks'
import React from 'react'
import MyText from 'ui/text'
const Date: React.FC<any> = ({
  timestamp,
  fromNow = false,
  format = 'YYYY-MM-DD',
  ...restProps
}) => {
  const dateTime = useDate(timestamp, format, fromNow)
  return (
    <MyText color="light_grey" size={12} {...restProps}>
      {dateTime}
    </MyText>
  )
}

export default Date
