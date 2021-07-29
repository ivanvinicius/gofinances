import React from 'react'
import { TouchableOpacityProps } from 'react-native'

import { Container, Title, Icon } from './styles'

interface ICategorySelectButtonProps extends TouchableOpacityProps {
  title: string
}

export function CategorySelectButton({
  title,
  ...rest
}: ICategorySelectButtonProps) {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
      <Icon name="chevron-down" />
    </Container>
  )
}
