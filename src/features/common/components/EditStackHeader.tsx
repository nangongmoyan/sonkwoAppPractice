/**
 * 带编辑导航头部
 * created by lijianpo on 2021/04/27
 */
import React, { useCallback } from 'react'
import { useLocale } from '@contexts/locale'
import { CustomStackHeader, GHWithoutFeedback, MyText } from '@ui'
import { adaptiveWidth } from '@util'
import { useNavigation } from '@hooks'
import { ThemeColors } from 'ui/theme'
import { commonStyles } from '../commonCss'

const EditStackHeader: React.FC<EditStackHeader> = ({
  onPress,
  changeBgColor = false,
  changeTextColor = false,
  ...restProps
}) => {
  const { t } = useLocale()
  const navigation = useNavigation()

  const renderLeft = useCallback(() => {
    return (
      <GHWithoutFeedback
        style={{ width: adaptiveWidth(100) }}
        onPress={() => navigation.goBack()}
      >
        <MyText size={16} color={ThemeColors.Gray}>
          {t('LANG59')}
        </MyText>
      </GHWithoutFeedback>
    )
  }, [])

  const renderRight = () => {
    return (
      <GHWithoutFeedback
        onPress={onPress}
        style={[
          commonStyles.saveContaine,
          {
            backgroundColor: changeBgColor
              ? ThemeColors.Default
              : ThemeColors.Gainsboro,
          },
        ]}
      >
        <MyText
          color={changeTextColor ? ThemeColors.White : ThemeColors.DarkGray}
        >
          {t('LANG60')}
        </MyText>
      </GHWithoutFeedback>
    )
  }
  return (
    <CustomStackHeader
      showBack={false}
      renderLeft={renderLeft}
      leftWidth={adaptiveWidth(100)}
      renderRight={renderRight}
      rightWidth={adaptiveWidth(100)}
      {...restProps}
    />
  )
}

export { EditStackHeader }
