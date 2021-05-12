/**
 * 隐私设置
 * created by lijianpo on 2021/05/08
 */
import React, { useMemo } from 'react'
import { changeWaterMark, toggleSteamReview } from '@actions/user_action'
import { useLocale } from '@contexts/locale'
import { useUserInfo } from '@features/user/hooks/useIsSelf'
import { useDispatch } from '@hooks'
import {
  Column,
  CustomStackHeader,
  Divider,
  MyStatusBar,
  MyText,
  NavItem,
} from '@ui'
import { adaptiveWidth } from '@util'
import { ThemeColors } from 'ui/theme'
import { findLast } from 'lodash'

const block = [{ route: 'Block', label: 'LANG99' }]
const watermark = [{ route: 'Watermark', label: 'LANG100' }]
const steamReviews = [{ route: 'SteamReviews', label: 'LANG101' }]

const Privacy: React.FC<any> = ({}) => {
  const { t } = useLocale()
  const dispatch = useDispatch()
  const { configs, steam, showSteamReview } = useUserInfo()
  const noValue = !configs || configs.length === 0
  const status = findLast(configs, (v) => v.key === 'status')

  const allPrivacy = useMemo(() => {
    return steam ? [block, watermark, steamReviews] : [block, watermark]
  }, [steam])

  const waterMark = useMemo(() => {
    return noValue || status.value === 'open' ? true : false
  }, [noValue, status])

  const allRoutes = useMemo(() => {
    return allPrivacy.map((branche) => {
      return branche.map((item) => {
        const { route, label } = item
        Object.assign(item, { title: t(label) })
        switch (route) {
          case 'Block':
            return { ...item, parent: t('LANG96') }
          case 'Watermark':
            return { ...item, parent: t('LANG97'), rightTitle: waterMark }
          case 'SteamReviews':
            return {
              ...item,
              parent: t('LANG98'),
              rightTitle: showSteamReview !== 'hidden',
            }
        }
      })
    })
  }, [t, waterMark, showSteamReview])

  const onSwitch = (value: boolean, route: string) => {
    if (route === 'Watermark') {
      const config = { key: 'status', kind: 'water_mark', value: 'close' }
      !noValue &&
        Object.assign(config, {
          id: status.id,
          value: status.value === 'open' ? 'close' : 'open',
        })
      dispatch(changeWaterMark([config]))
    } else if (route === 'SteamReviews') {
      dispatch(toggleSteamReview(value ? 'visible' : 'hidden'))
    }
  }

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
            {all.map((item, i) => {
              const { route, title, rightTitle } = item
              return (
                <NavItem
                  key={i}
                  itemType={index !== 0 ? 'switch' : 'normal'}
                  itemTitle={title}
                  showItemSeparator={true}
                  switchProps={{
                    value: rightTitle,
                    onValueChange: (value: boolean) => onSwitch(value, route),
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

export { Privacy }
