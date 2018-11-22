const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

// allow cross-origin requests
app.use(cors())

mongoose.connect(
  'mongodb://test:test123@ds121289.mlab.com:21289/react-graphql',
  { useNewUrlParser: true }
)
mongoose.connection.once('open', () => {
  console.log('Connected to database')
})

app.use(
  '/graphql',
  graphqlHTTP({
    // schema: schema
    schema,
    graphiql: true
  })
)

app.listen(4000, () => console.log(`Listening for requests on port 4000`))
