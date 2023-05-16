const express = require('express');
const { graphqlHTTP } = require("express-graphql")
const schema = require('./schema/schema');

const app = express();
const PORT = 4000;

const root = {
    hello: () => {
        return "Hello world!"
    },
};

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(4000, () => {
    console.log(`Listening on PORT: ${PORT}`);
});