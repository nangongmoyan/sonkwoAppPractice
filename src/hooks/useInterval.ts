/**
 * Interval
 * created by lijianpo on 2021/04/14
 */
import React, { useRef, useEffect } from 'react'

// santisfy typescript
const emptyF = () => {}

/**
 *
 * @param callback 定时函数
 * @param delay 延迟
 * example:
 * ```ts
 * const [count, setCount] = React.useState(0)
 * const [delay, setDelay] = React.useState(1000)
 *
 * useInterval(() => setCount(count+1), delay > 500 ? delay:null)
 * ```
 */

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(emptyF)

  // update latest callback with fresh props and state
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const handler = () => savedCallback.current()

    if (delay !== null) {
      const id = setInterval(handler, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export default useInterval
