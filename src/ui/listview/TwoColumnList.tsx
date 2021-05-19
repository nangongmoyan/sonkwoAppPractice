/**
 * 封装两列列表
 * created by lijianpo on 2020/04/26
 */
import React, { useMemo, useCallback } from 'react'
import R from 'ramda'
import { Column } from '../flex'
import ListView, { ListViewProps } from './ListView'

type TwoColumnListProps<ItemT> = ListViewProps<ItemT> & {
  /**
   * 需要 item 宽度
   */
  itemWidth?: number
}

function isOdd(len: number) {
  return len % 2 === 0
}

function TwoColumnList<ItemT>({
  data,
  renderItem,
  itemWidth,
  ...restProps
}: TwoColumnListProps<ItemT>) {
  const needFill = useMemo(() => {
    return Array.isArray(data) && isOdd(data.length)
  }, [data])

  const listData = useMemo(() => {
    return needFill ? data.concat([{} as any]) : data
  }, [data, needFill])

  const renderListItem = useCallback(
    ({ item, index }) => {
      if (R.isEmpty(item)) {
        return <Column style={{ width: itemWidth }} />
      } else {
        return renderItem({ item, index })
      }
    },
    [itemWidth, renderItem],
  )

  return (
    <ListView
      {...restProps}
      numColumns={2}
      data={listData}
      renderItem={renderListItem}
    />
  )
}

export { TwoColumnList }
