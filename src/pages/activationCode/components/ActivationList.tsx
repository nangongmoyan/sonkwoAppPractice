/**
 * created by lijianpo on 2021/06/30
 */
import { get } from 'lodash'
import { ActivationCard } from './ActivationCard'
import { Loading, MyScrollView, Column } from '@ui'
import React, { useMemo, useCallback, useRef } from 'react'
import { useActivationCode } from '@features/activationCode/model'
import { CodeKeyModal } from './CodeKeyModal'
import { useState } from 'react'
const ActivationList: React.FC<any> = ({ area }) => {
  const {
    data,
    refetch,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useActivationCode(area)
  const codeKeyRef = useRef()

  const pages = get(data, 'pages', [])
  const [codeInfo, setCodeInfo] = useState({})
  const showEmpty = useMemo(() => get(pages, '[0].data.length') === 0, [pages])
  console.log({ pages })
  const onEndReached = useCallback(() => {
    hasNextPage && !isFetchingNextPage && fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  const setActivationCode = useCallback((activationCode) => {
    setCodeInfo(activationCode)
    codeKeyRef?.current?.showModal()
  }, [])
  return isLoading ? (
    <Loading />
  ) : (
    <Column style={{ flex: 1 }}>
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
                    setActivationCode={setActivationCode}
                  />
                )
              })}
            </Column>
          )
        })}
      </MyScrollView>
      <CodeKeyModal ref={codeKeyRef} codeInfo={codeInfo} area={area} />
    </Column>
  )
}

export { ActivationList }
