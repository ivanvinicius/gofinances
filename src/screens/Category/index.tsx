import React from 'react'

import { Button } from '../../components/Form/Button'
import { categories } from '../../utils/categories'

import {
  Container,
  Header,
  Title,
  List,
  ListSeparetor,
  ListItem,
  Icon,
  Name,
  Footer
} from './styles'

export type ICategoryDataProps = typeof categories[0]

interface ICategoryProps {
  category: string
  setCategory: (category: ICategoryProps) => void
  closeScreen: () => void
}

export function Category() {
  return (
    <Container>
      <Header>
        <Title>Categorias</Title>
      </Header>

      <List
        data={categories}
        keyExtractor={item => item.key}
        ItemSeparatorComponent={() => <ListSeparetor />}
        renderItem={({ item }) => (
          <ListItem>
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </ListItem>
        )}
      />

      <Footer>
        <Button title="Selecionar" />
      </Footer>
    </Container>
  )
}
