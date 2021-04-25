/**
 * router样式集
 * created by lijianpo on 2021/04/25
 */
import { vw } from '@util'
import { StyleSheet } from '@ui'

const routerStyles = StyleSheet.create({
  headItemTitleStyle: {
    fontSize: 12,
    color: 'grey',
    marginLeft: 10,
  },
  headItemStyle: {
    width: vw(68),
    paddingHorizontal: 10,
  },
  itemTitleStyle: {
    fontSize: 14,
    color: '#222',
  },
  itemStyle: {
    width: vw(60),
    paddingHorizontal: 10,
  },
  signOutContainer: {
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export { routerStyles }
