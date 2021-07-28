import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { ThemeProvider } from 'styled-components'
import {
  useFonts,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_400Regular
} from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading'

// import { Dashboard } from './screens/Dashboard'
// import { Register } from './screens/Register'
import { Category } from './screens/Category'
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
      <StatusBar style="light" translucent />
      <Category />
    </ThemeProvider>
  )
}
