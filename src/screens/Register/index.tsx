import React, { useState } from 'react'
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import * as Y from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Storage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'

import { useAuth } from '../../hooks/Auth'
import { Button } from '../../components/Form/Button'
import { ControlledInput } from '../../components/Form/ControlledInput'
import { CategorySelectButton } from '../../components/Form/CategorySelectButton'
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'
import { CategoryModal } from '../CategoryModal'
import { ITrasactionDataProps } from '../../components/TransactionCard'

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsType
} from './styles'

interface IFormProps {
  name: string
  amount: string
}

const schema = Y.object().shape({
  name: Y.string().required('Informe o nome da transação'),
  amount: Y.number()
    .positive('Apenas valores positivos')
    .typeError('Informe um valor númerico')
    .required('Informe o valor da transação')
})

export function Register() {
  const { user } = useAuth()
  const navigation = useNavigation()
  const [transactionType, setTransactionType] = useState('')
  const [isCategoryModalVisibile, setIsCategoryModalVisible] = useState(false)
  const [categorySelected, setCategorySelected] = useState({
    key: 'category',
    name: 'Categoria'
  })
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) })

  function handleTrasactionTypeSelect(type: 'income' | 'outcome') {
    setTransactionType(type)
  }

  function handleToggleModalVisibility() {
    setIsCategoryModalVisible(state => !state)
  }

  function navigateToDashboard() {
    navigation.navigate('Listagem' as never)
  }

  async function handleRegister({ name, amount }: IFormProps) {
    if (!transactionType) {
      return Alert.alert('Oops!', 'Selecione o tipo da transação.')
    }

    if (categorySelected.key === 'category') {
      return Alert.alert('Oops!', 'Selecione o tipo da categoria.')
    }

    const newTransacation = {
      id: String(uuid.v4()),
      name,
      amount,
      transactionType,
      category: categorySelected.key,
      date: new Date()
    } as ITrasactionDataProps

    try {
      const storageCollectionKey = `@gofinances:transactions:user=${user.id}`

      const currentStorage = await Storage.getItem(storageCollectionKey)
      const currentStorageParsed = currentStorage
        ? JSON.parse(currentStorage)
        : []

      await Storage.setItem(
        storageCollectionKey,
        JSON.stringify([...currentStorageParsed, newTransacation])
      )

      reset()
      setTransactionType('')
      setCategorySelected({ key: 'category', name: 'Categoria' })

      navigateToDashboard()
    } catch (err) {
      Alert.alert('Oops!', 'Parece que algo deu errado ao salvar seus dados.')
    }
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
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              error={errors.name && errors.name.message}
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
