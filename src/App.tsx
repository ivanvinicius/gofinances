import React from 'react'
import { ThemeProvider } from 'styled-components'

import { Dashboard } from './screens/Dashboard'
import theme from './global/styles/theme'

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  )
}
