const express = require('express');
const { graphqlHTTP } = require("express-graphql")
const mongoose = require('mongoose');
const schema = require('./schema/schema');

const app = express();
const PORT = 3000;

const root = {
    hello: () => {
        return "Hello world!"
    },
};

mongoose.connect('mongodb://mongo:27017/graphql')
mongoose.connection.once('open', () => {
    console.log(`MongoDB ready to serve.`);

    app.listen(PORT, () => {
        console.log(`Listening on PORT: ${PORT}`);
    });
})

app.get('/health', (req, res) => res.json({ "status": "I am alive." }));

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}));

