import React from 'react'

import { ChartCard } from '../../components/ChartCard'

import { Container, Header, Title } from './styles'

export function Summary() {
  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <ChartCard />
    </Container>
  )
}
