import React, { useState } from 'react'
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { useForm } from 'react-hook-form'
import * as Y from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button } from '../../components/Form/Button'
import { ControlledInput } from '../../components/Form/ControlledInput'
import { CategorySelectButton } from '../../components/Form/CategorySelectButton'
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

interface IFormProps {
  description: string
  amount: string
}

interface IFormDataProps extends IFormProps {
  transactionType: 'income' | 'outcome'
  category: string
}

const schema = Y.object().shape({
  description: Y.string().required('Informe a descrição da transação'),

  amount: Y.number()
    .positive('Apenas valores positivos')
    .typeError('Informe um valor númerico')
    .required('Informe o valor da transação')
})

export function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })
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

  function handleRegister({ description, amount }: IFormProps) {
    if (!transactionType) {
      return Alert.alert('Oops!', 'Selecione o tipo da transação.')
    }

    if (categorySelected.key === 'category') {
      return Alert.alert('Oops!', 'Selecione o tipo da categoria.')
    }

    const data = {
      description,
      amount,
      transactionType,
      category: categorySelected.key
    } as IFormDataProps

    console.log(data)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <ControlledInput
              name="description"
              control={control}
              placeholder="Descrição"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.description && errors.description.message}
            />
            <ControlledInput
              name="amount"
              placeholder="Valor"
              control={control}
              keyboardType="numeric"
              autoCorrect={false}
              error={errors.amount && errors.amount.message}
            />

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

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>

        <Modal visible={isCategoryModalVisibile}>
          <CategoryModal
            category={categorySelected}
            setCategory={setCategorySelected}
            toggleVisibility={handleToggleModalVisibility}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}
