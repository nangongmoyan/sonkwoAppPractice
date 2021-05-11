/**
 *
 * created by lijianpo on 2021/05/10
 */
import { changeUserInfo } from '@actions/user_action'
import { EditStackHeader } from '@features/common/components'
import { useUserInfo } from '@features/user/hooks/useIsSelf'
import { useDispatch, useNavigation } from '@hooks'
import { Column, MyStatusBar, MyText, ShadowBox, TextInput } from '@ui'
import { adaptiveHeight } from '@util'
import React, { useCallback, useMemo, useState } from 'react'

const Introduction: React.FC<any> = ({}) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { introduction } = useUserInfo()
  const [value, onChangeText] = useState(introduction)

  const { changeBgColor, changeTextColor } = useMemo(() => {
    const result = value !== introduction ? true : false
    return { changeBgColor: result, changeTextColor: result }
  }, [value])

  const onPress = useCallback(() => {
    dispatch(changeUserInfo({ introduction: value }, () => navigation.goBack()))
  }, [value])
  return (
    <Column>
      <MyStatusBar isDarkStyle={true} />
      {/* <CustomStackHeader title="修改个人简介" /> */}
      <EditStackHeader
        title="修改个人简介"
        onPress={onPress}
        changeBgColor={changeBgColor}
        changeTextColor={changeTextColor}
      />
      <ShadowBox
        boxStyle={{ height: adaptiveHeight(300), paddingVertical: 10 }}
      >
        <TextInput
          multiline={true}
          maxLength={100}
          numberOfLines={5}
          placeholder={'请输入个人简介'}
          defaultValue={introduction}
          onChangeText={(text) => onChangeText(text)}
        />
        <MyText
          size={10}
          style={{ position: 'absolute', bottom: 10, right: 10 }}
        >
          {`${value.length}/100`}
        </MyText>
      </ShadowBox>
    </Column>
  )
}

export { Introduction }
