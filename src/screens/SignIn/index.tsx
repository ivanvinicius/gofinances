import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { Alert } from 'react-native'

import { useAuth } from '../../hooks/auth'
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
  const { GoogleSignIn } = useAuth()

  async function handleSingInGoogle() {
    try {
      await GoogleSignIn()
    } catch (error) {
      console.log(error)
      Alert.alert('Oops!', 'Não foi possível conectar sua conta Google')
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
            onPress={handleSingInGoogle}
            svg={() => <GoogleSVG />}
            title="Entrar com Google"
          />

          <SignInSocialButton
            svg={() => <AppleSVG />}
            title="Entrar com Apple"
          />
        </FooterWrapper>
      </Footer>
    </Container>
  )
}
