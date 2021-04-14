/**
 *
 * created by lijianpo on 2021/04/14
 */
import React from 'react'
import { ThemeColors } from 'ui/theme'
import { useNavigation } from '@hooks'
import { GHWithoutFeedback, MyText, Row } from '@ui'
import { useLocale } from '@contexts/locale'
import { vw } from '@util'

const AgreementPolicy = (props) => {
  const { t } = useLocale()
  const navigation = useNavigation()
  const { style, textSize, textColor } = props

  return (
    <Row style={[{ width: vw(80) }, style]} wrap={'wrap'} justify="center">
      <MyText size={textSize} color={textColor}>
        {t('LANG8')}
      </MyText>

      <GHWithoutFeedback onPress={() => navigation.navigate('AppWebView')}>
        <MyText size={textSize} color={ThemeColors.Default}>
          {t('LANG9')}
        </MyText>
      </GHWithoutFeedback>

      <GHWithoutFeedback onPress={() => navigation.navigate('AppWebView')}>
        <MyText size={textSize} color={ThemeColors.Default}>
          {t('LANG10')}
        </MyText>
      </GHWithoutFeedback>
    </Row>
  )
}

export default AgreementPolicy
