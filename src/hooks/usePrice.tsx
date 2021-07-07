/**
 *
 */
import React from 'react'
import { Price, Discount as Dis } from '@ui'
type PriceType = number | string
type PriceFC = React.FC<{ scaleSymbol?: boolean; fixed?: number }>
/**
 * @param salePrice 售价
 * @param listPrice 原价
 * @param currency 币种
 * @returns 售价，原价，折扣三种组件
 */
const usePrice = (
  salePrice: PriceType,
  listPrice: PriceType,
  currency = 'cn',
) => {
  const sale = parseFloat(salePrice as string)
  const list = parseFloat(listPrice as string)

  const SalePrice: PriceFC = (props) => (
    <Price
      fixed={2}
      size={17}
      price={salePrice}
      currency={currency}
      {...props}
    />
  )

  const ListPrice: PriceFC =
    list > sale
      ? (props) => (
          <Price
            size={14}
            type="list"
            price={listPrice}
            currency={currency}
            {...props}
          />
        )
      : (_) => null

  const Discount: React.FC = (props) => (
    <Dis salePrice={salePrice} listPrice={listPrice} {...props} />
  )

  return { SalePrice, ListPrice, Discount }
}

export default usePrice
