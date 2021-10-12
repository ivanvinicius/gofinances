import React, { useState, useCallback } from 'react'
import { Alert } from 'react-native'
import Storage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { VictoryPie } from 'victory-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components/native'

import { ChartCard } from '../../components/ChartCard'
import { ITrasactionDataProps } from '../../components/TransactionCard'
import { categories } from '../../utils/categories'

import { Container, Header, Title, Content, ChartContainer } from './styles'

export interface ITotalByCategoryProps {
  name: string
  formattedSum: string
  unformattedSum: number
  percentage: string
  color: string
}

export function Summary() {
  const theme = useTheme()
  const [totalByCategories, setTotalByCategories] = useState<
    ITotalByCategoryProps[]
  >([])

  function getSumAndPercentageByCategory(transactions: ITrasactionDataProps[]) {
    const totalByCategory: ITotalByCategoryProps[] = []

    const outcomeAmount = transactions.reduce(
      (acc: number, item: ITrasactionDataProps) => {
        return (acc += Number(item.amount))
      },
      0
    )

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

        const percent = `${((categorySum / outcomeAmount) * 100).toFixed(0)}%`

        totalByCategory.push({
          name: category.name,
          formattedSum: categorySumFormatted,
          unformattedSum: categorySum,
          percentage: percent,
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

      const allOutcomeTransactions = parsedTransactions.filter(
        (transaction: ITrasactionDataProps) =>
          transaction.transactionType === 'outcome'
      )

      setTotalByCategories(
        getSumAndPercentageByCategory(allOutcomeTransactions)
      )
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
        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            colorScale={totalByCategories.map(({ color }) => color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fill: theme.colors.shape,
                fontWeight: 'bold'
              }
            }}
            labelRadius={110}
            x="percentage"
            y="unformattedSum"
          />
        </ChartContainer>

        {totalByCategories.map(({ name, color, formattedSum }) => (
          <ChartCard
            key={name}
            categoryName={name}
            color={color}
            amount={formattedSum}
          />
        ))}
      </Content>
    </Container>
  )
}
