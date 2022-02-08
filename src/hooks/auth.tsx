import React, { createContext, useContext } from 'react'

import profilePicURL from '../utils/profilePic'

interface IAuthProviderProps {
  children: React.ReactNode
}

interface IUser {
  id: string
  name: string
  email: string
  photo?: string
}

interface IAuthProviderData {
  user: IUser
}

const userExample = {
  id: '1',
  name: 'Ivan',
  email: 'ivan@gmail.com',
  photo: profilePicURL.url
}

const AuthContext = createContext({} as IAuthProviderData)

function AuthProvider({ children }: IAuthProviderProps) {
  return (
    <AuthContext.Provider value={{ user: userExample }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
