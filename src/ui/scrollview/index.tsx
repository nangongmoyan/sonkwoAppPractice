/**
 *
 * created by lijianpo on 2021/06/23
 */
import React, { useRef, useState, useCallback } from 'react'

import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native'
import MyText from '../text'
import { Column, Row } from '../flex'
import { debounce, deviceHeight, getBottomSpace } from '@util'
import { DefaultListEmptyComponent } from 'ui/listview/ListView'

const MyScrollView: React.FC<any> = ({
  style,
  refresh,
  children,
  onScroll,
  onRefresh,
  fetchData,
  emptymessage,
  enableTop = false,
  showEmpty = false,
  hasNextPage,
  isFetchingNextPage,
  scrollEnabled = true,
  onEndReached = () => {},
  scrollEventThrottle = 300,
  onEndReachedThreshold = 0.1,
  StickyHeaderComponent = <View />,
  StickyFooterComponent = <View />,
  ...restProps
}) => {
  const offset = useRef(0)
  const contentHeight = useRef(0)
  const scrollViewRef = useRef()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showTopButton, setShowTopButton] = useState(false)

  const stickyHeader = React.isValidElement(StickyHeaderComponent) ? (
    StickyHeaderComponent
  ) : (
    <StickyHeaderComponent />
  )

  const stickyFooter = React.isValidElement(StickyFooterComponent) ? (
    StickyFooterComponent
  ) : (
    <StickyFooterComponent />
  )

  const onScrollFc = (e) => {
    const nevent = e.nativeEvent
    const { contentOffset, contentSize, layoutMeasurement } = nevent
    const offsetY = parseInt(contentOffset.y)
    const contentSizeHeight = parseInt(contentSize.height)
    const direction = offsetY > offset.current ? 'down' : 'up'
    onScroll && onScroll(e, direction)
    offset.current = offsetY

    if (
      contentOffset.y > 0 &&
      contentHeight.current < contentSizeHeight &&
      deviceHeight + offsetY + deviceHeight * onEndReachedThreshold >=
        contentSizeHeight
    ) {
      contentHeight.current = contentSizeHeight
      onEndReached && onEndReached()
    }

    if (enableTop && offsetY >= layoutMeasurement.height * 2) {
      if (!showTopButton) {
        setShowTopButton(true)
      }
    } else if (showTopButton) {
      setShowTopButton(false)
    }
  }

  const onRefreshFc = useCallback(() => {
    setIsRefreshing(true)
    debounce(() => {
      onRefresh ? onRefresh() : fetchData && fetchData()
      setIsRefreshing(false)
      contentHeight.current = 0
    }, 2000)
  }, [fetchData, onRefresh])

  const goTop = useCallback(() => {
    scrollViewRef?.current?.scrollTo({ y: 0 })
    setShowTopButton(false)
  }, [])

  const renderEmpty = useCallback(() => {
    return <DefaultListEmptyComponent message={emptymessage} />
  }, [emptymessage])

  const renderFooter = useCallback(() => {
    if (isFetchingNextPage) {
      return (
        <Row justify="center" align="center">
          <MyText>正在加载...</MyText>
        </Row>
      )
    } else if (hasNextPage) {
      return null
    } else {
      return (
        <MyText
          size={10}
          color="#999"
          style={{ paddingTop: 20, paddingBottom: getBottomSpace() }}
        >
          - THE END -
        </MyText>
      )
    }
  }, [hasNextPage, isFetchingNextPage])
  return (
    <Column style={[{ flex: 1, backgroundColor: 'white' }, style]}>
      {stickyHeader}
      {!showEmpty ? (
        <Column style={{ flex: 1 }}>
          <ScrollView
            {...restProps}
            onScroll={onScrollFc}
            scrollsToTop
            scrollEventThrottle={scrollEventThrottle}
            ref={scrollViewRef}
            directionalLockEnabled
            showsVerticalScrollIndicator={false}
            automaticallyAdjustContentInsets={false}
            scrollEnabled={scrollEnabled}
            // // onContentSizeChange={onContentSizeChange}
            refreshControl={
              refresh ? (
                <RefreshControl
                  onRefresh={onRefreshFc}
                  progressViewOffset={40}
                  refreshing={isRefreshing}
                />
              ) : null
            }
          >
            {children}
            {renderFooter()}
          </ScrollView>
        </Column>
      ) : (
        renderEmpty()
      )}
      {stickyFooter}
      {showTopButton ? (
        <TouchableOpacity
          style={[styles.topBtn, { bottom: 200 }]}
          onPress={goTop}
        >
          <Image
            resizeMode="contain"
            style={styles.topImage}
            source={require('@source/images/toTop.png')}
          />
        </TouchableOpacity>
      ) : null}
    </Column>
  )
}

export default MyScrollView

const styles = StyleSheet.create({
  topBtn: {
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'absolute',
  },
  topImage: {
    width: 40,
    height: 40,
  },
})
