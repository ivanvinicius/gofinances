import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { TouchableOpacity } from 'react-native'

export const Container = styled(TouchableOpacity)`
  width: 100%;
  padding: ${RFValue(18)}px;
  border-radius: 5px;

  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.secondary};
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.shape};
`
