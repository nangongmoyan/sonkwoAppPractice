/**
 * 修改性别
 * created by lijianpo on 2021/04/27
 */
import React, { useState, useCallback, useMemo } from 'react'
import { useSelector } from '@hooks'
import { useLocale } from '@contexts/locale'
import {
  Column,
  Divider,
  GHWithoutFeedback,
  MyStatusBar,
  MyText,
  NavItem,
  Row,
  ShadowBox,
  StyleSheet,
  SvgIcon,
  View,
} from '@ui'
import { EditStackHeader } from '@features/common/components'
import { adaptiveHeight, adaptiveWidth } from '@util'
import { ThemeColors } from 'ui/theme'
import * as iconPath from '@source/svg'
import { useUserInfo } from '@features/user/hooks/useIsSelf'

const ITEMS = [
  { route: 'Male', label: 'LANG66', color: '#81d4fa', selected: true },
  { route: 'Female', label: 'LANG67', color: '#ffb3b3', selected: true },
]

const Gender = ({ navigation }) => {
  const { t } = useLocale()
  const { gender } = useUserInfo()
  const [sex, setSex] = useState(gender)

  const selections = useMemo(() => {
    return ITEMS.map((item) => {
      const { route, label } = item
      const path = iconPath[route.toLowerCase()]
      const selected =
        route === 'Male' ? (sex === 0 ? true : false) : sex === 1 ? true : false
      Object.assign(item, { label: t(label), path, selected })
      return { ...item }
    })
  }, [sex])

  // const userInfo = useSelector((state) => state.UserReducer.userInfo)
  // const [value, onChangeText] = useState(userInfo.username)

  const { changeBgColor, changeTextColor } = useMemo(() => {
    const result = sex !== gender ? true : false
    return { changeBgColor: result, changeTextColor: result }
  }, [sex, gender])

  const onPress = useCallback(() => {
    // Object.assign(userInfo, { username: value })
    // changeUserInfo(userInfo, navigation.goBack())
  }, [navigation])

  const onSelect = useCallback((index) => {
    setSex(index)
  }, [])
  return (
    <Column style={{ flex: 1 }}>
      <MyStatusBar isDarkStyle={true} />
      <EditStackHeader
        title={t('LANG64')}
        onPress={onPress}
        changeBgColor={changeBgColor}
        changeTextColor={changeTextColor}
      />
      <MyText
        style={{
          textAlign: 'left',
          color: ThemeColors.Gray,
          margin: 20,
          marginBottom: 15,
        }}
      >
        {t('LANG65')}
      </MyText>
      <ShadowBox>
        {selections.map((selection, index) => {
          return (
            <GHWithoutFeedback key={index} onPress={() => onSelect(index)}>
              <Row style={{ height: 46 }}>
                <SvgIcon
                  fill={[selection.color]}
                  path={selection.path}
                  size={24}
                />
                <MyText size={16} style={{ marginLeft: 10 }}>
                  {selection.label}
                </MyText>
                <View style={{ flex: 1 }} />
                {selection.selected && (
                  <SvgIcon
                    fill={[ThemeColors.Default]}
                    path={iconPath.selected}
                    size={24}
                  />
                )}
              </Row>
            </GHWithoutFeedback>
          )
        })}
        {/* <GHWithoutFeedback onPress={() => setSex(0)}>
          <Row style={{ height: 46 }}>
            <SvgIcon fill={['#81d4fa']} path={iconPath.male} size={24} />
            <MyText size={16} style={{ marginLeft: 10 }}>
              男
            </MyText>
            <View style={{ flex: 1 }} />
            {sex === 0 && (
              <SvgIcon
                fill={[ThemeColors.Default]}
                path={iconPath.selected}
                size={24}
              />
            )}
          </Row>
        </GHWithoutFeedback>
        <Divider height={StyleSheet.hairlineWidth} color={'#ddd'} />
        <GHWithoutFeedback onPress={() => setSex(1)}>
          <Row style={{ height: 46 }}>
            <SvgIcon fill={['#ffb3b3']} path={iconPath.female} size={24} />
            <MyText size={16} style={{ marginLeft: 10 }}>
              女
            </MyText>
            <View style={{ flex: 1 }} />
            {sex === 1 && (
              <SvgIcon
                fill={[ThemeColors.Default]}
                path={iconPath.selected}
                size={24}
              />
            )}
          </Row>
        </GHWithoutFeedback> */}
      </ShadowBox>
      <MyText
        style={{
          textAlign: 'left',
          color: ThemeColors.Gray,
          marginLeft: 20,
          marginTop: 30,
          marginBottom: 15,
        }}
      >
        {t('LANG68')}
      </MyText>
      <ShadowBox>
        <NavItem
          itemType={'switch'}
          itemTitle={t('LANG69')}
          itemStyle={{ paddingHorizontal: 10 }}
        />
      </ShadowBox>
    </Column>
  )
}

export { Gender }
