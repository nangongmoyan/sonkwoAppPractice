/**
 *
 * created by lijianpo on 2021/04/13
 */
import React, { createContext, useState } from 'react'

const LoadingContext = createContext({ loading: false, setLoading: () => {} })

const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  return (
    <LoadingContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {/* {loading ? <Loading2 /> : null} */}
      {children}
    </LoadingContext.Provider>
  )
}

export { LoadingContext, LoadingProvider }
