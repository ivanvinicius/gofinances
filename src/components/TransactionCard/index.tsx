import React from 'react'

import { categories } from '../../utils/categories'

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date
} from './styles'

export interface ITrasactionDataProps {
  id: string
  transactionType: 'income' | 'outcome'
  title: string
  amount: string
  category: string
  date: string | Date
}

interface ITransactionCardProps {
  data: ITrasactionDataProps
}

export function TransactionCard({ data }: ITransactionCardProps) {
  const [categoryDetailInfo] = categories.filter(
    item => item.key === data.category
  )

  return (
    <Container>
      <Title>{data.title}</Title>
      <Amount type={data.transactionType}>
        {data.transactionType === 'outcome' && '- '}
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={categoryDetailInfo.icon} />
          <CategoryName>{categoryDetailInfo.name}</CategoryName>
        </Category>

        <Date>{data.date}</Date>
      </Footer>
    </Container>
  )
}
