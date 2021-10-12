import React, { useState, useCallback } from 'react'
import { Alert } from 'react-native'
import Storage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'

import { ChartCard } from '../../components/ChartCard'
import { ITrasactionDataProps } from '../../components/TransactionCard'
import { categories } from '../../utils/categories'

import { Container, Header, Title, Content, ChartCardList } from './styles'

export interface ITotalByCategoryProps {
  name: string
  sum: string
  color: string
}

export function Summary() {
  const [totalByCategories, setTotalByCategories] = useState<
    ITotalByCategoryProps[]
  >([])

  function getSumByCategory(transactions: ITrasactionDataProps[]) {
    const totalByCategory: ITotalByCategoryProps[] = []

    categories.forEach(category => {
      let categorySum = 0

      transactions.forEach((transaction: ITrasactionDataProps) => {
        if (transaction.category === category.key) {
          return (categorySum += Number(transaction.amount))
        }
      })

      if (categorySum > 0) {
        const categorySumFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        totalByCategory.push({
          name: category.name,
          sum: categorySumFormatted,
          color: category.color
        })
      }
    })

    return totalByCategory
  }

  const loadDataFromStorage = useCallback(async () => {
    try {
      const collectionName = '@gofinances:transactions'
      const response = await Storage.getItem(collectionName)
      const parsedTransactions = response ? JSON.parse(response) : []

      const getAllOutcome = parsedTransactions.filter(
        (transaction: ITrasactionDataProps) =>
          transaction.transactionType === 'outcome'
      )

      setTotalByCategories(getSumByCategory(getAllOutcome))
    } catch (error) {
      Alert.alert(
        'Oops!',
        'Não foi possível fazer o carregamento das informações.'
      )
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      loadDataFromStorage()
    }, [loadDataFromStorage])
  )

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
        <ChartCardList
          data={totalByCategories}
          keyExtractor={item => item.name}
          renderItem={({ item: category }) => (
            <ChartCard
              color={category.color}
              categoryName={category.name}
              amount={category.sum}
            />
          )}
        />
      </Content>
    </Container>
  )
}
