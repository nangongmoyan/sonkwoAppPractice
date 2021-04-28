/**
 * 生日
 * created by lijianpo on 2021/04/28
 */

import { DateWhell } from '@features/common/components'
import { Column } from '@ui'
import React from 'react'

const Birthday = ({ navigation }) => {
  return (
    <Column style={{ flex: 1 }}>
      <DateWhell />
    </Column>
  )
}

export { Birthday }
