import 'intl'
import 'intl/locale-data/jsonp/pt-BR'
import 'react-native-gesture-handler'

import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { ThemeProvider } from 'styled-components'
import AppLoading from 'expo-app-loading'
import { useFonts, Poppins_700Bold, Poppins_500Medium, Poppins_400Regular } from '@expo-google-fonts/poppins' //eslint-disable-line


import { AppProvider } from './hooks'
import { Routes } from './routes'
import { useAuth } from './hooks/Auth'
import theme from './global/styles/theme'

export function App() {
  const { loginLoading } = useAuth()
  const [isFontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_400Regular
  })

  // useEffect(() => {
  //   async function clear() {
  //     await AsyncStorage.clear()
  //   }
  //   clear()
  // }, [])

  if (!isFontsLoaded || loginLoading) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="light" translucent />

      <AppProvider>
        <Routes />
      </AppProvider>
    </ThemeProvider>
  )
}
