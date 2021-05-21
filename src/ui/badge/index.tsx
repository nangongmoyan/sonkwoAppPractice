/**
 * 角标组件
 * created by lijianpo on 2021/05/21
 */

import React, { useMemo } from 'react'
import { StyleSheet } from 'react-native'
import MyText from '../text'
import { Column } from '../flex'
import { ThemeColors } from 'ui/theme'

const Badge: React.FC<any> = ({ count, textStyle, containerstyle }) => {
  const { number } = useMemo(() => {
    return { number: count > 99 ? '...' : `${count}` }
  }, [count])

  if (count <= 0) return null

  return (
    <Column style={StyleSheet.flatten([styles.container, containerstyle])}>
      <MyText style={StyleSheet.flatten([styles.number, textStyle])}>
        {number}
      </MyText>
    </Column>
  )
}

export default Badge

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ThemeColors.Default,
  },
  number: {
    fontSize: 9,
    color: ThemeColors.White,
  },
})
