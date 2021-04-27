/**
 * 个人头像
 * created by lijianpo on 2021/04/27
 */
import { useUserInfo } from '@features/user/hooks/useIsSelf'
import {
  Avatar,
  Column,
  GHWithoutFeedback,
  Icon,
  TouchableWithoutFeedback,
} from '@ui'
import { adaptiveWidth, toastShort } from '@util'
import React, { useCallback } from 'react'
import SyanImagePicker from 'react-native-syan-image-picker'
import { ThemeColors } from 'ui/theme'
import { editInfoStyle } from '../editInfoCss'

const options = { imageCount: 1 }

const UserAvatar: React.FC<any> = (props) => {
  const userInfo = useUserInfo()
  const { avatar } = userInfo
  const showImagePicker = useCallback(() => {
    SyanImagePicker.showImagePicker(options, (error, selectedPhotos) => {
      // //取消悬着
      // if (error) return
      // console.log({ selectedPhotos })
    })
  }, [])
  return (
    <TouchableWithoutFeedback onPress={showImagePicker}>
      <Column style={{ alignSelf: 'center', marginVertical: 30 }}>
        <Avatar
          avatar={avatar}
          size={adaptiveWidth(200)}
          style={editInfoStyle.avatar}
        />

        <Column style={editInfoStyle.camera}>
          <Icon name="camera" size={16} color={ThemeColors.White} />
        </Column>
      </Column>
    </TouchableWithoutFeedback>
  )
}

export { UserAvatar }
