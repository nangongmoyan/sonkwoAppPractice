/**
 *
 */
import React from 'react'
import { Row } from '../flex'
import { Text, StyleSheet } from 'react-native'

const Discount: React.FC<any> = ({
  style,
  children,
  size = 13,
  textStyle,
  salePrice,
  listPrice,
  ...restProps
}) => {
  const sale = parseFloat(salePrice)
  const list = parseFloat(listPrice)
  if (sale < 0) return null
  const discount = sale < list ? Math.round(((list - sale) / list) * 100) : 0
  if (discount <= 0) return null

  const discountStr = `-${discount}%`

  if (typeof children === 'function') {
    return children(discount)
  }

  return (
    <Row
      justify="center"
      style={[
        {
          height: 16,
          fontSize: size,
          borderRadius: 2,
          paddingHorizontal: 3,
          backgroundColor: '#ff6d3f',
        },
        style,
      ]}
      {...restProps}
    >
      <Text style={[styles.text, textStyle]}>{discountStr}</Text>
    </Row>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Bebas-Regular',
    color: 'white',
  },
})

export default Discount
