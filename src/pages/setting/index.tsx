/**
 * 设置
 * created by lijianpo on 2021/05/08
 */
import { useLocale } from '@contexts/locale'
import { useNavigation } from '@hooks'
import { clearCache, getCacheSize } from '@native'
import { Column, CustomStackHeader, MyStatusBar, NavItem, MyText } from '@ui'
import React, { useMemo, useState, useCallback, useEffect } from 'react'

const ITEMS = [
  { route: 'Notification', label: 'LANG86' },
  { route: 'Privacy', label: 'LANG87' },
  { route: 'ClearCache', label: 'LANG88' },
]
const Setting: React.FC<any> = ({}) => {
  const { t } = useLocale()
  const navigation = useNavigation()
  const [size, setSize] = useState<string>('0MB')

  useEffect(() => {
    getCacheSize().then((value) => {
      const cacheSize = Math.round((value / 1024 / 1024) * 100) / 100
      setSize(`${cacheSize}MB`)
    })
  }, [])

  const routes = useMemo(() => {
    return ITEMS.map((item) => {
      Object.assign(item, { title: t(item.label) })
      switch (item.route) {
        case 'Privacy':
        case 'Notification':
          return item
        case 'ClearCache':
          return { ...item, rightTitle: size }
      }
    })
  }, [size])

  const rightExtraTitle = useCallback((rightTitle) => {
    if (!rightTitle) return
    return (
      <MyText color="#222" style={{ marginRight: 10 }}>
        {rightTitle}
      </MyText>
    )
  }, [])

  const onPress = useCallback(
    (route) => {
      if (route === 'ClearCache') {
        clearCache().then(() => setSize('0MB'))
        return
      }
      navigation.navigate(route)
    },
    [navigation],
  )

  return (
    <Column style={{ flex: 1, backgroundColor: 'white' }}>
      <MyStatusBar isDarkStyle={true} />
      <CustomStackHeader title={t('LANG32')} />
      {routes.map((item, index) => {
        const { route, title, rightTitle } = item
        return (
          <NavItem
            key={index}
            itemTitle={title}
            showItemSeparator={true}
            onPress={() => onPress(route)}
            rightExtraTitle={rightExtraTitle(rightTitle)}
          />
        )
      })}
    </Column>
  )
}

export { Setting }
