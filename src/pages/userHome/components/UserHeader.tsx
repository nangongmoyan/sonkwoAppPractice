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
} from '@ui'
import { userHomeStyles } from '../userHomeCss'
import { ThemeColors } from 'ui/theme'
import * as iconPath from '@source/svg'
import { adaptiveWidth } from '@util'
import { useUserInfo } from '@features/user/hooks/useIsSelf'
import { UserFollowFans } from './UserFollowFans'

const ITEMS = [
  { label: '小组', route: 'UserGroup' },
  { label: '点评', route: 'UserReviews' },
  { label: '心愿单', route: 'WishList' },
  { label: '积分', route: 'PointStore' },
]

interface UserHeaderProps {}
const UserHeader: React.FC<UserHeaderProps> = memo(({}) => {
  const { t } = useLocale()
  const navigation = useNavigation()
  const { width } = useDimensions()
  const userInfo = useUserInfo()
  const { avatar, nickname } = userInfo

  const routes = useMemo(() => {
    return ITEMS.map((item) => {
      const { route, label } = item
      switch (route) {
        case 'UserGroup':
          return { ...item, counts: 10 }
        case 'UserReviews':
          return { ...item, counts: 20 }
        case 'WishList':
          return { ...item, counts: 30 }
        case 'PointStore':
          return { ...item, counts: 50 }
      }
    })
  }, [])
  const renderHeaderLeft = useCallback(() => {
    return (
      <GHOpacity onPress={() => navigation.toggleDrawer()}>
        <SvgIcon
          fill={[ThemeColors.White]}
          path={iconPath.category}
          size={20}
        />
      </GHOpacity>
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
        linear={['vertical', 'rgba(0,0,0,0.5)', '#222222']}
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
          <GHWithoutFeedback>
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
