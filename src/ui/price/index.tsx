/**
 *
 */
import React, { useMemo } from 'react'
import { Text, StyleSheet } from 'react-native'
enum symbols {
  cn = '￥',
}

// symbol 字符大小匹配
const symbolSizeMap = {
  40: 20,
  30: 16,
  16: 14,
  17: 11,
  13: 7,
  20: 28,
  26: 20,
}

const Price: React.FC<any> = ({
  type,
  price,
  style,
  currency,
  fixed = 1,
  size = 17,
  scaleSymbol = true,
}) => {
  const symbol = symbols[currency]
  const priceStr = parseFloat(price).toFixed(fixed)
  const symbolSize = useMemo(() => {
    if (scaleSymbol) return symbolSizeMap[size]
    return size
  }, [scaleSymbol, size])

  if (price < 0 || price === null) return null
  return (
    <Text style={[type === 'list' ? styles.list : styles.sale, style]}>
      <Text style={[styles.symbol, { fontSize: symbolSize }]}>{symbol}</Text>
      <Text style={[scaleSymbol ? styles.price : {}, { fontSize: size }]}>
        {priceStr}
      </Text>
    </Text>
  )
}

const styles = StyleSheet.create({
  symbol: {},
  price: {
    fontFamily: 'Bebas-Regular',
  },
  sale: {
    color: '#222',
  },
  list: {
    textDecorationLine: 'line-through',
    color: '#85858C',
  },
})

export default Price
