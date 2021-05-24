/**
 *
 * creatde by lijianpo on 2021/05/24
 */
import { Column, MyText, StyleSheet } from '@ui'
import React, { useMemo } from 'react'
import { getCurrentTime } from '../utils'

const MessageTime: React.FC<any> = ({ time }) => {
  const showTime = useMemo(() => getCurrentTime(time), [time])

  return (
    <Column style={styles.container}>
      <MyText>{showTime}</MyText>
    </Column>
  )
}

export { MessageTime }

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
