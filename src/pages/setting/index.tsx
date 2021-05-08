/**
 * 设置
 * created by lijianpo on 2021/05/08
 */
import { useLocale } from '@contexts/locale'
import { useNavigation } from '@hooks'
import { Column, CustomStackHeader, MyStatusBar, NavItem } from '@ui'
import React, { useMemo, useCallback } from 'react'

const ITEMS = [
  { route: 'Notification', label: 'LANG86' },
  { route: 'Privacy', label: 'LANG87' },
  { route: 'ClearCache', label: 'LANG88' },
]
const Setting: React.FC<any> = ({}) => {
  const { t } = useLocale()
  const navigation = useNavigation()
  const routes = useMemo(() => {
    return ITEMS.map((item) => {
      Object.assign(item, { title: t(item.label) })
      return item
    })
  }, [])

  const onPress = useCallback((route) => navigation.navigate(route), [
    navigation,
  ])
  return (
    <Column style={{ flex: 1, backgroundColor: 'white' }}>
      <MyStatusBar isDarkStyle={true} />
      <CustomStackHeader title={t('LANG32')} />
      {routes.map((item, index) => {
        const { title } = item
        return (
          <NavItem
            key={index}
            itemTitle={title}
            onPress={() => onPress(item.route)}
            showItemSeparator={true}
          />
        )
      })}
    </Column>
  )
}

export { Setting }
