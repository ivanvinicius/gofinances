import React, { useState, useCallback } from 'react'
import { Alert } from 'react-native'
import Storage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'

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
  LogOutButton,
  Icon,
  CardsContainer,
  Transactions,
  Title,
  TransactionList
} from './styles'

export function Dashboard() {
  const [data, setData] = useState<ITrasactionDataProps[]>([])

  function handleLogOut() {
    return Alert.alert('Sair da aplicação', 'Tem certeza que deseja sair?')
  }

  async function loadTransactionsFromStorage() {
    const collectionName = '@gofinances:transactions'

    const response = await Storage.getItem(collectionName)

    const transactions = response ? JSON.parse(response) : []

    const formattedTransactions: ITrasactionDataProps[] = transactions.map(
      ({ date, amount, ...rest }: ITrasactionDataProps) => ({
        date: Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(date)),

        amount: Number(amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),

        ...rest
      })
    )

    setData(formattedTransactions)
  }

  useFocusEffect(
    useCallback(() => {
      loadTransactionsFromStorage()
    }, [])
  )

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

          <LogOutButton onPress={handleLogOut}>
            <Icon name="power" />
          </LogOutButton>
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
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  )
}
