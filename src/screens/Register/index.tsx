import React, { useState } from 'react'
import { Modal } from 'react-native'

import { Button } from '../../components/Form/Button'
import { CategorySelectButton } from '../../components/Form/CategorySelectButton'
import { Input } from '../../components/Form/Input'
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'
import { CategoryModal } from '../CategoryModal'

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
  const [isCategoryModalVisibile, setIsCategoryModalVisible] = useState(false)
  const [categorySelected, setCategorySelected] = useState({
    key: 'category',
    name: 'Categoria'
  })

  function handleTrasactionTypeSelect(type: 'income' | 'outcome') {
    setTransactionType(type)
  }

  function handleToggleModalVisibility() {
    setIsCategoryModalVisible(state => !state)
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

          <CategorySelectButton
            title={categorySelected.name}
            onPress={handleToggleModalVisibility}
          />
        </Fields>

        <Button title="Enviar" />
      </Form>

      <Modal visible={isCategoryModalVisibile}>
        <CategoryModal
          category={categorySelected}
          setCategory={setCategorySelected}
          toggleVisibility={handleToggleModalVisibility}
        />
      </Modal>
    </Container>
  )
}
