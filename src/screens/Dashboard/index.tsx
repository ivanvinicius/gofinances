import React from 'react'

import { HighlightCard } from '../../components/HighlightCard'
import {
  TransactionCard,
  ITrasactionDataProps
} from '../../components/TransactionCard'
import profilePic from '../../utils/profilePic'

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreenting,
  UserName,
  Icon,
  CardsContainer,
  Transactions,
  Title,
  TransactionList
} from './styles'

export function Dashboard() {
  const dashData: ITrasactionDataProps[] = [
    {
      id: '1',
      type: 'income',
      title: 'Desenvolvimento de site',
      amount: 'R$ 12.000,00',
      category: {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date: '13/04/2020'
    },
    {
      id: '2',
      type: 'outcome',
      title: 'Hamburgueria Pizzy',
      amount: 'R$ 59,00',
      category: {
        name: 'Alimentação',
        icon: 'coffee'
      },
      date: '10/04/2020'
    },
    {
      id: '3',
      type: 'outcome',
      title: 'Aluguel do apartamento em Rio do Sul',
      amount: 'R$ 1.348,50',
      category: {
        name: 'Moradia',
        icon: 'home'
      },
      date: '13/05/2020'
    }
  ]

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: profilePic.url }} resizeMode="cover" />

            <User>
              <UserGreenting>Olá,</UserGreenting>
              <UserName>Vinicius</UserName>
            </User>
          </UserInfo>

          <Icon name="power" />
        </UserWrapper>
      </Header>

      <CardsContainer>
        <HighlightCard
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
          type="up"
        />
        <HighlightCard
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
          type="down"
        />
        <HighlightCard
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
          type="total"
        />
      </CardsContainer>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={dashData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  )
}
