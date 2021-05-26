/**
 *
 * created by lijianpo on 2021/05/25
 */
import { View } from '@ui'
import React, { useCallback, useState } from 'react'

const ViewPagerAndroidContainer: React.FC<any> = ({ style, children }) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const _onLayoutChange = (e) => {
    const { width: layoutWidth, height: layoutHeight } = e.nativeEvent.layout
    setWidth(layoutWidth)
    setHeight(layoutHeight)
  }

  return (
    <View style={[style]} onLayout={_onLayoutChange}>
      <View style={{ width, height }}>{children}</View>
    </View>
  )
}

export { ViewPagerAndroidContainer }
