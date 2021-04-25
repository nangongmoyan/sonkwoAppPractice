/**
 *
 * created by lijianpo on 2021/04/23
 */
import React, { useEffect, useMemo, useCallback } from 'react'
import {
  useIsDrawerOpen,
  DrawerContentScrollView,
} from '@react-navigation/drawer'
import { useLocale } from '@contexts/locale'
import {
  Column,
  Row,
  MyText,
  StatusBar,
  ShadowBox,
  GHWithoutFeedback,
  NavItem,
  Avatar,
} from '@ui'
import { vw } from '@util'
import { routerStyles } from './css'
import { ThemeColors } from 'ui/theme'
import { useDispatch } from '@hooks'
import { signOut } from '@actions/user_action'

const firstItem = [
  { route: 'Wallet', label: 'LANG22' },
  { route: 'Order', label: 'LANG23' },
  { route: 'PointsMall', label: 'LANG24' },
]

const secondItem = [
  { route: 'ActivationCode', label: 'LANG26' },
  { route: 'SonkwoCoupon', label: 'LANG27' },
  { route: 'Favorites', label: 'LANG28' },
  { route: 'GameLibrary', label: 'LANG29' },
  { route: 'TaskCenter', label: 'LANG30' },
]

const thirdItem = [
  { route: 'Setting', label: 'LANG32' },
  { route: 'Messages', label: 'LANG33' },
  { route: 'DressUp', label: 'LANG34' },
]

const fourthItem = [
  { route: 'Help', label: 'LANG36' },
  { route: 'ShareSonkwo', label: 'LANG37' },
  { route: 'AboutSonkwo', label: 'LANG38' },
]

const allItem = [firstItem, secondItem, thirdItem, fourthItem]
function DrawerScreen(props) {
  const { t } = useLocale()
  const dispatch = useDispatch()
  const isDrawerOpen = useIsDrawerOpen()
  const { userInfo, navigation } = props

  const { nickname } = userInfo
  console.log({ userInfo })

  useEffect(() => {
    const barStyle = isDrawerOpen ? 'dark-content' : 'light-content'
    StatusBar.setBarStyle(barStyle, true)
  }, [isDrawerOpen])

  /**
   * allRoutes数据结构
   * [
   *  [{route:'Order', lang:'LANG50',title:'Order', icon:<SvgIcon />}]
   *  [{route:'Order', lang:'LANG50',title:'Order', icon:<SvgIcon />}]
   * ]
   */

  const allRoutes = useMemo(() => {
    return allItem.map((branche) => {
      return branche.map((item) => {
        const { route, label } = item
        Object.assign(item, { title: t(label) })
        switch (route) {
          case 'Wallet':
            return { ...item, parent: t('LANG21') }
          case 'Order':
            return { ...item }
          case 'PointsMall':
            return { ...item }
          case 'ActivationCode':
            return { ...item, parent: t('LANG25') }
          case 'SonkwoCoupon':
            return { ...item }
          case 'Favorites':
            return { ...item }
          case 'GameLibrary':
            return { ...item }
          case 'TaskCenter':
            return { ...item }
          case 'Setting':
            return { ...item, parent: t('LANG31') }
          case 'Messages':
            return { ...item }
          case 'DressUp':
            return { ...item }
          case 'Help':
            return { ...item, parent: t('LANG35') }
          case 'ShareSonkwo':
            return { ...item }
          case 'AboutSonkwo':
            return { ...item }
        }
      })
    })
  }, [t])
  const leftIcon = useCallback((item) => {
    return (
      <Column align="center" justify="center" style={{ marginRight: 30 }}>
        {item.icon}
      </Column>
    )
  }, [])

  const onPress = useCallback((route) => navigation.navigate(route), [
    navigation,
  ])

  const onSignOut = () => {
    dispatch(signOut())
  }
  return (
    <DrawerContentScrollView contentContainerStyle={{ paddingBottom: 30 }}>
      <Row>
        {/* <Avatar avatar={{uri:}}/> */}
        <MyText size={20}>{nickname}</MyText>
      </Row>
      {allRoutes.map((all, index) => {
        return (
          <ShadowBox key={index} boxWidth={vw(64)} boxStyle={{ marginTop: 30 }}>
            <NavItem
              itemType="hidden"
              showItemSeparator={true}
              itemTitle={all[0].parent}
              itemStyle={routerStyles.headItemStyle}
              itemTitleStyle={routerStyles.itemTitleStyle}
            />
            {all.map((item, i) => (
              <NavItem
                key={i}
                itemTitle={item.title}
                leftIcon={leftIcon(item)}
                itemStyle={routerStyles.itemStyle}
                onPress={() => onPress(item.route)}
                itemTitleStyle={routerStyles.itemTitleStyle}
                showItemSeparator={i !== all.length - 1 ? true : false}
              />
            ))}
          </ShadowBox>
        )
      })}
      <ShadowBox boxWidth={vw(64)} boxStyle={{ marginTop: 30 }}>
        <GHWithoutFeedback onPress={() => onSignOut()}>
          <Column style={routerStyles.signOutContainer}>
            <MyText size={16} color={ThemeColors.Red}>
              {t('LANG39')}
            </MyText>
          </Column>
        </GHWithoutFeedback>
      </ShadowBox>
    </DrawerContentScrollView>
  )
}

export { DrawerScreen }
