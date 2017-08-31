require('dotenv').config();
const express = require('express');

const expressGraphQL = require('express-graphql');
const schema = require('./schema.js');
const app = express();


/*
entry point for any client that wants 
to interact with graphql on our server

graphiql: true means you want to use ide

Note: express-graphql is the glue between express & graphql 
*/
app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
  }))



const port = process.env.PORT || 3000;

app.listen(port, ()=> {
  console.log(`Listening on port ${port}`);
})