/**
 *
 * created by lijianpo on 2021/04/25
 */
import React from 'react'
import { Image, ViewStyle } from 'react-native'
import MyImage from '../myImage'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Column } from 'ui/flex'
// import { NavigationService } from '@router'

const defaultAvatar = '/avatar/default'

interface AvatarProps {
  size?: number
  avatar?: string
  disabled?: boolean
  userId?: number
  style?: ViewStyle
  otherStyle?: ViewStyle
}

const Avatar: React.FC<AvatarProps> = ({
  size = 30,
  avatar = defaultAvatar,
  disabled = false,
  userId,
  style,
  otherStyle,
}) => {
  const onPress = () => {
    if (!disabled && !userId) return
    // !disabled && NavigationService.push('UserHome', { id: userId })
  }
  const imageStyle = { borderRadius: size / 2 }

  const inner =
    avatar === defaultAvatar || avatar === '' ? (
      <Image
        source={require('@source/images/avatar.png')}
        style={[imageStyle, { width: size, height: size }]}
      />
    ) : (
      <MyImage
        uri={avatar}
        width={size}
        height={size}
        style={[imageStyle, { ...otherStyle }]}
      />
    )

  return (
    <Column style={style}>
      <TouchableWithoutFeedback onPress={onPress} disabled={disabled}>
        {inner}
      </TouchableWithoutFeedback>
    </Column>
  )
}

export default Avatar
