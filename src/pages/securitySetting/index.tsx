/**
 * 账号安全
 * created by lijianpo on 2021/05/08
 */

import { useLocale } from '@contexts/locale'
import { useUserInfo } from '@features/user/hooks/useIsSelf'
import {
  Column,
  CustomStackHeader,
  Divider,
  MyStatusBar,
  MyText,
  NavItem,
  StyleSheet,
} from '@ui'
import { adaptiveWidth } from '@util'
import React, { useCallback, useMemo } from 'react'
import { ThemeColors } from 'ui/theme'

const ITEMS = [
  { route: 'PhoneNumber', label: 'LANG75' },
  { route: 'LoginPassword', label: 'LANG76' },
  { route: 'Authentication', label: 'LANG77' },
  { route: 'WechatBinding', label: 'LANG78' },
  { route: 'SinaBinding', label: 'LANG79' },
  { route: 'EmailBinding', label: 'LANG80' },
  { route: 'SteamBinding', label: 'LANG81' },
]
const SecuritySetting: React.FC<any> = ({}) => {
  const { t } = useLocale()
  const userInfo = useUserInfo()
  console.log({ userInfo })
  const routes = useMemo(() => {
    return ITEMS.map((item) => {
      const { route, label } = item
      Object.assign(item, { title: t(label) })
      const { phone_number, credential_num, steam, wechat } = userInfo
      switch (route) {
        case 'PhoneNumber':
          return { ...item, rightTitle: phone_number || t('LANG82') }
        case 'LoginPassword':
          return { ...item }
        case 'Authentication':
          return {
            ...item,
            rightTitle: credential_num ? t('LANG85') : t('LANG84'),
          }
        case 'WechatBinding':
          return { ...item, rightTitle: wechat ? t('LANG83') : t('LANG82') }
        case 'SinaBinding':
          return { ...item, rightTitle: wechat ? t('LANG83') : t('LANG82') }
        case 'EmailBinding':
          return { ...item, rightTitle: wechat ? t('LANG83') : t('LANG82') }
        case 'SteamBinding':
          return {
            ...item,
            rightTitle: steam ? `Steam ID:${steam}` : t('LANG82'),
          }
      }
    })
  }, [userInfo])

  const rightExtraTitle = useCallback((rightTitle) => {
    return (
      <MyText color="#222" style={{ marginRight: 10 }}>
        {rightTitle ?? ''}
      </MyText>
    )
  }, [])
  return (
    <Column style={{ flex: 1, backgroundColor: 'white' }}>
      <MyStatusBar isDarkStyle={true} />
      <CustomStackHeader title={t('LANG35')} />
      <Divider height={StyleSheet.hairlineWidth} color="#ddd" />
      {routes.map((item, index) => {
        const { title, route, rightTitle } = item
        return (
          <Column key={index}>
            {index === 2 && <Divider height={15} color="#eee" />}
            {index === 3 && (
              <Column
                style={{ width: '100%', height: 30, backgroundColor: '#eee' }}
              >
                <MyText
                  style={{
                    position: 'absolute',
                    bottom: 5,
                    left: adaptiveWidth(30),
                  }}
                >
                  绑定信息
                </MyText>
              </Column>
            )}
            <NavItem
              itemTitle={title}
              showItemSeparator={index === 2 || index === 3 ? false : true}
              rightExtraTitle={rightExtraTitle(rightTitle)}
            />
          </Column>
        )
      })}
    </Column>
  )
}

export { SecuritySetting }
