/**
 *
 * changed by lijianpo on 2021/04/12
 */

import { TabScreen } from 'router/tabs'
import { Cart } from './cart'
import { Community } from './community'
import { Game } from './game'
import { Mall } from './mall'
import { Mine } from './mine'

const tabSatcks = [
  /**首页 */
  {
    name: 'Mall',
    component: Mall,
    options: { tabBarLabel: '首页' },
  },
  /**游戏 */
  {
    name: 'Game',
    component: Game,
    options: { tabBarLabel: '游戏' },
  },
  /**社区 */
  {
    name: 'Community',
    component: Community,
    options: { tabBarLabel: '社区' },
  },
  /**购物车 */
  {
    name: 'Cart',
    component: Cart,
    options: { tabBarLabel: '购物车' },
  },
  /**我的 */
  {
    name: 'Mine',
    component: Mine,
    options: { tabBarLabel: '我的' },
  },
]

const loggedStacks = [
  /**TabScreen */
  {
    name: 'TabScreen',
    component: TabScreen,
    options: { headerShow: false },
  },
]

export { tabSatcks, loggedStacks }
