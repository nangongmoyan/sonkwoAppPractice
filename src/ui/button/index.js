/**
 *
 * created by lijianpo on 2021/04/14
 */
import React, { useMemo } from 'react'
import { GHWithoutFeedback, MyText, StyleSheet } from '@ui'
import { ThemeColors, ThemeStyle } from 'ui/theme'

const Button = (props) => {
  const {
    title,
    color,
    style,
    disabled = false,
    type = 'solid', // value: solid | outline
    size = 'large', // value: small | large
    numberOfLines = 1,
    textStyle: customTextStyle,
    onPress,
    ...restProps
  } = props
  const buttonColor = useMemo(() => ThemeColors[color] || color, [color])

  // calculate touchable and text style here
  const { textStyle, wrapperStyle } = useMemo(() => {
    const defaultTextStyle = [styles.text, styles[`${size}Text`]]
    const defaultWrapperStyle = [
      styles.wrapper,
      styles[`${size}Wrapper`],
      { backgroundColor: buttonColor },
    ]

    if (type === 'outline') {
      defaultTextStyle.push({ color: buttonColor })
      defaultWrapperStyle.push({
        borderWidth: 1,
        borderColor: buttonColor,
        backgroundColor: ThemeColors.White,
      })
    }

    if (disabled) {
      defaultTextStyle.push(styles.disabledText)
      defaultWrapperStyle.push(styles.disabledWrapper)
    }

    // avoid push undefined to style array
    if (style) defaultWrapperStyle.push(style)
    if (customTextStyle) defaultTextStyle.push(customTextStyle)

    return {
      textStyle: StyleSheet.flatten(defaultTextStyle),
      wrapperStyle: StyleSheet.flatten(defaultWrapperStyle),
    }
  }, [buttonColor, type, disabled, size, style, customTextStyle])
  return (
    <GHWithoutFeedback
      onPress={(e) => onPress(e)}
      disabled={disabled}
      style={wrapperStyle}
      {...restProps}
    >
      <MyText numberOfLines={numberOfLines} style={textStyle}>
        {title}
      </MyText>
    </GHWithoutFeedback>
  )
}

export default Button

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: ThemeColors.White,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  disabledWrapper: {
    borderWidth: 0,
    backgroundColor: ThemeColors.LightGrey,
  },
  disabledText: {
    color: ThemeColors.White,
  },
  smallWrapper: {
    height: ThemeStyle.buttonHeightSm,
    paddingHorizontal: ThemeStyle.hSpacingSm,
  },
  smallText: {
    fontSize: ThemeStyle.buttonFontSizeSm,
  },
  largeWrapper: {
    height: ThemeStyle.buttonHeight,
    paddingHorizontal: ThemeStyle.hSpacingLg,
  },
  largeText: {
    fontSize: ThemeStyle.buttonFontSize,
  },
  icpn: {
    marginHorizontal: 5,
  },
  disabled: {
    backgroundColor: ThemeStyle.textLightGrey,
  },
})
