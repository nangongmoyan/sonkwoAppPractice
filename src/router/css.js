/**
 * router样式集
 * created by lijianpo on 2021/04/25
 */
import { vw } from '@util'
import { StyleSheet } from '@ui'
import { ThemeColors } from 'ui/theme'

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
  brancheTitleStyle: {
    marginLeft: 10,
    color: ThemeColors.DarkGray,
  },
  itemTitleStyle: {
    fontSize: 14,
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
