import React, { useState, useCallback } from 'react'
import { ActivityIndicator, Alert } from 'react-native'
import Storage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { useTheme } from 'styled-components/native'

import { useAuth } from '../../hooks/Auth'
import { HighlightCard } from '../../components/HighlightCard'
import {
  TransactionCard,
  ITrasactionDataProps
} from '../../components/TransactionCard'

import {
  Container,
  LoadingContainer,
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

interface IHighlightCardProps {
  sum: string
  lastTransaction: string
}

interface IHighlightCardData {
  income: IHighlightCardProps
  outcome: IHighlightCardProps
  total: IHighlightCardProps
}

export function Dashboard() {
  const { SignOut, user } = useAuth()
  const theme = useTheme()
  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<ITrasactionDataProps[]>([])
  const [highlightCardData, setHighlightCardData] =
    useState<IHighlightCardData>({} as IHighlightCardData)

  function getLastTransactionTime(
    transactions: ITrasactionDataProps[],
    transactionType: 'income' | 'outcome'
  ) {
    const translatedTransactionType = { income: 'entrada', outcome: 'saída' }

    const getAllTransactionsByType = transactions.filter(
      transaction => transaction.transactionType === transactionType
    )

    if (getAllTransactionsByType.length === 0) {
      return `Nenhuma ${translatedTransactionType[transactionType]}`
    }

    const getLastTransaction = Math.max.apply(
      Math,
      getAllTransactionsByType.map(transaction =>
        new Date(transaction.date).getTime()
      )
    )

    const lastTransactionToDate = new Date(getLastTransaction)

    return `dia ${lastTransactionToDate.getDate()} de ${lastTransactionToDate.toLocaleString(
      'pt-BR',
      { month: 'long' }
    )}`
  }

  const loadTransactionsFromStorage = useCallback(async () => {
    try {
      let incomeSum = 0
      let outcomeSum = 0

      const storageCollectionKey = `@gofinances:transactions:user=${user.id}`
      const response = await Storage.getItem(storageCollectionKey)
      const transactions = response ? JSON.parse(response) : []

      const formattedTransactions: ITrasactionDataProps[] = transactions.map(
        ({ transactionType, date, amount, ...rest }: ITrasactionDataProps) => {
          transactionType === 'income'
            ? (incomeSum += Number(amount))
            : (outcomeSum += Number(amount))

          const formattedDate = Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          }).format(new Date(date))

          const formattedAmount = Number(amount).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })

          return {
            transactionType,
            date: formattedDate,
            amount: formattedAmount,
            ...rest
          }
        }
      )

      const totalSum = incomeSum - outcomeSum

      const inLastTransaction = getLastTransactionTime(transactions, 'income')
      const outLastTrasaction = getLastTransactionTime(transactions, 'outcome')
      const totalIntervalTransactions = `01 à ${new Date().getDate()} de ${new Date().toLocaleString(
        'pt-BR',
        { month: 'long' }
      )}`

      setHighlightCardData({
        income: {
          sum: incomeSum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }),
          lastTransaction:
            inLastTransaction === 'Nenhuma entrada'
              ? inLastTransaction
              : `Última entrada ${inLastTransaction}`
        },
        outcome: {
          sum: outcomeSum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }),
          lastTransaction:
            outLastTrasaction === 'Nenhuma saída'
              ? outLastTrasaction
              : `Última saída ${outLastTrasaction}`
        },
        total: {
          sum: totalSum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }),
          lastTransaction: totalIntervalTransactions
        }
      })

      setTransactions(formattedTransactions)
    } catch (error) {
      Alert.alert(
        'Oops!',
        'Não foi possível fazer o carregamento das informações.'
      )
    } finally {
      setIsLoading(false)
    }
  }, [user.id])

  useFocusEffect(
    useCallback(() => {
      loadTransactionsFromStorage()
    }, [loadTransactionsFromStorage])
  )

  function handleLogOut() {
    Alert.alert('Atenção!', 'Tem certeza que deseja sair?', [
      {
        text: 'Cancelar',
        style: 'cancel'
      },
      { text: 'OK', onPress: async () => await SignOut() }
    ])
  }

  return (
    <Container>
      {isLoading === true ? (
        <LoadingContainer>
          <ActivityIndicator size={50} color={theme.colors.secondary} />
        </LoadingContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo source={{ uri: user.picture }} resizeMode="cover" />

                <User>
                  <UserGreenting>Olá,</UserGreenting>
                  <UserName>{user.given_name}</UserName>
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
              amount={highlightCardData.income.sum}
              lastTransaction={highlightCardData.income.lastTransaction}
              type="up"
            />
            <HighlightCard
              title="Saídas"
              amount={highlightCardData.outcome.sum}
              lastTransaction={highlightCardData.outcome.lastTransaction}
              type="down"
            />
            <HighlightCard
              title="Total"
              amount={highlightCardData.total.sum}
              lastTransaction={highlightCardData.total.lastTransaction}
              type="total"
            />
          </CardsContainer>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionList
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  )
}
