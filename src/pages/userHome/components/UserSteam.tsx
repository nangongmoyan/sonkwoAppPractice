/**
 *
 * created by lijianpo on 2021/04/26
 */
import { useLocale } from '@contexts/locale'
import { Column, Row, Image, MyText } from '@ui'
import React, { memo } from 'react'
import { ThemeColors } from 'ui/theme'
import { userHomeStyles } from '../userHomeCss'

interface UserSteamProps {}

const UserSteam: React.FC<UserSteamProps> = memo(({}) => {
  const { t } = useLocale()
  return (
    <Column style={userHomeStyles.steamContainer}>
      <Row style={userHomeStyles.followFans}>
        <Image
          source={require('@source/images/steam.png')}
          style={userHomeStyles.steamLogo}
        />
        <MyText color={ThemeColors.White}>{t('LANG51')}</MyText>
      </Row>
    </Column>
  )
})

export { UserSteam }
