/**
 * Previous
 * created by lijianpo on 2021/04/14
 */
import { useEffect, useRef } from 'react'

/**
 * @param value 需要记录变化的值
 * @returns 上次的值
 */
function usePrevious<T = any>(value: T): T | undefined {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export default usePrevious
