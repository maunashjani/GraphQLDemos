//Import the packages npm
var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
var fetch = require('node-fetch');

// GraphQL schema
var schema = buildSchema(`
    type Query {
        message: [ToDo]
    }

    type ToDo {
        userId: Int
        id: Int
        title: String
        completed: String
    }
`);
// Root resolver
var root = {

    message: () => {
        return fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
       // .then(json => console.log(json))
       
   }
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use('/demo', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Server Running...'));