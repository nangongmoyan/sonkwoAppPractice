/**
 * 修改昵称
 * created by lijianpo on 2021/04/27
 */
import React, { useState, useMemo, useCallback } from 'react'
import { useLocale } from '@contexts/locale'
import { useUserInfo } from '@features/user/hooks/useIsSelf'
import { Column, MyStatusBar, ShadowBox, TextInput, MyText } from '@ui'
import { EditStackHeader } from '@features/common/components'
import { adaptiveHeight, adaptiveWidth } from '@util'
import { useDispatch, useNavigation } from '@hooks'
import { changeUserInfo } from '@actions/user_action'

const NickName: React.FC<any> = ({}) => {
  const { t } = useLocale()
  const { nickname } = useUserInfo()
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [value, onChangeText] = useState(nickname)

  const { changeBgColor, changeTextColor } = useMemo(() => {
    const result = value !== nickname ? true : false
    return { changeBgColor: result, changeTextColor: result }
  }, [value, nickname])

  const onPress = useCallback(() => {
    dispatch(changeUserInfo({ nick_name: value }, navigation.goBack()))
  }, [dispatch, changeUserInfo, value, navigation])
  return (
    <Column style={{ flex: 1 }}>
      <MyStatusBar isDarkStyle={true} />
      <EditStackHeader
        title={t('LANG61')}
        onPress={onPress}
        changeBgColor={changeBgColor}
        changeTextColor={changeTextColor}
      />
      <ShadowBox>
        <TextInput
          style={{ height: 44, color: 'black' }}
          value={value}
          defaultValue={nickname}
          onChangeText={(text) => onChangeText(text)}
          clearButtonMode="always"
          maxLength={24}
          placeholder={t('LANG62')}
        />
        <MyText
          size={10}
          style={{ position: 'absolute', bottom: 0, right: 10 }}
        >
          {`${value.length}/24`}
        </MyText>
      </ShadowBox>
      <MyText
        style={{
          textAlign: 'left',
          marginLeft: adaptiveWidth(60),
          marginTop: adaptiveHeight(20),
        }}
      >
        {t('LANG63')}
      </MyText>
    </Column>
  )
}

export { NickName }
