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
} from '@ui'
import { vw } from '@util'
import { routerStyles } from './css'
import { ThemeColors } from 'ui/theme'
import { useDispatch } from '@hooks'
import { signOut } from '@actions/user_action'

function DrawerScreen(props) {
  const { t } = useLocale()
  const dispatch = useDispatch()
  const isDrawerOpen = useIsDrawerOpen()
  const { userInfo, navigation } = props

  const { nickname } = userInfo
  console.log({ nickname })

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
        <MyText size={20}>{nickname}</MyText>
      </Row>
      <ShadowBox boxWidth={vw(64)} boxStyle={{ marginTop: 30 }}>
        <GHWithoutFeedback onPress={() => onSignOut()}>
          <Column style={routerStyles.signOutContainer}>
            <MyText size={16} color={ThemeColors.Red}>
              {t('LANG21')}
            </MyText>
          </Column>
        </GHWithoutFeedback>
      </ShadowBox>
    </DrawerContentScrollView>
  )
}

export { DrawerScreen }
