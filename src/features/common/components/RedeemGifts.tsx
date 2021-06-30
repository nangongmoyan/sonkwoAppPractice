/**
 * 兑换礼物
 * created by lijianpo on 2021/06/30
 */
import React from 'react'
import { getBottomSpace } from '@util'
import { Column, MyText, Platform, StyleSheet } from '@ui'
const RedeemGifts: React.FC<any> = ({}) => {
  return (
    <Column style={styles.container}>
      <MyText>兑换礼物</MyText>
    </Column>
  )
}
export { RedeemGifts }

const styles = StyleSheet.create({
  container: {
    paddingVertical: getBottomSpace() / 2,
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: '#E8E8F1',
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 1,
      },
      android: {
        elevation: 5,
      },
    }),
  },
})
