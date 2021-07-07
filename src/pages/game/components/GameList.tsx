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
  const {
    data,
    refresh,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useGameList('rank')
  const pages = get(data, 'pages', [])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const WaterFlowRef = useRef<IColumnsHandles>()

  const res = flatten(pages.map((page) => page.list))
  console.log({ data, pages, res })
  const renderItem = useCallback(({ item, index }) => {
    return <GameCard key={index} {...item} />
  }, [])

  const showEmpty = useMemo(() => get(pages, '[0].list.length') === 0, [pages])

  const onRefresh = useCallback(() => {
    setIsRefreshing(true)
    setTimeout(() => {
      refresh && refresh()
      setIsRefreshing(false)
    }, 2000)
  }, [refresh])

  const onEndReached = useCallback(() => {
    hasNextPage && !isFetchingNextPage && fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  return isLoading ? (
    <Loading />
  ) : (
    <Column style={{ flex: 1, backgroundColor: '#F7F7FB' }}>
      <WaterFlow
        numColumns={2}
        ref={WaterFlowRef}
        data={res || []}
        renderItem={renderItem}
        onEndReached={fetchNextPage()}
        keyForItem={(item) => item.id}
        columnFlatListProps={{ removeClippedSubviews: false }}
        columnsFlatListProps={{
          onEndReachedThreshold: 0.1,
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
}

export { GameList }
