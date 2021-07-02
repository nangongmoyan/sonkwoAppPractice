/**
 * created by lijianpo on 2021/06/30
 */
import { get } from 'lodash'
import { ActivationCard } from './ActivationCard'
import { Loading, MyScrollView, Column } from '@ui'
import React, { useMemo, useCallback } from 'react'
import { useActivationCode } from '@features/activationCode/model/useActivationCode'

const ActivationList: React.FC<any> = ({ area, codeKeyRef }) => {
  const {
    data,
    refetch,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useActivationCode(area)

  const pages = get(data, 'pages', [])

  const showEmpty = useMemo(() => get(pages, '[0].data.length') === 0, [pages])

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
    >
      {pages.map((page, i) => {
        return (
          <Column key={i}>
            {page?.games?.map((activation, index) => {
              return (
                <ActivationCard
                  key={index}
                  {...activation}
                  codeKeyRef={codeKeyRef}
                />
              )
            })}
          </Column>
        )
      })}
    </MyScrollView>
  )
}

export { ActivationList }
