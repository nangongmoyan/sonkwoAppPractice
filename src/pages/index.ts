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
import { Birthday } from './birthday'
import { Gender } from './gender'
import { SecuritySetting } from './securitySetting'
import { Setting } from './setting'
import { Notification } from './notification'
import { Privacy } from './privacy'
import { ShippingAddress } from './shippingAddress'
import { Introduction } from './introduction'
import { AboutSonkwo } from './aboutSonkwo'
import { Contact } from './contact'
import { Browser } from '@ui'
import { Wallet } from './wallet'
import { Message } from './message'
import { Conversation } from './conversation'

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
  /** webview */
  {
    name: 'AppWebView',
    component: Browser,
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
  /** webview */
  {
    name: 'AppWebView',
    component: Browser,
    options: { headerShown: false },
  },
  /** 果币 */
  {
    name: 'Wallet',
    component: Wallet,
    options: { headerShown: false },
  },
  /** 设置 */
  {
    name: 'Setting',
    component: Setting,
    options: { headerShown: false },
  },
  /** 通知设置 */
  {
    name: 'Notification',
    component: Notification,
    options: { headerShown: false },
  },
  /** 隐私设置 */
  {
    name: 'Privacy',
    component: Privacy,
    options: { headerShown: false },
  },
  /** 消息 */
  {
    name: 'Message',
    component: Message,
    options: { headerShown: false },
  },
  /** 聊天 */
  {
    name: 'Conversation',
    component: Conversation,
    options: { headerShown: false },
  },
  /** 编辑资料 */
  {
    name: 'EditInfo',
    component: EditInfo,
    options: { headerShown: false },
  },
  /** 修改昵称 */
  {
    name: 'NickName',
    component: NickName,
    options: { headerShown: false },
  },
  /** 修改性别 */
  {
    name: 'Gender',
    component: Gender,
    options: { headerShown: false },
  },
  /** 修改生日 */
  {
    name: 'Birthday',
    component: Birthday,
    options: { headerShown: false },
  },
  /** 个人简介 */
  {
    name: 'Introduction',
    component: Introduction,
    options: { headerShown: false },
  },
  /** 收货地址 */
  {
    name: 'ShippingAddress',
    component: ShippingAddress,
    options: { headerShown: false },
  },
  /** 账号安全 */
  {
    name: 'SecuritySetting',
    component: SecuritySetting,
    options: { headerShown: false },
  },
  /** 关于杉果 */
  {
    name: 'AboutSonkwo',
    component: AboutSonkwo,
    options: { headerShown: false },
  },
  /** 联系我们 */
  {
    name: 'Contact',
    component: Contact,
    options: { headerShown: false },
  },
]

export { unLoginStacks, tabSatcks, loggedStacks }
