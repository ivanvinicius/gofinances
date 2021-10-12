import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { FlatList } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'

import { ITotalByCategoryProps } from './'

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
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
`

export const Content = styled.View`
  flex: 1;

  padding: ${RFValue(24)}px;
`

export const ChartCardList = styled(
  FlatList as new () => FlatList<ITotalByCategoryProps>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingBottom: getBottomSpace() }
})``
