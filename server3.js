/**
 * @desc    Server to add a GraphQL front to randomuser.me
 */

const express = require('express')
const express_graphql = require('express-graphql')
const { buildSchema } = require('graphql')
const request = require('request-promise-native')

const schema = buildSchema(`
    type Query {
        user: User
    }
    type User {
        gender: String
        name: Name
        location: Location
        email: String
        login: Login
        dob: String
        registered: String
        phone: String
        cell: String
        id: Id
        picture: Picture
        nat: String
    }
    type Name {
        title: String
        first: String
        last: String
    }
    type Location {
        street: String
        city: String
        state: String
        postcode: Int
    }
    type Login {
        username: String
        password: String
        salt: String
        md5: String
        sha1: String
        sha256: String
    }
    type Id {
        name: String
        value: String
    }
    type Picture {
        large: String
        medium: String
        thumbnail: String
    }
`)

const getUser = async () => {
    const user = await request('https://randomuser.me/api/')
    return JSON.parse(user).results[0]
}

const root = {
    user: getUser
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