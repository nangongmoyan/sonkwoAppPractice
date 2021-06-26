/**
 * created by lijianpo on 2021/06/26
 */
import React from 'react'
import { Image } from '@ui'
import { getSkuKeyType } from '../utils'
import { get } from 'lodash'

const SkuKeyIcon: React.FC<any> = ({ keyType, size = 16, style }) => {
  const skuKeyType = getSkuKeyType(keyType)
  const icon = get(skuKeyType, 'icon')
  const height = keyType === 'epic_key' ? size * 1.125 : size
  const iconStyle = {
    height,
    width: size,
    ...style,
  }
  return icon ? <Image source={icon} style={iconStyle} /> : null
}

export { SkuKeyIcon }
