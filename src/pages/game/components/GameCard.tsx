import { useDimensions, usePrice } from '@hooks'
import { Column, MyText, MyImage, Row, Image } from '@ui'
import React from 'react'
import { get } from 'lodash'
const GameCard: React.FC<any> = ({
  skuCovers,
  skuNames,
  salePrice,
  listPrice,
}) => {
  const { width } = useDimensions()
  const imageWidth = (width - 40) / 2
  const cover = get(skuCovers, 'default')
  const skuName = get(skuNames, 'default')
  const { SalePrice, ListPrice, Discount } = usePrice(salePrice, listPrice)
  // console.log({ cover })
  return (
    <Column style={{ marginTop: 15 }}>
      {cover ? (
        <MyImage
          uri={cover}
          width={imageWidth}
          style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
        />
      ) : (
        <Column>
          <Image
            source={require('@source/images/unavailable.png')}
            style={{ width: 30, height: 41 }}
          />
        </Column>
      )}

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
