/**
 *
 * created by lijianpo on 2021/06/26
 */

type KeyType = keyof typeof skuKeyTypeMap

interface KeyInfo {
  name: string
  icon?: string
  supportId?: [number, number]
}

const skuKeyTypeMap: Record<any, KeyInfo> = {
  no_key: { name: '免激活码' },
  steam_key: {
    name: 'steam',
    supportId: [45, 64],
    icon: require('@source/images/steam_key.png'),
  },
  uplay_key: {
    name: 'uplay',
    supportId: [46, 65],
    icon: require('@source/images/uplay_key.png'),
  },
  epic_key: {
    name: 'epic',
    supportId: [47, 114],
    icon: require('@source/images/epic_key.png'),
  },
  bnet_key: {
    name: 'bnet',
    supportId: [48, 70],
    icon: require('@source/images/bnet_key.png'),
  },
  sonkwo_key: {
    name: 'sonkwo',
    icon: require('@source/images/sonkwo_key.png'),
  },
  rockstar_key: {
    name: 'rockstar',
    supportId: [74, 107],
    icon: require('@source/images/rockstar_key.png'),
  },
  bundle_key: {
    name: '福袋',
    icon: require('@source/images/bundle_key.png'),
  },
  wanmei_key: {
    name: '完美',
    supportId: [80, 129],
    icon: require('@source/images/wanmei_key.png'),
  },
  wangyuan_key: {
    name: '网元',
    supportId: [81, 130],
    icon: require('@source/images/wangyuan_key.png'),
  },
  gog_key: {
    name: 'GOD',
    supportId: [14, 208],
    icon: require('@source/images/gog_key.png'),
  },
}
const getSupportUrl = (supportId: [number, number] | undefined) => {
  const urlPrefix = 'https://support.sonkwo.com/document?parent_id=5'
  return supportId
    ? `${urlPrefix}&second_id=${supportId[0]}&id=${supportId[1]}`
    : urlPrefix
}

const getSkuKeyType = (skuKeyType: KeyType) => {
  const skuKeyInfo = skuKeyTypeMap[skuKeyType]
  if (!skuKeyInfo) return null
  const { icon, name, supportId } = skuKeyInfo
  const supportUrl = getSupportUrl(supportId)
  return { icon, name, supportUrl }
}

export { getSkuKeyType }
