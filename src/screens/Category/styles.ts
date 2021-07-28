import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import { Feather } from '@expo/vector-icons'
import { FlatList } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'

import { ICategoryDataProps } from './'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`
export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};

  width: 100%;
  height: ${RFValue(113)}px;
  padding-bottom: ${RFValue(19)}px;
  align-items: center;
  justify-content: flex-end;
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
`

export const List = styled(
  FlatList as new () => FlatList<ICategoryDataProps>
).attrs({
  showsHorizontalScrollIndicator: false
})`
  width: 100%;
`
export const ListSeparetor = styled.View`
  align-self: flex-end;
  width: 95%;
  height: 1px;

  background-color: ${({ theme }) => theme.colors.border};
`
export const ListItem = styled.View`
  padding: ${RFValue(14)}px ${RFValue(24)}px;

  align-items: center;
  flex-direction: row;
`

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.title};
`

export const Name = styled.Text`
  margin-left: ${RFValue(14)}px;
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
`

export const Footer = styled.View`
  width: 100%;
  padding: ${RFValue(14)}px ${RFValue(24)}px ${getBottomSpace() + RFValue(14)}px;
`
