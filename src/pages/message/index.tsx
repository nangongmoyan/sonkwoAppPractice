/**
 *
 * created by lijianpo on 2021/05/20
 */
import { useLocale } from '@contexts/locale'
import { Column, CustomStackHeader, MyListView, MyStatusBar, View } from '@ui'
import React, { useCallback } from 'react'

const Message: React.FC<any> = ({}) => {
  const { t } = useLocale()

  const renderHeader = useCallback(() => {
    return <View />
  }, [])
  const renderItem = useCallback(() => {
    return <View />
  }, [])
  return (
    <Column>
      <MyStatusBar isDarkStyle={true} />
      <CustomStackHeader title={t('LANG33')} />
      <MyListView
        data={[]}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
      />
    </Column>
  )
}

export { Message }
