/**
 * 通知设置
 * created by lijianpo 2021/05/08
 */

import { useLocale } from '@contexts/locale'
import {
  Column,
  CustomStackHeader,
  Divider,
  MyStatusBar,
  MyText,
  NavItem,
} from '@ui'
import { adaptiveWidth } from '@util'
import React, { useMemo } from 'react'
import { ThemeColors } from 'ui/theme'

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
  }, [t])
  return (
    <Column style={{ flex: 1, backgroundColor: 'white' }}>
      <MyStatusBar isDarkStyle={true} />
      <CustomStackHeader title={t('LANG86')} />
      {allRoutes.map((all, index) => {
        return (
          <Column key={index}>
            <Column
              style={{
                height: 30,
                backgroundColor: ThemeColors.WhiteSmoke,
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingLeft: adaptiveWidth(30),
              }}
            >
              <MyText color={ThemeColors.DimGray}>{all[0].parent}</MyText>
            </Column>
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
      <Divider style={{ flex: 1, backgroundColor: ThemeColors.WhiteSmoke }} />
    </Column>
  )
}

export { Notification }
