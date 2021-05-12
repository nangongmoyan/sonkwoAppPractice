/**
 * 通知设置
 * created by lijianpo 2021/05/08
 */

import { useLocale } from '@contexts/locale'
import {
  setNotificationQueryCache,
  useUserNotification,
} from '@features/notification/model'
import { notiApi } from '@sonkwo/sonkwo-api'
import {
  Column,
  CustomStackHeader,
  Divider,
  MyStatusBar,
  MyText,
  NavItem,
} from '@ui'
import { adaptiveWidth } from '@util'
import React, { useEffect, useMemo, useRef } from 'react'
import { ThemeColors } from 'ui/theme'

const Interactive = [
  { route: 'like', label: 'LANG89' },
  { route: 'follow', label: 'LANG90' },
  { route: 'comment', label: 'LANG91' },
  { route: 'at', label: 'LANG92' },
]

const PrivateLetters = [{ route: 'message', label: 'LANG93' }]

const allNotification = [Interactive, PrivateLetters]

const Notification: React.FC<any> = ({}) => {
  const { t } = useLocale()
  const hasSwitched = useRef(false)
  const { data, isLoading } = useUserNotification()

  useEffect(() => {
    if (hasSwitched.current && data) {
      notiApi.updateNotiSetting(data)
    }
  }, [data])

  const allRoutes = useMemo(() => {
    return allNotification.map((branche) => {
      return branche.map((item) => {
        const { route, label } = item
        Object.assign(item, { title: t(label) })
        switch (route) {
          case 'like':
            return {
              ...item,
              parent: t('LANG94'),
              rightTitle: data?.pushSetting?.like ?? false,
            }
          case 'follow':
            return { ...item, rightTitle: data?.pushSetting?.follow ?? false }
          case 'comment':
            return { ...item, rightTitle: data?.pushSetting?.comment ?? false }
          case 'at':
            return { ...item, rightTitle: data?.pushSetting?.at ?? false }
          case 'message':
            return {
              ...item,
              parent: t('LANG95'),
              rightTitle: data?.pushSetting?.message ?? false,
            }
        }
      })
    })
  }, [t, data])

  const onSwitch = (value: boolean, route: string) => {
    hasSwitched.current = true
    setNotificationQueryCache(value, route)
  }
  if (isLoading) return null
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
            {all.map((item, i) => {
              const { route, title, rightTitle } = item
              return (
                <NavItem
                  key={i}
                  itemType="switch"
                  itemTitle={title}
                  showItemSeparator={true}
                  switchProps={{
                    value: rightTitle,
                    onValueChange: (value) => onSwitch(value, route),
                  }}
                />
              )
            })}
          </Column>
        )
      })}
      <Divider style={{ flex: 1, backgroundColor: ThemeColors.WhiteSmoke }} />
    </Column>
  )
}

export { Notification }
