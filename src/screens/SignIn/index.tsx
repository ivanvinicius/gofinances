import React, { useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { ActivityIndicator, Alert, Platform } from 'react-native'
import { useTheme } from 'styled-components'

import { useAuth } from '../../hooks/Auth'
import { SignInSocialButton } from '../../components/SignInSocialButton'
import LogoSVG from '../../assets/logo.svg'
import AppleSVG from '../../assets/apple.svg'
import GoogleSVG from '../../assets/google.svg'

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper
} from './styles'

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const { GoogleSignIn, AppleSignIn } = useAuth()
  const theme = useTheme()

  async function handleGoogleSignIn() {
    try {
      setIsLoading(true)
      await GoogleSignIn()
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível conectar com a conta Google.')
      setIsLoading(false)
    }
  }

  async function handleAppleSignIn() {
    try {
      setIsLoading(true)
      await AppleSignIn()
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível conectar com a conta Apple.')
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSVG width={RFValue(120)} height={RFValue(68)} />

          <Title>
            Controle suas{'\n'}
            finanças de forma{'\n'}
            muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com{'\n'}
          uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            onPress={handleGoogleSignIn}
            svg={() => <GoogleSVG />}
            title="Entrar com Google"
          />

          {Platform.OS === 'ios' && (
            <SignInSocialButton
              onPress={handleAppleSignIn}
              svg={() => <AppleSVG />}
              title="Entrar com Apple"
            />
          )}
        </FooterWrapper>

        {isLoading && (
          <ActivityIndicator
            color={theme.colors.shape}
            size="small"
            style={{ marginTop: 25 }}
          />
        )}
      </Footer>
    </Container>
  )
}
