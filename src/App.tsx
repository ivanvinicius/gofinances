import React from 'react'
import { ThemeProvider } from 'styled-components'
import {
  useFonts,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_400Regular
} from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading'

import { Dashboard } from './screens/Dashboard'
import theme from './global/styles/theme'

export function App() {
  const [isFontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_400Regular
  })

  if (!isFontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  )
}
