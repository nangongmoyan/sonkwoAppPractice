/**
 *
 * created by lijianpo on 2021/05/10
 */

import React from 'react'
import Svg, { Path } from 'react-native-svg'

const SvgIcon: React.FC<SvgIconProps> = ({
  path,
  style,
  size = 40,
  fill = ['#039FFC'],
  viewBox = '0 0 1024 1024',
}) => {
  return (
    <Svg width={size} height={size} style={style} viewBox={viewBox}>
      {path.map((item, index) => (
        <Path d={item} key={index} fill={fill[index] || fill[0]} />
      ))}
    </Svg>
  )
}

export default SvgIcon
