# nodejs.graphql-base-setup
Setup of a GraphQL server in NodeJS

Uses GraphQL
> http://graphql.org/

- GraphQL is declarative
- GraphQL is compositional
- GraphQL is strongly-typed

## Example Fragment Request

```graphql

query getUsers {
	user1: user {
    ...aUser
  }
  user2: user {
    ...aUser
  }
}

fragment aUser on User {
  name {
    title
    last
  }
  email
}

```
