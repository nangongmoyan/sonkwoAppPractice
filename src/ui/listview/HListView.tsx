/**
 * 高阶列表
 * created by lijianpo on 2021/04/26
 */
import React, { useRef, useState, useEffect, useCallback } from 'react'
import { HFlatList } from 'react-native-head-tab-view'
import { FlatList, FlatListProps } from 'react-native'
import { DefaultListEmptyComponent } from './ListView'

interface ListViewProps<ItemT = any> extends FlatListProps<ItemT> {
  data: ItemT[]
  indexNo: number
  showEmpty?: boolean
  emptymessage?: string
  isPullRefresh?: boolean
  onEnd?: () => void
}

const HFlistView: React.ForwardRefRenderFunction<
  FlatList<any>,
  ListViewProps
> = (
  {
    indexNo,
    data,
    isPullRefresh,
    showEmpty,
    emptymessage,
    onEnd,
    ...restProps
  },
  ref,
) => {
  const isEndReached = useRef(false)
  let mTimer: NodeJS.Timeout
  const [isRefreshing, setIsRefreshing] = useState(false)

  const onEndReached = useCallback(() => {
    if (isEndReached.current && onEnd) {
      onEnd()
    }
  }, [isEndReached, onEnd])

  useEffect(() => {
    return () => {
      if (mTimer) {
        clearInterval(mTimer)
      }
    }
  })

  const renderEmpty = () => {
    return showEmpty ? (
      <DefaultListEmptyComponent message={emptymessage} />
    ) : null
  }

  const keyExtractor = (item: any, index: number): string => {
    return item.id ? `${item.id}_${index}` : index.toString()
  }

  const onStartRefresh = () => {
    setIsRefreshing(true)
    mTimer = setTimeout(() => setIsRefreshing(false), 2000)
  }

  const onMomentumScrollBegin = () => {
    isEndReached.current = true
  }

  const props = isPullRefresh
    ? {
        isRefreshing,
        onStartRefresh,
      }
    : {}

  return (
    <HFlatList
      ref={ref}
      data={data}
      index={indexNo}
      initialNumToRender={20}
      onEndReachedThreshold={0.1}
      keyExtractor={keyExtractor}
      onEndReached={onEndReached}
      ListEmptyComponent={renderEmpty}
      // ListFooterComponent={renderFooter}
      showsVerticalScrollIndicator={false}
      onMomentumScrollBegin={onMomentumScrollBegin}
      {...props}
      {...restProps}
    />
  )
}

export default React.forwardRef(HFlistView)
