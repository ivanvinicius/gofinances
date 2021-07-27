import React from 'react'

import profilePic from '../../utils/profilePic'

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreenting,
  UserName,
  Icon
} from './styles'

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: profilePic.url }} resizeMode="cover" />

            <User>
              <UserGreenting>Olá,</UserGreenting>
              <UserName>Vinicius</UserName>
            </User>
          </UserInfo>

          <Icon name="power" />
        </UserWrapper>
      </Header>
    </Container>
  )
}
