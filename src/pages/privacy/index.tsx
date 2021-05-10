/**
 * 隐私设置
 * created by lijianpo on 2021/05/08
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

const block = [{ route: 'Block', label: 'LANG99' }]
const watermark = [{ route: 'Watermark', label: 'LANG100' }]
const steamReviews = [{ route: 'SteamReviews', label: 'LANG101' }]

const allPrivacy = [block, watermark, steamReviews]
const Privacy: React.FC<any> = ({}) => {
  const { t } = useLocale()

  const allRoutes = useMemo(() => {
    return allPrivacy.map((branche) => {
      return branche.map((item) => {
        const { route, label } = item
        Object.assign(item, { title: t(label) })
        switch (route) {
          case 'Block':
            return { ...item, parent: t('LANG96') }
          case 'Watermark':
            return { ...item, parent: t('LANG97') }
          case 'SteamReviews':
            return { ...item, parent: t('LANG98') }
        }
      })
    })
  }, [t])
  return (
    <Column style={{ flex: 1, backgroundColor: 'white' }}>
      <MyStatusBar isDarkStyle={true} />
      <CustomStackHeader title={t('LANG87')} />
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
                itemType={index !== 0 ? 'switch' : 'normal'}
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

export { Privacy }
