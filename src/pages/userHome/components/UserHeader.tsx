/**
 *
 * created by lijianpo on 2021/04/26
 */
import React, { useCallback, useMemo, memo } from 'react'

import { useLocale } from '@contexts/locale'
import { useDimensions, useNavigation } from '@hooks'
import {
  Avatar,
  Column,
  CustomStackHeader,
  GHOpacity,
  GHWithoutFeedback,
  Image,
  MyText,
  Row,
  SvgIcon,
  TouchableOpacity,
} from '@ui'
import { userHomeStyles } from '../userHomeCss'
import { ThemeColors } from 'ui/theme'
import * as iconPath from '@source/svg'
import { adaptiveWidth } from '@util'
import { useUserInfo } from '@features/user/hooks/useIsSelf'
import { UserFollowFans } from './UserFollowFans'
import { useUser } from '@features/user/model'

const ITEMS = [
  { label: 'LANG45', route: 'UserGroup' },
  { label: 'LANG46', route: 'UserReviews' },
  { label: 'LANG47', route: 'WishList' },
  { label: 'LANG48', route: 'PointStore' },
]

interface UserHeaderProps {}
const UserHeader: React.FC<any> = memo(({}) => {
  const { t } = useLocale()
  const navigation = useNavigation()
  const { width } = useDimensions()
  const userInfo = useUserInfo()

  const { id, avatar, nickname } = userInfo
  const user = useUser(id)

  const routes = useMemo(() => {
    return ITEMS.map((item) => {
      const { route, label } = item
      Object.assign(item, { label: t(label) })
      switch (route) {
        case 'UserGroup':
          return { ...item, counts: user?.groupCount ?? 0 }
        case 'UserReviews':
          return { ...item, counts: user?.reviewCount ?? 0 }
        case 'WishList':
          return { ...item, counts: 30 }
        case 'PointStore':
          return { ...item, counts: 50 }
      }
    })
  }, [user])
  const renderHeaderLeft = useCallback(() => {
    return (
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <SvgIcon
          fill={[ThemeColors.White]}
          path={iconPath.category}
          size={20}
        />
      </TouchableOpacity>
    )
  }, [])

  const renderHeaderRight = useCallback(() => {
    return (
      <Row>
        <GHOpacity onPress={() => navigation.navigate('Setting')}>
          <SvgIcon
            size={20}
            path={iconPath.setting}
            fill={[ThemeColors.White]}
            style={{ marginRight: adaptiveWidth(30) }}
          />
        </GHOpacity>
        <GHOpacity>
          <SvgIcon
            size={20}
            fill={[ThemeColors.White]}
            path={iconPath.sharesonkwo}
          />
        </GHOpacity>
      </Row>
    )
  }, [])
  return (
    <Column>
      <Image
        source={require('@source/images/userBg.png')}
        style={userHomeStyles.userBg}
      />
      <Column
        linear={['vertical', 'rgba(0,0,0,0.2)', '#222222']}
        style={userHomeStyles.userBg}
      />
      <CustomStackHeader
        showBack={false}
        renderLeft={renderHeaderLeft}
        renderRight={renderHeaderRight}
      />
      <Row style={userHomeStyles.userInfo}>
        <Column style={userHomeStyles.avatarBorder}>
          <Avatar size={adaptiveWidth(120)} avatar={avatar} />
        </Column>
        <Column>
          <MyText color={ThemeColors.White} weight="bold" size={16}>
            {nickname}
          </MyText>
          <MyText color="#FCCD04">玩家</MyText>
        </Column>
      </Row>
      <Row style={userHomeStyles.headerRouters}>
        {routes.map((item, index) => (
          <GHWithoutFeedback key={index}>
            <Column style={userHomeStyles.routesItem}>
              <MyText size={21} color={ThemeColors.White}>
                {item?.counts}
              </MyText>
              <MyText color={ThemeColors.White} weight="medium">
                {item?.label}
              </MyText>
            </Column>
          </GHWithoutFeedback>
        ))}
      </Row>
      <UserFollowFans />
    </Column>
  )
})

export { UserHeader }
