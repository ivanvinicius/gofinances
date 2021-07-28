import React from 'react'
import { TouchableOpacityProps } from 'react-native'

import { Container, Icon, Title } from './styles'

interface ITransactionTypeButton extends TouchableOpacityProps {
  title: string
  type: 'income' | 'outcome'
  isActive: boolean
}

const icons = {
  income: 'arrow-up-circle',
  outcome: 'arrow-down-circle'
}

export function TransactionTypeButton({
  title,
  type,
  isActive,
  ...rest
}: ITransactionTypeButton) {
  return (
    <Container type={type} isActive={isActive} {...rest}>
      <Icon name={icons[type]} type={type} />

      <Title>{title}</Title>
    </Container>
  )
}
