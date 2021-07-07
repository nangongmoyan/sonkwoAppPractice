import { useDimensions, usePrice } from '@hooks'
import { Column, MyText, MyImage, Row } from '@ui'
import React from 'react'
import { get } from 'lodash'
const GameCard: React.FC<any> = ({
  skuCovers,
  skuNames,
  salePrice,
  listPrice,
}) => {
  const { width } = useDimensions()
  const imageWidth = Math.floor((width - 40) / 2)
  const cover = get(skuCovers, 'default')
  const skuName = get(skuNames, 'default')
  const { SalePrice, ListPrice, Discount } = usePrice(salePrice, listPrice)
  if (
    skuName === '荒野大镖客：救赎2 steam版' ||
    skuName === '怪物猎人：世界 - 冰原 大师版'
  )
    return null

  return (
    <Column style={{ marginTop: 15 }}>
      <MyImage
        uri={cover}
        width={imageWidth}
        style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
      />
      <Column
        style={{
          width: imageWidth,
          alignItems: 'flex-start',
          paddingVertical: 15,
          paddingHorizontal: 10,
          backgroundColor: 'white',
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}
      >
        <MyText>{skuName}</MyText>
        <Row>
          <SalePrice />
          <ListPrice />
          <Discount />
        </Row>
      </Column>
    </Column>
  )
}

export { GameCard }
