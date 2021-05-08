/**
 *
 * created by lijianpo on 2021/04/13
 */
import BuildConfig from '@native/BuildConfig'
import MyDeviceInfo from '@native/MyDeviceInfo'
import { NativeModules, Platform } from 'react-native'
import { isiOS } from './fullscreen'

export const buildConfig = isiOS ? MyDeviceInfo.buildConfig : BuildConfig.FLAVOR
console.log({ isiOS, MyDeviceInfo })
export const isDev = buildConfig.includes('development')
console.log({ isDev })
export const AREA = { native: 'native', abroad: 'abroad' }

export const configFileHosts = {
  [AREA.abroad]: 'https://s2.sonkwo.hk',
  [AREA.native]: 'https://s2.sonkwo.com',
}

const config = {
  release: {
    fetchUrl: 'https://www.sonkwo.com',
    communityDomain: 'https://club.sonkwo.com',
    wxid: 'wx27f6f754ed396d60',
    captcha: 'https://cheat.sonkwo.com',
    account: 'https://auth.sonkwo.com',
    hk: 'https://www.sonkwo.hk',
    help: 'https://support.sonkwo.com/mobile',
    wallet: '910135728720663',
    phoenix: 'wss://noti.sonkwo.com/socket',
    hkphoenix: 'wss://noti.sonkwo.hk/socket',
    data: 'https://data.sonkwo.com',
    noti: 'https://message.sonkwo.com',
    redeem: 'https://redeem.sonkwo.com',
    community: 'https://community.sonkwo.com',
    [AREA.abroad]: 'https://www.sonkwo.hk',
    [AREA.native]: 'https://www.sonkwo.com',
    maintain: 'https://static.sonkwo.com/production/server_status.json',
    gameTags: 'https://s2.sonkwo.com/production/config/all_tags',
    sidebarTags: 'https://s2-rc.sonkwo.com/config/production_tag_cn',
    group:
      'https://s2.sonkwo.com/community/fd89784e59c72499525556f80289b2c7/config/home',
    postTab:
      'https://s2.sonkwo.com/community/fd89784e59c72499525556f80289b2c7/config/community_lobby_tab',
    walletCouponCn:
      'https://s2.sonkwo.com/config/910135728720663/cn/wallet_discounts',
    walletCouponHk:
      'https://s2.sonkwo.hk/config/910135728720663/cn/wallet_discounts',
    stickerPackagesCn:
      'https://s2.sonkwo.com/community/fd89784e59c72499525556f80289b2c7/sticker_packages',
    stickerPackagesHk:
      'https://s2.sonkwo.hk/community/fd89784e59c72499525556f80289b2c7/sticker_packages',
  },
  debug: {
    fetchUrl: 'https://www.sonkwotest.com',
    communityDomain: 'https://club.sonkwotest.com',
    wxid: 'wx27f6f754ed396d60',
    account: 'https://auth.sonkwotest.com',
    hk: 'https://www.sonkwohktest.com',
    captcha: 'http://cheat.sonkwotest.com',
    help: 'https://support.sonkwo.com/mobile',
    wallet: '31048878832',
    phoenix: 'wss://noti.sonkwotest.com/socket',
    hkphoenix: 'ws://test_noti.sonkwo.hk/socket',
    data: 'https://data.sonkwotest.com',
    noti: 'https://message.sonkwotest.com',
    redeem: 'https://redeem.sonkwotest.com',
    community: 'https://community.sonkwotest.com',
    [AREA.abroad]: 'https://www.sonkwohktest.com',
    [AREA.native]: 'https://www.sonkwotest.com',
    maintain: 'https://static.sonkwo.com/staging/server_status.json',
    gameTags: 'https://s2.sonkwo.com/staging/config/all_tags',
    sidebarTags: 'https://s2-rc.sonkwo.com/config/staging_tag_cn',
    group:
      'https://s2.sonkwo.com/community/28dd2c7955ce926456240b2ff0100bde/config/home',
    postTab:
      'https://s2.sonkwo.com/community/830f78e090fe8aec00891405dfc14824/config/community_lobby_tab',
    walletCouponCn:
      'https://s2.sonkwo.com/config/31048878832/cn/wallet_discounts',
    walletCouponHk:
      'https://s2.sonkwo.hk/config/31048878832/cn/wallet_discounts',
    stickerPackagesCn:
      'https://s2.sonkwo.com/community/830f78e090fe8aec00891405dfc14824/sticker_packages',
    stickerPackagesHk:
      'https://s2.sonkwo.hk/community/830f78e090fe8aec00891405dfc14824/sticker_packages',
  },
  test: {
    fetchUrl: 'http://www.sonkwotest.com',
    communityDomain: 'http://club.sonkwotest.com',
    wxid: 'wx27f6f754ed396d60',
    account: 'http://devauth.sonkwotest.com',
    hk: 'http://test.sonkwo.hk',
    captcha: 'http://cheat.sonkwotest.com',
    help: 'http://support.sonkwo.com/mobile',
    wallet: '31048878832',
    phoenix: 'wss://noti.sonkwotest.com/socket',
    hkphoenix: 'ws://test_noti.sonkwo.hk/socket',
    data: 'http://data.sonkwotest.com',
    noti: 'http://message.sonkwotest.com',
    redeem: 'http://redeem.sonkwotest.com',
    community: 'http://devcommunity.sonkwotest.com',
    [AREA.abroad]: 'http://test.sonkwo.hk',
    [AREA.native]: 'http://www.sonkwotest.com',
    maintain: 'https://static.sonkwo.com/staging/server_status.json',
    gameTags: 'https://s2.sonkwo.com/staging/config/all_tags',
    sidebarTags: 'https://s2-rc.sonkwo.com/config/staging_tag_cn',
    group:
      'https://s2.sonkwo.com/community/830f78e090fe8aec00891405dfc14824/config/home',
    postTab:
      'https://s2.sonkwo.com/community/830f78e090fe8aec00891405dfc14824/config/community_lobby_tab',
    walletCouponCn:
      'https://s2.sonkwo.com/config/31048878832/cn/wallet_discounts',
    walletCouponHk:
      'https://s2.sonkwo.hk/config/31048878832/cn/wallet_discounts',
    stickerPackagesCn:
      'https://s2.sonkwo.com/community/830f78e090fe8aec00891405dfc14824/sticker_packages',
    stickerPackagesHk:
      'https://s2.sonkwo.hk/community/830f78e090fe8aec00891405dfc14824/sticker_packages',
  },
}
const data = config.debug

export default data
