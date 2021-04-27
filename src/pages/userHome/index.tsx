/**
 * 我的页
 * created by lijianpo on 2021/04/12
 */
import React, { useState } from 'react'
import { useLocale } from '@contexts/locale'
import { useSafeArea, useDimensions } from '@hooks'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated'
import { Column, HeadTabView, MyStatusBar, MyText, Row } from '@ui'

import {
  UserCollections,
  UserComments,
  UserHeader,
  UserReplies,
  UserSubjects,
} from './components'

const UserHome = ({ navigation }) => {
  const { t } = useLocale()
  const { top } = useSafeArea()
  const frozeTop = top + 44
  const { width } = useDimensions()
  const [scrollTrans, setScrollTrans] = useState(useSharedValue(0))

  const transYValue = useDerivedValue(() => {
    return interpolate(
      scrollTrans.value,
      [0, frozeTop],
      [-frozeTop, 0],
      Extrapolate.CLAMP,
    )
  })

  const headerOpacity = useDerivedValue(() => {
    return interpolate(
      scrollTrans.value,
      [0, frozeTop],
      [0, 1],
      Extrapolate.CLAMP,
    )
  })

  const headerTansStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
      transform: [{ translateY: transYValue.value }],
    }
  })

  const renderStackHeade = () => {
    return (
      <Animated.View
        style={[
          {
            top: 0,
            position: 'absolute',
            backgroundColor: 'white',
          },
          headerTansStyle,
        ]}
      >
        <Row
          style={{
            width,
            backgroundColor: 'white',
            height: frozeTop,
          }}
        >
          <MyText>asdfsd</MyText>
        </Row>
      </Animated.View>
    )
  }

  const [routes] = useState([
    { key: 'Subject', title: t('LANG55') },
    { key: 'Comment', title: t('LANG56') },
    { key: 'Reply', title: t('LANG57') },
    { key: 'Collection', title: t('LANG58') },
  ])

  const renderScrollHeader = () => <UserHeader />

  const makeScrollTrans = (scrollTrans: Animated.SharedValue<number>) => {
    setScrollTrans(scrollTrans)
  }

  const renderScene = (sceneProps: any) => {
    const { route } = sceneProps
    switch (route.key) {
      case 'Subject':
        return <UserSubjects indexNo={0} />
      case 'Comment':
        return <UserComments indexNo={1} />
      case 'Reply':
        return <UserReplies indexNo={2} />
      case 'Collection':
        return <UserCollections indexNo={3} />
    }
  }

  const tabbarProps = {
    tabWidth: width / routes.length,
    style: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
  }
  return (
    <Column style={{ flex: 1 }}>
      <MyStatusBar isDarkStyle={false} />
      <HeadTabView
        routes={routes}
        frozeTop={frozeTop}
        renderScene={renderScene}
        makeScrollTrans={makeScrollTrans}
        renderScrollHeader={renderScrollHeader}
        tabbarProps={tabbarProps}
      />
      {renderStackHeade()}
    </Column>
  )
}

export { UserHome }
