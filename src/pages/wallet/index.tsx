/**
 *
 * created by lijianpo on 2021/05/19
 */
import React, { useCallback, useMemo, useState } from 'react'
import { useLocale } from '@contexts/locale'
import {
  CenterModal,
  Column,
  CustomStackHeader,
  Divider,
  Image,
  MyButton,
  MyText,
  NavItem,
  Row,
  ShadowBox,
} from '@ui'
import { ThemeColors } from 'ui/theme'
import { adaptiveWidth, vw } from '@util'
import { useNavigation, useSelector } from '@hooks'
import { walletStyle } from './walletCss'

const ITEMS = [
  { route: 'Recharge', label: 'LANG119' },
  { route: 'Purchase', label: 'LANG120' },
  { route: 'Refund', label: 'LANG121' },
  { route: 'Gift', label: 'LANG122' },
  { route: 'Store_Refund', label: 'LANG123' },
]

const Wallet: React.FC<any> = ({}) => {
  const { t } = useLocale()
  const navigation = useNavigation()
  const [isVisible, setIsVisible] = useState(false)
  const wallet = useSelector((state) => state.WalletReducer.wallet)
  const { status, balance } = wallet

  const renderRight = useCallback(() => {
    return (
      <MyText style={walletStyle.rightText} onPress={() => setIsVisible(true)}>
        {t('LANG115')}
      </MyText>
    )
  }, [t])

  const showBalance = useCallback(() => {
    return status === 'enabled' ? (
      <MyText style={walletStyle.enabledBalance}>{balance}</MyText>
    ) : (
      <MyText style={walletStyle.disabledBalance}>{t('LANG116')}</MyText>
    )
  }, [status, t])

  const { buttonName } = useMemo(() => {
    return { buttonName: status === 'enabled' ? t('LANG117') : t('LANG118') }
  }, [status, t])

  return (
    <Column style={{ flex: 1, backgroundColor: 'white' }}>
      <Image
        style={walletStyle.walletBg}
        source={require('@source/images/walletBg.png')}
      />
      <CustomStackHeader
        title={t('LANG113')}
        renderRight={renderRight}
        tintColor={ThemeColors.White}
        rightWidth={adaptiveWidth(150)}
      />
      <Divider height={55} />
      <ShadowBox boxStyle={walletStyle.shadowBox}>
        <MyText style={walletStyle.walletName}>{t('LANG114')}</MyText>
        <Row>
          <Image
            source={require('@source/images/wallet_p.png')}
            style={walletStyle.walletLogo}
          />
          {showBalance()}
          <Column style={{ flex: 1 }} />
          <MyButton
            title={buttonName}
            linear={['#FF9017', '#FF6D3F']}
            style={walletStyle.buttonStyle}
            onPress={() => console.log('xxxx')}
          />
        </Row>
      </ShadowBox>
      {status === 'enabled' ? (
        ITEMS.map((item, index) => (
          <NavItem
            key={index}
            onPress={() =>
              navigation.navigate('WalletBill', { kind: item.route })
            }
            itemTitle={t(item.label)}
            showItemSeparator={true}
          />
        ))
      ) : (
        <MyText>{t('LANG124')}</MyText>
      )}
      <CenterModal
        title={t('LANG125')}
        isVisible={isVisible}
        style={{ width: vw(64), paddingBottom: 0 }}
        onClose={() => setIsVisible(false)}
      >
        <MyText>
          {t('LANG126')}
          {t('LANG127')}
        </MyText>
        <Divider style={walletStyle.divider} />
        <Column style={walletStyle.sureButton}>
          <MyText
            style={walletStyle.sureText}
            onPress={() => setIsVisible(false)}
          >
            {t('LANG128')}
          </MyText>
        </Column>
      </CenterModal>
    </Column>
  )
}

export { Wallet }
