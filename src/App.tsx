import 'intl'
import 'intl/locale-data/jsonp/pt-BR'
import 'react-native-gesture-handler'

import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { ThemeProvider } from 'styled-components'
import AppLoading from 'expo-app-loading'
import {
  useFonts,
  Poppins_700Bold,
  Poppins_500Medium,
  Poppins_400Regular
} from '@expo-google-fonts/poppins'

import { Routes } from './routes'
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
      <Routes />
    </ThemeProvider>
  )
}
