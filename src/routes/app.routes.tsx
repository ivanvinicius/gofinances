import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'

import { Dashboard } from '../screens/Dashboard'
import { Register } from '../screens/Register'
import { Summary } from '../screens/Summary'
import theme from '../global/styles/theme'

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,

        tabBarLabelPosition: 'beside-icon',

        tabBarStyle: {
          alignItems: 'center',
          justifyContent: 'center'
        },

        tabBarLabelStyle: {
          fontFamily: theme.fonts.medium,
          fontSize: 14
        }
      }}
    >
      <Screen
        name="Listagem"
        component={Dashboard}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="list" size={size} color={color} />
          )
        }}
      />
      <Screen
        name="Cadastrar"
        component={Register}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="dollar-sign" size={size} color={color} />
          )
        }}
      />
      <Screen
        name="Resumo"
        component={Summary}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="pie-chart" size={size} color={color} />
          )
        }}
      />
    </Navigator>
  )
}
