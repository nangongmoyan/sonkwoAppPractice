/**
 *
 */
import { useGameList } from '@features/game/model'
import { Column, MyText, Loading, MyScrollView, Row } from '@ui'
import React, { useMemo, useCallback } from 'react'
import { get } from 'lodash'
import { GameCard } from './GameCard'
const GameList: React.FC<any> = ({}) => {
  const {
    data,
    refetch,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useGameList('rank')

  const pages = get(data, 'pages', [])
  console.log({ data, pages })
  const showEmpty = useMemo(() => get(pages, '[0].list.length') === 0, [pages])
  const onEndReached = useCallback(() => {
    hasNextPage && !isFetchingNextPage && fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  return isLoading ? (
    <Loading />
  ) : (
    <MyScrollView
      refresh
      showEmpty={showEmpty}
      onRefresh={refetch}
      hasNextPage={hasNextPage}
      onEndReached={onEndReached}
      // emptymessage={'一笔交易都木有呢'}
      isFetchingNextPage={isFetchingNextPage}
      // StickyHeaderComponent={renderStickyHeader}
      style={{ paddingHorizontal: 15 }}
    >
      {pages.map((page, i) => {
        return (
          <Row justify="space-between" wrap="wrap" key={i}>
            {page?.list?.map((game, index) => {
              return <GameCard key={index} {...game} />
            })}
          </Row>
        )
      })}
    </MyScrollView>
  )
}

export { GameList }
