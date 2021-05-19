/**
 *
 * created by lijianpo on 2021/04/13
 */
import React from 'react'
import { TextStyle, Text, Platform } from 'react-native'
import { normalSizeMap } from './style'

const os = Platform.OS

type FontWeight = TextStyle['fontWeight']
type FontColor = keyof typeof textColors

const textColors = {
  black: '#222222',
  grey: '#85858c',
  light_grey: '#c2c2c5',
  orange: '#ff6d3f',
  white: '#fff',
  blue: '#005BB8',
  brown_orange: '#C44D14',
}

export const weights: Record<Weight, FontWeight> = {
  light: '200',
  normal: '400',
  medium: os === 'ios' ? '500' : '700',
  semibold: os === 'ios' ? '600' : '700',
  bold: '800',
}

const MyText: React.FC<MyTextProps> = ({
  color = 'black',
  size = 12,
  textAlign = 'center',
  weight = 'normal',
  height,
  style,
  children,
  ...restProps
}) => {
  const textStyle: TextStyle = {
    fontSize: size,
    textAlign: textAlign,
    fontWeight: weights[weight],
    lineHeight: normalSizeMap[size],
    color: textColors[color as FontColor] ?? color,
  }

  if (height) textStyle.lineHeight = height
  // if() textStyle.fontFamily = 'Roboto'
  return (
    <Text style={[textStyle, style] as TextStyle} {...restProps}>
      {children}
    </Text>
  )
}

export default MyText
