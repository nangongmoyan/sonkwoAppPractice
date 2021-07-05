/**
 *
 * created by lijianpo on 2021/06/30
 */
import { vw } from '@util'
import React, { useCallback } from 'react'
import { get } from 'lodash'
import moment from 'moment'
import { ThemeColors } from 'ui/theme'
import { Row, MyImage, Column, MyText, GHWithoutFeedback } from '@ui'
import { getSkuKeyType } from '@features/common/utils'
import { SkuKeyIcon } from '@features/common/components'

const ActivationCard: React.FC<any> = ({
  id,
  keyType,
  pubdate = 0,
  skuNames,
  skuCovers,
  setActivationCode,
}) => {
  const cover = get(skuCovers, 'default', '')
  const name = get(skuNames, 'default', '')
  const skuKeyType = getSkuKeyType(keyType)
  const skuKeyName = get(skuKeyType, 'name', '')
  const pubdateTime = moment(pubdate * 1000).format('YYYY-MM-DD')

  const showKey = useCallback(() => {
    setActivationCode({ id })
  }, [id, setActivationCode])

  return (
    <Row style={{ paddingHorizontal: 15, marginTop: 15 }}>
      <MyImage
        uri={cover}
        width={vw(27)}
        height={vw(16)}
        style={{ borderRadius: 8, marginRight: 15 }}
      />
      <Column
        style={{ height: vw(16), width: vw(38) }}
        justify="space-between"
        align="flex-start"
      >
        <MyText size={15} numberOfLines={1}>
          {name}
        </MyText>
        <Row>
          <MyText>激活类型：</MyText>
          <SkuKeyIcon keyType={keyType} style={{ marginRight: 5 }} />
          <MyText>{skuKeyName}</MyText>
        </Row>
        <Row>
          <MyText>发布时间：{pubdateTime}</MyText>
        </Row>
      </Column>
      <Column style={{ flex: 1 }} />
      {keyType === 'no_key' ? (
        <MyText color={ThemeColors.Default}>免激活码</MyText>
      ) : (
        <GHWithoutFeedback onPress={showKey}>
          <MyText
            style={{
              borderWidth: 1,
              borderRadius: 4,
              borderColor: ThemeColors.Default,
              paddingVertical: 5,
              paddingHorizontal: 10,
              color: ThemeColors.Default,
            }}
          >
            查看激活码
          </MyText>
        </GHWithoutFeedback>
      )}
    </Row>
  )
}

export { ActivationCard }
