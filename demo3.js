var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
var fetch = require('node-fetch');

// GraphQL schema
var schema = buildSchema(`
    type Query {
        Employees: [Employee]
    }

    type Employee {
        EmployeeID: ID
        Name: String
        ManagerID: Int
    }
`);
// Root resolver
var root = {
    Employees: () => {
         return fetch('https://rawgit.com/maunashjani/GraphQLDemos/master/data.json')  
         .then(response => response.json())
         //.then(json => console.log(json))
    }
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use('/demo3', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Server Running...'));