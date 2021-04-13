/**
 *
 * created by lijianpo on 2021/04/13
 */
import React, { createContext } from 'react'
import { ThemeColors } from 'ui/theme'

const ThemeContext = createContext({ theme: ThemeColors })

const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ theme: ThemeColors }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { ThemeProvider, ThemeContext }
