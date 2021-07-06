import { useDimensions } from '@hooks'
import { Column, MyText, MyImage, Image } from '@ui'
import React from 'react'
import { get } from 'lodash'
const GameCard: React.FC<any> = ({ skuCovers }) => {
  const { width } = useDimensions()
  const imageWidth = (width - 40) / 2
  const cover = get(skuCovers, 'default')
  console.log({ cover })
  return (
    <Column>
      <MyImage uri={cover} width={imageWidth} />
      <MyText>ASDFSA</MyText>
    </Column>
  )
}

export { GameCard }
