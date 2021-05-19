/**
 *
 * created by lijianpo on 2021/0413
 */

import React from 'react'
import Icon from '../icon'
import MyText from '../text'
import Divider from '../divider'
import { Column, Row } from '../flex'
import { ThemeColors } from '../theme'
import { adaptiveWidth, deviceWidth } from '@util'
import { StyleSheet, TouchableOpacity, Switch } from 'react-native'

const NavItem: React.FC<NavItemProps> = ({
  onPress,
  leftIcon,
  itemStyle,
  itemTitle,
  switchProps,
  itemTitleStyle,
  rightContainer,
  rightExtraTitle,
  showItemSeparator,
  itemType = 'normal',
  rightIcon = <Icon name="chevron-right" size={20} color={'#ddd'} />,
}) => {
  const renderRight = () => {
    if (itemType === 'switch') {
      return (
        <Switch
          style={{ shadowOpacity: 0 }}
          trackColor={{ true: ThemeColors.Default, false: 'grey' }}
          {...switchProps}
        />
      )
    } else if (itemType === 'hidden') {
      return null
    } else {
      return (
        <Row align="center" justify="flex-end" style={{ flex: 1 }}>
          {rightExtraTitle}
          {rightIcon}
        </Row>
      )
    }
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.7}
      style={[styles.container, itemStyle]}
    >
      {leftIcon}
      <Column style={{ flex: 1 }}>
        <Row
          style={[{ flex: 1 }, rightContainer]}
          align="center"
          justify="space-between"
        >
          <MyText size={14} color="#222" style={{ ...itemTitleStyle }}>
            {itemTitle}
          </MyText>
          {renderRight()}
        </Row>
        {showItemSeparator && (
          <Divider height={StyleSheet.hairlineWidth} color="#ddd" />
        )}
      </Column>
    </TouchableOpacity>
  )
}

export default NavItem

const styles = StyleSheet.create({
  container: {
    height: 46,
    alignSelf: 'center',
    flexDirection: 'row',
    width: deviceWidth - adaptiveWidth(60),
  },
})
