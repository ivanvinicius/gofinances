/* eslint-disable camelcase */
/* eslint-disable  no-undef */

import React, { createContext, useContext, useState } from 'react'
import * as AuthSession from 'expo-auth-session'

interface IAuthProviderProps {
  children: React.ReactNode
}

interface IUser {
  id: string
  email: string
  name: string
  given_name: string
  family_name: string
  picture: string
  locale: string
  verified_email: string
}

interface IAuthProviderData {
  user: IUser
  GoogleSignIn: () => void
}

interface IAuthSessionResponse {
  params: {
    access_token: string
  }
  type: string
}

const { CLIENT_ID } = process.env
const { REDIRECT_URI } = process.env

const AuthContext = createContext({} as IAuthProviderData)

function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<IUser>({} as IUser)

  async function GoogleSignIn() {
    try {
      const GOOGLE_END_POINT = 'https://accounts.google.com/o/oauth2/v2/auth'
      const RESPONSE_TYPE = 'token'
      const SCOPE = encodeURI('profile email')

      const authUrl = `${GOOGLE_END_POINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

      const { type, params } = (await AuthSession.startAsync({
        authUrl
      })) as IAuthSessionResponse

      if (type === 'success') {
        const infoUrl = 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json'

        fetch(`${infoUrl}&access_token=${params.access_token}`)
          .then(response => response.json())
          .then(userInfo => setUser(userInfo))
      }
    } catch (err) {
      throw new Error(String(err))
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
