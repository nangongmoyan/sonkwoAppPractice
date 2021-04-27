/**
 *
 * changed by lijianpo on 2021/04/12
 */

import { TabScreen } from 'router/tabs'
import { Cart } from './cart'
import { Community } from './community'
import { Game } from './game'
import { Guide } from './guide'
import { Mall } from './mall'
import { UserHome } from './userHome'
import { SignIn } from './sign'
import { EditInfo } from './editInfo'
import { NickName } from './nickName'

const tabSatcks = [
  /** 首页 */
  {
    name: 'Mall',
    component: Mall,
    options: { tabBarLabel: 'LANG1' },
  },
  /** 游戏 */
  {
    name: 'Game',
    component: Game,
    options: { tabBarLabel: 'LANG2' },
  },
  /** 社区 */
  {
    name: 'Community',
    component: Community,
    options: { tabBarLabel: 'LANG3' },
  },
  /** 购物车 */
  {
    name: 'Cart',
    component: Cart,
    options: { tabBarLabel: 'LANG4' },
  },
  /** 我的 */
  {
    name: 'UserHome',
    component: UserHome,
    options: { tabBarLabel: 'LANG5' },
  },
]

const unLoginStacks = [
  /** 登录引导页 */
  {
    name: 'Guide',
    component: Guide,
    options: { headerShown: false },
  },
  /** 登录 */
  {
    name: 'SignIn',
    component: SignIn,
    options: { headerShown: false },
  },
]

const loggedStacks = [
  /** TabScreen */
  {
    name: 'TabScreen',
    component: TabScreen,
    options: { headerShown: false },
  },
  /**编辑资料 */
  {
    name: 'EditInfo',
    component: EditInfo,
    options: { headerShown: false },
  },
  /**编辑资料 */
  {
    name: 'NickName',
    component: NickName,
    options: { headerShown: false },
  },
]

export { unLoginStacks, tabSatcks, loggedStacks }
