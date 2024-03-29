/**
 *
 */
import { useGameList } from '@features/game/model'
import { RefreshControl } from 'react-native'
import { Column, MyText, Loading, MyScrollView, Row } from '@ui'
import React, { useMemo, useCallback, useRef, useState } from 'react'
import { get, flatten } from 'lodash'
import { GameCard } from './GameCard'
import { IColumnsHandles } from 'react-native-waterflow-list/src/Columns'
import WaterFlow from 'react-native-waterflow-list/src/'
const GameList: React.FC<any> = ({}) => {
  const WaterFlowRef = useRef<IColumnsHandles>()
  const {
    list,
    refresh,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useGameList('rank')
  const [isRefreshing, setIsRefreshing] = useState(false)

  console.log({ list })
  // console.log({ data, pages, res })
  const renderItem = useCallback(({ item, index }) => {
    return <GameCard key={index} {...item} />
  }, [])

  // const showEmpty = useMemo(() => get(pages, '[0].list.length') === 0, [pages])

  const onRefresh = useCallback(() => {
    setIsRefreshing(true)
    setTimeout(() => {
      refresh && refresh()
      setIsRefreshing(false)
    }, 2000)
  }, [refresh])

  const onEndReached = useCallback(() => {
    // hasNextPage && !isFetchingNextPage && fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  return (
    <Column style={{ flex: 1, backgroundColor: '#F7F7FB' }}>
      <WaterFlow
        numColumns={2}
        ref={WaterFlowRef}
        data={list}
        renderItem={renderItem}
        // onEndReached={fetchNextPage()}
        keyForItem={(item) => item.id}
        columnFlatListProps={{ removeClippedSubviews: false }}
        columnsFlatListProps={{
          showsVerticalScrollIndicator: false,
          // onEndReachedThreshold: 0.1,
          // ListEmptyComponent: renderEmpty(),
          // ListFooterComponent: renderFooter(),
          style: { marginHorizontal: 10 },
          refreshControl: (
            <RefreshControl
              style={{ zIndex: 10 }}
              progressViewOffset={40}
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              tintColor={'gray'}
            />
          ),
        }}
      />
    </Column>
  )
  // return isLoading ? (
  //   <Loading />
  // ) : (

  // )
}

export { GameList }
