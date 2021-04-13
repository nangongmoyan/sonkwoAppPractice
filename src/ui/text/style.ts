/**
 * 字号与行高映射
 * created by lijianpo on 2021/04/13
 */
type SizeMap = Record<number, number>

export const normalSizeMap: SizeMap = {
  8: 11,
  10: 14,
  11: 16,
  12: 17,
  13: 18,
  14: 20,
  15: 22,
  16: 22,
  18: 25,
  20: 28,
}

export const bebaSizeMap: SizeMap = {
  16: 19,
  19: 23,
  36: 40,
}
