/**
 * 我的页
 * created by lijianpo on 2021/04/12
 */
import { Column } from '@ui'
import React from 'react'
import { UserHeader } from './components'

const UserHome = ({ navigation }) => {
  return (
    <Column>
      <UserHeader />
    </Column>
  )
}

export { UserHome }
