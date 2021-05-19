/**
 *
 * created by lijianpo on 2021/04/14
 */
import React from 'react'
import { Row } from '../flex'
import { useNavigation } from '@hooks'
import { HeaderBackButton } from 'react-navigation-stack'
// const Item = ({ children, route, onPress }) => {}

const Back = ({ onPress, ...rest }) => {
  const navigation = useNavigation()
  const onBackPress = () => {
    if (onPress) onPress()
    else navigation.pop()
  }

  return (
    <Row align="center" justify="center" style={{ height: 44, width: 40 }}>
      <HeaderBackButton
        tintColor={'#222'}
        labelVisible={false}
        onPress={onBackPress}
        {...rest}
      />
    </Row>
  )
}

export const HeaderButtons = {
  Back,
}
