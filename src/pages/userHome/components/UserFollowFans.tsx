/**
 *
 * created by lijianpo on 2021/04/26
 */
import React, { memo } from 'react'
import { useNavigation } from '@hooks'
import { Column, Divider, MyText, Row, View, Icon, Avatar } from '@ui'
import { ThemeColors } from 'ui/theme'
import { userHomeStyles } from '../userHomeCss'
import { UserSteam } from './UserSteam'
import { useLocale } from '@contexts/locale'
import { get } from 'lodash'
interface UserFollowFansProps {}

const UserFollowFans: React.FC<UserFollowFansProps> = memo(
  ({ user, friends }) => {
    const navigation = useNavigation()
    const { t } = useLocale()
    const follower = get(user, 'followerCount', 0)
    const following = get(user, 'followingAccountIds.length', 0)
    return (
      <Column style={userHomeStyles.followFansContainer}>
        <Row style={userHomeStyles.followFans}>
          <Row style={{ position: 'absolute', left: 26 }}>
            {friends.slice(0, 5).map((friend, index) => {
              const avatar = get(friend, 'avatar')
              const length = friends.length < 5 ? friends.length - 1 : 4
              return (
                <Avatar
                  size={26}
                  key={index}
                  avatar={avatar}
                  style={{
                    borderWidth: 2,
                    borderRadius: 16,
                    position: 'absolute',
                    left: (length - index) * 24,
                    borderColor: 'rgba(34,34,34,0.8)',
                  }}
                />
              )
            })}
          </Row>
          <Row style={{ position: 'absolute', right: 36 }}>
            <MyText color={ThemeColors.White}>{`${following} ${t(
              'LANG49',
            )}`}</MyText>
            <Divider style={userHomeStyles.followFansDiver} />
            <MyText color={ThemeColors.White}>{`${follower} ${t(
              'LANG50',
            )}`}</MyText>
            <Icon name="chevron-right" size={20} color={ThemeColors.White} />
          </Row>
        </Row>
        <UserSteam />
      </Column>
    )
  },
)

export { UserFollowFans }
