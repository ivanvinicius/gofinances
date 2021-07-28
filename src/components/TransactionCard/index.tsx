import React from 'react'

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

interface ICategoryProps {
  name: string
  icon: string
}

export interface ITrasactionDataProps {
  id: string
  type: 'income' | 'outcome'
  title: string
  amount: string
  category: ICategoryProps
  date: string
}

interface ITransactionCardProps {
  data: ITrasactionDataProps
}

export function TransactionCard({ data }: ITransactionCardProps) {
  return (
    <Container>
      <Title>{data.title}</Title>
      <Amount type={data.type}>
        {data.type === 'outcome' && '- '}
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={data.category.icon} />
          <CategoryName>{data.category.name}</CategoryName>
        </Category>

        <Date>{data.date}</Date>
      </Footer>
    </Container>
  )
}
