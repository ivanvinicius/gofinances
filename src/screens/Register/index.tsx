import React, { useState } from 'react'

import { Button } from '../../components/Form/Button'
import { Input } from '../../components/Form/Input'
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsType
} from './styles'

export function Register() {
  const [transactionType, setTransactionType] = useState('')

  function handleTrasactionTypeSelect(type: 'income' | 'outcome') {
    setTransactionType(type)
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />

          <TransactionsType>
            <TransactionTypeButton
              type="income"
              title="Renda"
              onPress={() => handleTrasactionTypeSelect('income')}
              isActive={transactionType === 'income'}
            />
            <TransactionTypeButton
              type="outcome"
              title="Despesa"
              onPress={() => handleTrasactionTypeSelect('outcome')}
              isActive={transactionType === 'outcome'}
            />
          </TransactionsType>
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  )
}
