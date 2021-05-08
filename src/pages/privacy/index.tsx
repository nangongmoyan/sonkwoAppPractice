/**
 * 隐私设置
 * created by lijianpo on 2021/05/08
 */
import { useLocale } from '@contexts/locale'
import { Column, CustomStackHeader, MyStatusBar } from '@ui'
import React from 'react'

const Privacy: React.FC<any> = ({}) => {
  const { t } = useLocale()

  return (
    <Column>
      <MyStatusBar isDarkStyle={true} />
      <CustomStackHeader title={t('LANG87')} />
    </Column>
  )
}

export { Privacy }
