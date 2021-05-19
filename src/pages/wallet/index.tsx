/**
 *
 * created by lijianpo on 2021/05/19
 */
import React, { useCallback } from 'react'
import { useLocale } from '@contexts/locale'
import { Column, CustomStackHeader, Image, MyText, Row, ShadowBox } from '@ui'
import { ThemeColors } from 'ui/theme'
import { adaptiveWidth } from '@util'
import { useSelector } from '@hooks'

const Wallet: React.FC<any> = ({}) => {
  const { t } = useLocale()
  const wallet = useSelector((state) => state.WalletReducer.wallet)
  const { status, balance } = wallet

  const renderRight = useCallback(() => {
    return (
      <MyText color={ThemeColors.White} style={{ width: adaptiveWidth(120) }}>
        什么是果币
      </MyText>
    )
  }, [])
  return (
    <Column style={{ flex: 1, backgroundColor: 'white' }}>
      <Image
        source={require('@source/images/mineBgc.png')}
        style={{ width: '100%', height: 200, position: 'absolute' }}
      />
      <CustomStackHeader
        title="我的钱包"
        renderRight={renderRight}
        tintColor={ThemeColors.White}
        rightWidth={adaptiveWidth(120)}
      />
      {status === 'enabled' ? (
        <ShadowBox
          boxStyle={{
            alignItems: 'flex-start',
            height: 120,
            marginTop: 50,
            paddingTop: 10,
            paddingLeft: 15,
            paddingRight: 15,
          }}
        >
          <MyText>我的果币</MyText>
          <Row style={{ marginTop: 10 }}>
            <Image
              source={require('@source/images/wallet_p.png')}
              style={{ width: 40, height: (40 * 406) / 320 }}
            />
            <MyText size={22} weight="medium">
              {balance}
            </MyText>
            <Column style={{ flex: 1 }} />
            <Column>
              <MyText>充值</MyText>
            </Column>
          </Row>
        </ShadowBox>
      ) : (
        <ShadowBox>
          <MyText>激活</MyText>
        </ShadowBox>
      )}
    </Column>
  )
}

export { Wallet }
