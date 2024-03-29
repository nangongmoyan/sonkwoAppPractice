/**
 * 封装列表
 * created by lijianpo on 2021/04/26
 */
import React, { useRef, useCallback, useEffect } from 'react'
import MyText from '../text'
import { Row, Column } from '@ui'
import { FlatList, FlatListProps, Image } from 'react-native'

export interface ListViewProps<ItemT = any> extends FlatListProps<ItemT> {
  data: ItemT[]
  isEnd?: boolean
  loading?: boolean
  loadingMore?: boolean
  refreshying?: boolean
  showEmpty?: boolean
  emptymessage?: string
  onEnd?: () => void
  onRefresh?: () => void
}

export const DefaultListEmptyComponent = ({ message = '没有数据' }) => {
  return (
    <Column style={{ flex: 1 }} align="center" justify="center">
      <Image
        source={require('@source/images/nogt.png')}
        style={{ height: 80, width: 80, marginBottom: 20 }}
      />
      <MyText color="#333">{message}</MyText>
    </Column>
  )
}

const ListView: React.ForwardRefRenderFunction<FlatList<any>, ListViewProps> = (
  {
    data,
    isEnd,
    loading,
    loadingMore,
    onEnd,
    style,
    showEmpty = true,
    emptymessage = '没有数据',
    ...restProps
  },
  ref,
) => {
  const isEndReached = useRef(false)

  const onEndReached = useCallback(() => {
    if (isEndReached.current && onEnd) {
      onEnd()
    }
  }, [isEndReached, onEnd])

  useEffect(() => {
    if (!data || data.length === 0) {
      isEndReached.current = false
    }
  }, [data])

  const keyExtractor = (item: any, index: number): string => {
    return item.id ? `${item.id}_${index}` : index.toString()
  }

  const renderEmpty = () => {
    return showEmpty ? (
      <DefaultListEmptyComponent message={emptymessage} />
    ) : null
  }

  const renderFooter = () => {
    if (isEnd && data.length >= 10) {
      return null
    } else if (loadingMore && data.length >= 10) {
      return (
        <Row justify="center" align="center">
          <MyText>正在加载...</MyText>
        </Row>
      )
    } else {
      return (
        <MyText size={10} color="#999">
          - THE END -
        </MyText>
      )
    }
  }

  const onMomentumScrollBegin = () => {
    isEndReached.current = true
  }

  if (loading || !data) {
    return (
      <Column style={{ flex: 1 }} align="center" justify="center">
        <Image
          source={require('@source/images/loading.gif')}
          style={{ width: 110, height: 110 }}
        />
      </Column>
    )
  }

  return (
    <FlatList
      ref={ref}
      data={data}
      style={style}
      initialNumToRender={20}
      onEndReachedThreshold={0.1}
      keyExtractor={keyExtractor}
      onEndReached={onEndReached}
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={renderFooter}
      contentContainerStyle={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      onMomentumScrollBegin={onMomentumScrollBegin}
      {...restProps}
    />
  )
}

export default React.forwardRef(ListView)
