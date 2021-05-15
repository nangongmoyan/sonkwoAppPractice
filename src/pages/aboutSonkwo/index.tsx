/**
 *
 * created by lijianpo on 2021/05/12
 */
import React, { useMemo, useCallback } from 'react'
import { useLocale } from '@contexts/locale'
import { Clipboard, MyDeviceInfo } from '@native'
import {
  Column,
  CustomStackHeader,
  Image,
  MyStatusBar,
  MyText,
  NavItem,
} from '@ui'
import { useNavigation } from '@hooks'
import { toastSuccess } from '@util'
import service from 'router/service'

const ITEMS = [
  { route: 'PrivacyAgreement', label: 'LANG102' },
  { route: 'ServiceAgreement', label: 'LANG103' },
  { route: 'Contact', label: 'LANG104' },
  { route: 'WeChatAccount', label: 'LANG105' },
  { route: 'Sina', label: 'LANG106' },
  { route: 'Score', label: 'LANG107' },
]

const AboutSonkwo: React.FC<any> = ({}) => {
  const { t } = useLocale()
  const navigation = useNavigation()
  const allRoutes = useMemo(() => {
    return ITEMS.map((item) => {
      return { ...item, title: t(item.label) }
    })
  }, [t])

  const onPress = useCallback((route) => {
    if (route === 'PrivacyAgreement') {
      service.navigateByUrl('/mobile/privacy')
    } else if (route === 'Contact') {
      navigation.navigate(route)
    } else if (route === 'WeChatAccount') {
      Clipboard.setString('杉果游戏')
      toastSuccess('复制成功')
    }
  }, [])

  return (
    <Column style={{ flex: 1, backgroundColor: 'white' }}>
      <MyStatusBar isDarkStyle={true} />
      <CustomStackHeader title={t('LANG40')} />
      <Image
        source={require('@source/images/sonkwoIcon.png')}
        style={{ width: 60, height: 60, alignSelf: 'center', marginTop: 30 }}
      />
      <MyText size={14} style={{ marginVertical: 20 }}>
        {t('LANG108')}
        {MyDeviceInfo.appVersion}
      </MyText>
      {allRoutes.map((item, index) => {
        return (
          <NavItem
            key={index}
            itemTitle={item.title}
            showItemSeparator={true}
            onPress={() => onPress(item.route)}
          />
        )
      })}
    </Column>
  )
}

export { AboutSonkwo }
