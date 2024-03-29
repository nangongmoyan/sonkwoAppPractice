/**
 *
 * changed by lijianpo on 2021/04/26
 */
import React, { useEffect, useMemo, useCallback, useRef } from 'react'
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
  Icon,
  SvgIcon,
} from '@ui'
import { statusBarHeight, vw } from '@util'
import { routerStyles } from './css'
import { ThemeColors } from 'ui/theme'
import { useDispatch, useSelector } from '@hooks'
// import { signOut } from '@actions/user_action'
import * as iconPath from '@source/svg'
import SubmitLoading from '@components/SubmitLoading'
import service from './service'
import { useSignOut } from '@features/auth'
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
  { route: 'Message', label: 'LANG33' },
  { route: 'EditInfo', label: 'LANG34' },
  { route: 'SecuritySetting', label: 'LANG35' },
  { route: 'Skin', label: 'LANG36' },
]

const fourthItem = [
  { route: 'Help', label: 'LANG38' },
  { route: 'ShareSonkwo', label: 'LANG39' },
  { route: 'AboutSonkwo', label: 'LANG40' },
]

const allItem = [firstItem, secondItem, thirdItem, fourthItem]

function DrawerScreen(props) {
  const { t } = useLocale()
  const loadingRef = useRef()
  const dispatch = useDispatch()
  const signOut = useSignOut()
  const isDrawerOpen = useIsDrawerOpen()
  const { userInfo, navigation } = props
  const { nickname, avatar, point = {}, ordersCount } = userInfo
  // console.log({ ordersCount })
  const wallet = useSelector((state) => state.WalletReducer.wallet)

  useEffect(() => {
    const history = navigation.dangerouslyGetState().history
    const drawer = history.some((v) => v.type === 'drawer')
    const barStyle = isDrawerOpen ? 'dark-content' : 'light-content'
    if (drawer) StatusBar.setBarStyle(barStyle, true)
  }, [isDrawerOpen, navigation])

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
        const path = iconPath[route.toLowerCase()]
        Object.assign(item, {
          title: t(label),
          icon: <SvgIcon fill={['#333']} path={path} size={20} />,
        })

        switch (route) {
          case 'Wallet':
            return {
              ...item,
              parent: t('LANG21'),
              rightTitle: wallet?.balance ?? 0,
            }
          case 'Order':
            return { ...item, rightTitle: ordersCount ?? 0 }
          case 'PointsMall':
            return {
              ...item,
              rightTitle: (point.score ?? 0) + (point.historyScore ?? 0),
            }
          case 'ActivationCode':
            return { ...item, parent: t('LANG25') }
          case 'SonkwoCoupon':
          case 'Favorites':
          case 'GameLibrary':
            return { ...item }
          case 'TaskCenter':
            return { ...item }
          case 'Setting':
            return { ...item, parent: t('LANG31') }
          case 'Message':
          case 'EditInfo':
          case 'SecuritySetting':
          case 'Skin':
            return { ...item }
          case 'Help':
            return { ...item, parent: t('LANG37') }
          case 'ShareSonkwo':
          case 'AboutSonkwo':
            return { ...item }
        }
      })
    })
  }, [t, wallet, point, ordersCount])

  const leftIcon = useCallback((item) => {
    return (
      <Column align="center" justify="center" style={{ marginRight: 15 }}>
        {item.icon}
      </Column>
    )
  }, [])

  const rightExtraTitle = useCallback((item) => {
    return <MyText> {item?.rightTitle ?? ''}</MyText>
  }, [])

  const onPress = useCallback(
    (item) => {
      if (item.route === 'TaskCenter') {
        service.navigateByUrl('/mobile/task')
      } else {
        navigation.navigate(item.route, { value: item?.rightTitle })
      }
    },
    [navigation],
  )

  const onSignOut = () => {
    loadingRef.current.show('正在退出...')
    signOut()
    // dispatch(signOut(() => loadingRef.current.hide()))
  }
  return (
    <Column style={{ flex: 1, paddingTop: statusBarHeight }}>
      <Row
        style={{
          width: vw(64),
          alignSelf: 'center',
          height: 40,
          marginTop: 20,
        }}
      >
        <Avatar avatar={avatar} size={24} />
        <MyText size={16} style={{ marginLeft: 10 }}>
          {nickname}
        </MyText>
        <Icon name="chevron-right" size={20} color={'#222'} />
      </Row>
      <DrawerContentScrollView showsVerticalScrollIndicator={false}>
        {allRoutes.map((all, index) => {
          return (
            <ShadowBox
              key={index}
              boxWidth={vw(64)}
              boxStyle={{ marginTop: index !== 0 ? 30 : -30 }}
            >
              <NavItem
                itemType="hidden"
                showItemSeparator={true}
                itemTitle={all[0].parent}
                itemStyle={routerStyles.headItemStyle}
                itemTitleStyle={routerStyles.brancheTitleStyle}
              />
              {all.map((item, i) => (
                <NavItem
                  key={i}
                  itemTitle={item.title}
                  leftIcon={leftIcon(item)}
                  rightExtraTitle={rightExtraTitle(item)}
                  itemStyle={routerStyles.itemStyle}
                  onPress={() => onPress(item)}
                  itemTitleStyle={routerStyles.itemTitleStyle}
                  showItemSeparator={i !== all.length - 1 ? true : false}
                />
              ))}
            </ShadowBox>
          )
        })}
        <ShadowBox boxWidth={vw(64)} boxStyle={{ marginVertical: 30 }}>
          <GHWithoutFeedback onPress={() => onSignOut()}>
            <Column style={routerStyles.signOutContainer}>
              <MyText size={16} color={ThemeColors.Red}>
                {t('LANG41')}
              </MyText>
            </Column>
          </GHWithoutFeedback>
        </ShadowBox>
        <SubmitLoading ref={loadingRef} />
      </DrawerContentScrollView>
    </Column>
  )
}

export { DrawerScreen }
