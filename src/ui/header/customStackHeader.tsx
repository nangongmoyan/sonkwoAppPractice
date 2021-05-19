/**
 * 导航头部
 * created by lijianpo on 2021/04/14
 */
import React, { useMemo } from 'react'
import MyText from '../text'
import { Row } from '../flex'
import { adaptiveWidth } from '@util'
import { HeaderButtons } from './headerButtons'
import { useDimensions, useSafeArea } from '@hooks'

const HEADER_HEIGHT = 44

const CustomStackHeader: React.FC<StackHeaderProps> = ({
  title,
  renderLeft,
  renderRight,
  children,
  style,
  containerStyle,
  tintColor = '#222',
  onBackPress,
  showBack = true,
  leftWidth,
  rightWidth,
}) => {
  const { top } = useSafeArea()
  const { width } = useDimensions()

  const marginRight = useMemo(() => {
    const back = showBack ? 40 : 0
    const left = renderLeft && leftWidth ? leftWidth : 0
    const right = renderRight && rightWidth ? rightWidth : 0
    return back + left - right
  }, [showBack, renderLeft, leftWidth, renderRight, rightWidth])

  return (
    <Row
      style={[
        {
          marginTop: top,
          height: HEADER_HEIGHT,
          width,
          paddingHorizontal: adaptiveWidth(30),
        },
        containerStyle,
      ]}
    >
      {showBack && (
        <HeaderButtons.Back tintColor={tintColor} onPress={onBackPress} />
      )}
      {renderLeft && renderLeft()}
      <Row
        justify="center"
        style={{
          flex: 1,
          marginRight: marginRight,
          ...style,
        }}
      >
        {title ? (
          <MyText size={16} color={tintColor}>
            {title}
          </MyText>
        ) : null}
        {children}
      </Row>
      {renderRight && renderRight()}
    </Row>
  )
}

export default CustomStackHeader
