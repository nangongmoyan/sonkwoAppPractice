/**
 *
 * created by lijianpo on 2021/04/26
 */
import React, { memo } from 'react'
import { useNavigation } from '@hooks'
import { Column, Divider, MyText, Row, View, Icon } from '@ui'
import { ThemeColors } from 'ui/theme'
import { userHomeStyles } from '../userHomeCss'
import { UserSteam } from './UserSteam'
import { useLocale } from '@contexts/locale'
interface UserFollowFansProps {}

const UserFollowFans: React.FC<UserFollowFansProps> = memo(({}) => {
  const navigation = useNavigation()
  const { t } = useLocale()
  return (
    <Column style={userHomeStyles.followFansContainer}>
      <Row style={userHomeStyles.followFans}>
        <View style={{ flex: 1 }} />
        <Row>
          <MyText color={ThemeColors.White}>{`10 ${t('LANG49')}`}</MyText>
          <Divider style={userHomeStyles.followFansDiver} />
          <MyText color={ThemeColors.White}>{`10 ${t('LANG50')}`}</MyText>
          <Icon name="chevron-right" size={20} color={ThemeColors.White} />
        </Row>
      </Row>
      <UserSteam />
    </Column>
  )
})

export { UserFollowFans }
