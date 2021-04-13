/**
 *
 * created vy lijianpo on 2021/04/13
 */
import React, { createContext, useState, useMemo } from 'react'
import { useNetInfo } from '@react-native-community/netinfo'

const NetinfoContext = createContext()

const NetinfoProvider = ({ children }) => {
  const netinfo = useNetInfo()
  const [enableCellular, setCellular] = useState(false)

  const net = useMemo(() => {
    return {
      netinfo,
      isCellular: netinfo.type === 'cellular',
      setCellular,
      enableCellular,
    }
  }, [netinfo, enableCellular])

  return (
    <NetinfoContext.Provider value={net}>{children}</NetinfoContext.Provider>
  )
}

export { NetinfoProvider, NetinfoContext }
