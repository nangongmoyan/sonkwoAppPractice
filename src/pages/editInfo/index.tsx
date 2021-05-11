/**
 * 编辑资料
 * created by lijianpo on 2021/04/27
 */

import { getImageToken } from '@actions/user_action'
import { useLocale } from '@contexts/locale'
import { useUserInfo } from '@features/user/hooks/useIsSelf'
import { useDispatch, useNavigation } from '@hooks'
import { Column, CustomStackHeader, MyStatusBar, NavItem, MyText } from '@ui'
import React, { useCallback, useEffect, useMemo } from 'react'
import { UserAvatar } from './components/UserAvatar'

const ITEMS = [
  { route: 'NickName', label: 'LANG70' },
  { route: 'Gender', label: 'LANG71' },
  { route: 'Birthday', label: 'LANG72' },
  { route: 'Introduction', label: 'LANG73' },
  { route: 'ShippingAddress', label: 'LANG74' },
]
const EditInfo: React.FC<any> = () => {
  const { t } = useLocale()
  const navigation = useNavigation()
  const { gender, nickname, birthday, introduction } = useUserInfo()
  console.log({ introduction })
  const { sex } = useMemo(() => {
    return {
      sex: gender === 0 ? '男' : gender === 1 ? '女' : '保密',
    }
  }, [gender])
  const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(getImageToken())
  // })
  const routes = useMemo(() => {
    return ITEMS.map((item) => {
      const { route, label } = item
      Object.assign(item, { title: t(label) })
      switch (route) {
        case 'NickName':
          return { ...item, rightTitle: nickname }
        case 'Gender':
          return { ...item, rightTitle: sex }
        case 'Birthday':
          return { ...item, rightTitle: birthday }
        case 'Introduction':
          return { ...item, rightTitle: introduction }
        case 'ShippingAddress':
          return { ...item }
      }
    })
  }, [t, nickname, sex, birthday, introduction])

  const rightExtraTitle = useCallback((rightTitle) => {
    return (
      <MyText size={16} color="#222" style={{ marginRight: 10 }}>
        {rightTitle ?? ''}
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
        const { title, route, rightTitle } = item
        return (
          <NavItem
            key={index}
            itemTitle={title}
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
