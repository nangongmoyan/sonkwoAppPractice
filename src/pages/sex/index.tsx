/**
 * 修改性别
 * created by lijianpo on 2021/04/27
 */
import React, { useState, useCallback, useMemo } from 'react'
import { useSelector } from '@hooks'
import { useLocale } from '@contexts/locale'
import { Column, MyStatusBar, MyText, ShadowBox, TextInput } from '@ui'
import { EditStackHeader } from '@features/common/components'
import { adaptiveHeight, adaptiveWidth } from '@util'

const Sex = ({ navigation }) => {
  const { t } = useLocale()
  // const userInfo = useSelector((state) => state.UserReducer.userInfo)
  // const [value, onChangeText] = useState(userInfo.username)

  // const { changeBgColor, changeTextColor } = useMemo(() => {
  //   const result = value !== userInfo.username ? true : false
  //   return { changeBgColor: result, changeTextColor: result }
  // }, [value, userInfo])

  // const onPress = useCallback(() => {
  //   // Object.assign(userInfo, { username: value })
  //   // changeUserInfo(userInfo, navigation.goBack())
  // }, [value, navigation])

  return (
    <Column style={{ flex: 1 }}>
      <MyStatusBar isDarkStyle={true} />
      {/* <EditStackHeader
        title={t('LANG44')}
        onPress={onPress}
        changeBgColor={changeBgColor}
        changeTextColor={changeTextColor}
      /> */}
    </Column>
  )
}

export { Sex }
