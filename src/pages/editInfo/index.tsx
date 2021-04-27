/**
 * 编辑资料
 * created by lijianpo on 2021/04/27
 */

import { useUserInfo } from '@features/user/hooks/useIsSelf'
import { Column, CustomStackHeader, MyStatusBar, NavItem, MyText } from '@ui'
import React, { useCallback, useMemo } from 'react'
import { UserAvatar } from './components/UserAvatar'

const ITEMS = [
  { route: 'NickName', label: '昵称' },
  { route: 'Sex', label: '性别' },
  { route: 'Birthday', label: '生日' },
  { route: 'PersonalProfile', label: '个人简介' },
  { route: 'ShippingAddress', label: '收货地址' },
]
const EditInfo = (props) => {
  const { navigation } = props
  const { nickname } = useUserInfo()
  const routes = useMemo(() => {
    return ITEMS.map((item) => {
      const { route } = item
      switch (route) {
        case 'NickName':
          return { ...item, rightTitle: nickname }
        case 'Sex':
          return { ...item }
        case 'Birthday':
          return { ...item }
        case 'PersonalProfile':
          return { ...item }
        case 'ShippingAddress':
          return { ...item }
      }
    })
  }, [])

  const rightExtraTitle = useCallback((rightTitle) => {
    if (!rightTitle) return null
    return (
      <MyText size={16} color="#222" style={{ marginRight: 10 }}>
        {rightTitle}
      </MyText>
    )
  }, [])

  const onPress = useCallback((route) => {
    return navigation.navigate(route)
  }, [])
  return (
    <Column style={{ flex: 1 }}>
      <MyStatusBar isDarkStyle={true} />
      <CustomStackHeader title="编辑资料" />
      <UserAvatar />
      {routes.map((item, index) => {
        const { label, route, rightTitle } = item
        return (
          <NavItem
            key={index}
            itemTitle={label}
            showItemSeparator={true}
            rightExtraTitle={rightExtraTitle(rightTitle)}
            onPress={() => onPress(route)}
          />
        )
      })}
    </Column>
  )
}

export { EditInfo }
