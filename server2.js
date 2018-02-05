const express = require('express')
const express_graphql = require('express-graphql')
const { buildSchema } = require('graphql')

const data = require('./data')

const schema = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
    },
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`)

const getCourse = args => {
    const { id } = args
    return data.coursesData.filter(course => course.id === id)[0]
}

const getCourses = args => {
    if (args.topic) {
        const { topic } = args
        return data.coursesData.filter(course => course.topic === topic)
    } else {
        return data.coursesData
    }
}

const root = {
    course: getCourse,
    courses: getCourses
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