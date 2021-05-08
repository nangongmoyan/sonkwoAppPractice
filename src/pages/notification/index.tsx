/**
 * 通知设置
 * created by lijianpo 2021/05/08
 */

import { useLocale } from '@contexts/locale'
import { Column, CustomStackHeader, MyStatusBar, MyText, NavItem } from '@ui'
import React, { useMemo } from 'react'

const Interactive = [
  { route: 'Like/Favorite', label: 'LANG89' },
  { route: 'NewFans', label: 'LANG90' },
  { route: 'Comment/Reply', label: 'LANG91' },
  { route: '@', label: 'LANG92' },
]

const PrivateLetters = [{ route: 'PrivateLetters', label: 'LANG93' }]

const allNotification = [Interactive, PrivateLetters]

const Notification: React.FC<any> = ({}) => {
  const { t } = useLocale()

  const allRoutes = useMemo(() => {
    return allNotification.map((branche) => {
      return branche.map((item) => {
        const { route, label } = item
        Object.assign(item, { title: t(label) })
        switch (route) {
          case 'Like/Favorite':
            return { ...item, parent: t('LANG94') }
          case 'NewFans':
          case 'Comment/Reply':
          case '@':
            return { ...item }
          case 'PrivateLetters':
            return { ...item, parent: t('LANG95') }
        }
      })
    })
  }, [])
  return (
    <Column style={{ flex: 1, backgroundColor: 'white' }}>
      <MyStatusBar isDarkStyle={true} />
      <CustomStackHeader title={t('LANG86')} />
      {allRoutes.map((all, index) => {
        return (
          <Column key={index}>
            <MyText>{all[0].parent}</MyText>
            {all.map((item, i) => (
              <NavItem
                key={i}
                itemType="switch"
                itemTitle={item?.title}
                showItemSeparator={true}
              />
            ))}
          </Column>
        )
      })}
    </Column>
  )
}

export { Notification }
