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
interface UserFollowFansProps {}

const UserFollowFans: React.FC<UserFollowFansProps> = memo(({}) => {
  const navigation = useNavigation()
  return (
    <Column style={userHomeStyles.followFansContainer}>
      <Row style={userHomeStyles.followFans}>
        <View style={{ flex: 1 }} />
        <Row>
          <MyText color={ThemeColors.White}>10关注</MyText>
          <Divider style={userHomeStyles.followFansDiver} />
          <MyText color={ThemeColors.White}>10粉丝</MyText>
          <Icon name="chevron-right" size={20} color={ThemeColors.White} />
        </Row>
      </Row>
      <UserSteam />
    </Column>
  )
})

export { UserFollowFans }
