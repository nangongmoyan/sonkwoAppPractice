/**
 *
 * created by lijianpo on 2021/05/12
 */
import React, { useMemo, useCallback } from 'react'
import { useLocale } from '@contexts/locale'
import {
  Column,
  CustomStackHeader,
  MyStatusBar,
  NavItem,
  MyText,
  Divider,
} from '@ui'

const ITEMS = [
  { route: 'Sales', label: 'LANG109', rightTitle: 'coop@ceasia.cn' },
  { route: 'Publishing', label: 'LANG110', rightTitle: 'coop@ceasia.cn' },
  { route: 'Media', label: 'LANG111', rightTitle: 'coop@ceasia.cn' },
  { route: 'Yue', label: 'LANG112', rightTitle: 'funding@ceasia.cn' },
]

const Contact: React.FC<any> = ({}) => {
  const { t } = useLocale()
  const allRoutes = useMemo(() => {
    return ITEMS.map((item) => {
      return { ...item, title: t(item.label) }
    })
  }, [])

  const rightExtraTitle = useCallback((rightTitle) => {
    return (
      <MyText size={16} color="#222" style={{ marginRight: 10 }}>
        {rightTitle ?? ''}
      </MyText>
    )
  }, [])

  return (
    <Column style={{ flex: 1, backgroundColor: 'white' }}>
      <MyStatusBar isDarkStyle={true} />
      <CustomStackHeader title={t('LANG104')} />
      <Divider height={30} />
      {allRoutes.map((item) => {
        return (
          <NavItem
            itemTitle={item.title}
            showItemSeparator={true}
            rightExtraTitle={rightExtraTitle(item.rightTitle)}
          />
        )
      })}
    </Column>
  )
}

export { Contact }
