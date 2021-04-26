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
    { key: 'Subject', title: '果贴' },
    { key: 'Comment', title: '评论' },
    { key: 'Reply', title: '回复' },
    { key: 'Collection', title: '收藏' },
  ])

  const renderHeader = () => <UserHeader />

  const makeScrollTrans = (scrollTrans: Animated.SharedValue<number>) => {
    setScrollTrans(scrollTrans)
  }

  const renderScene = (sceneProps: any) => {
    const { item } = sceneProps
    switch (item) {
      case 'Subject':
        return <UserSubjects indexNo={0} />
      case 'Comment':
        return <UserComments indexNo={1} />
      case 'Reply':
        return <UserReplies indexNo={2} />
      case 'Collection':
        return <UserCollections indexNo={3} />
      default:
        return null
    }
  }

  return (
    <Column style={{ flex: 1 }}>
      <MyStatusBar isDarkStyle={false} />
      <HeadTabView
        routes={routes}
        frozeTop={frozeTop}
        renderScene={renderScene}
        makeScrollTrans={makeScrollTrans}
        renderScrollHeader={renderHeader}
        tabbarProps={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
      />
      {renderStackHeade()}
    </Column>
  )
}

export { UserHome }
