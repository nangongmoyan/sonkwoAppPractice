/**
 * 个人头像
 * created by lijianpo on 2021/04/27
 */
import { getImageToken, uploadImage } from '@actions/user_action'
import { useUserInfo } from '@features/user/hooks/useIsSelf'
import { useDispatch, useSelector } from '@hooks'
import { Avatar, Column, Icon, TouchableWithoutFeedback } from '@ui'
import { adaptiveWidth } from '@util'
import React, { useCallback, useEffect } from 'react'
import SyanImagePicker from 'react-native-syan-image-picker'
import { ThemeColors } from 'ui/theme'
import { editInfoStyle } from '../editInfoCss'

const options = { imageCount: 1 }

const UserAvatar: React.FC<any> = (props) => {
  const userInfo = useUserInfo()
  const { avatar } = userInfo
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getImageToken())
  }, [])

  const avatarInfo = useSelector((state) => state.UserReducer.avatarInfo)
  const showImagePicker = useCallback(() => {
    SyanImagePicker.showImagePicker(options, (error, selectedPhotos) => {
      //取消悬着
      if (error) return
      const file = selectedPhotos[0]
      Object.assign(file, {
        type: 'image/jpeg',
        name: `sonkwo${Date.now().valueOf()}.jpg`,
      })
      dispatch(uploadImage(file, avatarInfo.token))
    })
  }, [avatarInfo])
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
