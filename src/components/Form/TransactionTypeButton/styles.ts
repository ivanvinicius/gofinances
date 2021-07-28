import styled, { css } from 'styled-components/native'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'

interface ITypeProps {
  type: 'income' | 'outcome'
}

interface IContainerProps extends ITypeProps {
  isActive: boolean
}

export const Container = styled(TouchableOpacity)<IContainerProps>`
  width: 48%;
  padding: ${RFValue(18)}px;

  border-radius: 5px;

  align-items: center;
  justify-content: center;
  flex-direction: row;

  background-color: ${({ theme }) => theme.colors.shape};

  ${({ isActive }) =>
    !isActive &&
    css`
      border: 1.5px solid ${({ theme }) => theme.colors.border};
    `}

  ${({ isActive, type }) =>
    isActive &&
    type === 'income' &&
    css`
      background-color: ${({ theme }) => theme.colors.success_light};
    `}

  ${({ isActive, type }) =>
    isActive &&
    type === 'outcome' &&
    css`
      background-color: ${({ theme }) => theme.colors.attention_light};
    `}
`

export const Title = styled.Text`
  margin-left: ${RFValue(16)}px;

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};
`

export const Icon = styled(Feather)<ITypeProps>`
  font-size: ${RFValue(20)}px;
  color: ${({ theme, type }) =>
    type === 'income' ? theme.colors.success : theme.colors.attention};
`
