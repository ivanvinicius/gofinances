import React from 'react'
import { TouchableOpacityProps } from 'react-native'

import { Container, Title, Icon } from './styles'

interface ICategoryProps extends TouchableOpacityProps {
  category: string
}

export function CategorySelect({ category, ...rest }: ICategoryProps) {
  function handleNavigate() {
    return ''
  }

  return (
    <Container {...rest} onPress={handleNavigate}>
      <Title>{category}</Title>
      <Icon name="chevron-down" />
    </Container>
  )
}
