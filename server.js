const express = require('express')
const express_graphql = require('express-graphql')
const { buildSchema } = require('graphql')

// GraphQL schema
const schema = buildSchema(`
  type Query {
      message: String
  }  
`)

const root = {
    message: () => 'Testing 123!'
}

const app = express()
app.use('/graphql', express_graphql({
    schema,
    rootValue: root,
    graphiql: true
}))

app.listen(4000, () => {
    console.log('Running on http://localhost:4000/graphql')
})