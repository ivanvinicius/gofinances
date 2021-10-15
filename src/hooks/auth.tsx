import React, { createContext, ReactNode, useContext, useState } from 'react'
import * as AuthSession from 'expo-auth-session'

interface IUserProps {
  id: string
  name: string
  email: string
  photo?: string
}

interface IAuthProviderProps {
  children: ReactNode
}

interface IAuthContextData {
  user: IUserProps
  GoogleSignIn(): Promise<void>
}

const AuthContext = createContext({} as IAuthContextData)

function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState({} as IUserProps)

  async function GoogleSignIn() {
    try {
      const CLIENT_ID =
        '702770543819-lld1947nuv8eulnii6s9acrgd12ra0f22.apps.googleusercontent.com'
      const REDIRECT_URI = 'https://auth.expo.io/@ivan_bonetii/gofinances'
      const RESPONSE_TYPE = 'token'
      const SCOPE = encodeURI('profile email')

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

      const response = await AuthSession.startAsync({ authUrl })

      console.log(response)

      setUser({} as IUserProps)
    } catch (error) {
      throw new Error(String(error))
    }
  }

  return (
    <AuthContext.Provider value={{ user, GoogleSignIn }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
