/**
 *
 * created by lijianpo on 2021/05/20
 */

import React, { useMemo } from 'react'
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import MyText from '../text'
import { Row } from '../flex'
import Icon from '../icon'
import { ThemeColors } from '../theme'

const MyButton: React.FC<MyButtonProps> = ({
  icon,
  title,
  style,
  color,
  linear,
  onPress,
  iconProps,
  textSize = 12,
  type = 'solid',
  containerStyle,
  disabled = false,
  textStyle: customTextStyle,
  ...restProps
}) => {
  const buttonColor = color || 'transparent'
  const { textStyle, wrapperStyle } = useMemo(() => {
    const defaultWrapperStyle = []
    const defaultTextStyle = [styles.text]
    if (!linear) {
      defaultWrapperStyle.push({
        borderWidth: 1,
        borderColor: buttonColor,
        backgroundColor: buttonColor,
      })
    }

    if (type === 'outline') {
      defaultTextStyle.push({ color: buttonColor })
      defaultWrapperStyle.push({
        borderWidth: 1,
        borderColor: buttonColor,
        backgroundColor: ThemeColors.White,
      })
    }
    if (type === 'transparent') {
      defaultTextStyle.push({ color: buttonColor })
      defaultWrapperStyle.push({
        borderWidth: 0,
        backgroundColor: 'transparent',
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
  }, [buttonColor, type, disabled, style, customTextStyle, linear])
  return (
    <View style={[containerStyle]}>
      <TouchableWithoutFeedback
        onPress={(e) => onPress(e)}
        disabled={disabled}
        {...restProps}
      >
        <Row
          style={wrapperStyle}
          linear={disabled ? null : linear}
          justify="center"
        >
          {icon && (
            <Icon
              name={icon}
              size={textSize}
              color={type === 'outline' ? buttonColor : ThemeColors.White}
              style={styles.icon}
              {...iconProps}
            />
          )}
          <MyText numberOfLines={1} style={textStyle} size={textSize}>
            {title}
          </MyText>
        </Row>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default MyButton

const styles = StyleSheet.create({
  disabledText: {
    color: ThemeColors.White,
  },
  disabledWrapper: {
    borderWidth: 0,
    backgroundColor: ThemeColors.LightGrey,
  },
  text: {
    color: ThemeColors.White,
    textAlignVertical: 'center',
  },
  icon: {
    marginHorizontal: 5,
  },
})
