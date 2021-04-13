/**
 *
 * created by lijianpo on 2021/04/13
 */
import React, { useMemo } from 'react'
import { View, StyleSheet, LinearGradient } from '@ui'

function elevationShadowStyle() {
  return {
    elevation: 2,
    shadowColor: '#85858C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  }
}

const Flex: React.FC<FlexProps> = ({
  style,
  linear,
  children,
  wrap = 'nowrap',
  align = 'stretch',
  elevation = false,
  direction = 'column',
  justify = 'flex-start',
  ...otherProps
}) => {
  //
  const containerStyle = useMemo(
    () =>
      StyleSheet.flatten([
        {
          flexWrap: wrap,
          alignItems: align,
          justifyContent: justify,
          flexDirection: direction,
          ...(elevation ? elevationShadowStyle() : {}),
        },
        style,
      ]),
    [wrap, style, align, justify, direction, elevation],
  )

  const { isLinear, colors, linearDirection } = useMemo(() => {
    const directions = ['vertical', 'horizontal']
    const vertical = { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } }
    const horizontal = { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } }

    if (!Array.isArray(linear)) {
      return { inLinear: false }
    }

    const [direct, ...linearColors] = linear

    if (directions.filter((d) => d === direct).length === 0) {
      return {
        colors: linear,
        isLinear: linear.length > 0,
        linearDirection: horizontal,
      }
    }
    return {
      colors: linearColors,
      isLinear: linear.length > 0,
      linearDirection: direct === 'horizontal' ? horizontal : vertical,
    }
  }, [linear])

  if (isLinear)
    return (
      <LinearGradient
        colors={colors}
        {...linearDirection}
        style={containerStyle}
        {...otherProps}
      >
        {children}
      </LinearGradient>
    )
  return (
    <View {...otherProps} style={containerStyle}>
      {children}
    </View>
  )
}

export default Flex

//
export const Column: React.FC<Props> = (props) => (
  <Flex direction="column" {...props} />
)

//
export const Row: React.FC<Props> = (props) => (
  <Flex direction="row" align="center" {...props} />
)
