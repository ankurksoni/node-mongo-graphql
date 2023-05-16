const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

const books = [
    { name: 'name1', genre: 'genre1', id: '1', authorId: '1' },
    { name: 'name2', genre: 'genre2', id: '2', authorId: '1' },
    { name: 'name3', genre: 'genre3', id: '3', authorId: '3' },
    { name: 'name4', genre: 'genre4', id: '4', authorId: '4' },
]

const authors = [
    { name: 'name1', id: '1', age: 21 },
    { name: 'name2', id: '2', age: 41 },
    { name: 'name3', id: '3', age: 56 },
    { name: 'name4', id: '4', age: 70 },
]


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return authors.find((author) => author.id === parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books.filter((book) => {
                    return book.authorId === parent.id
                });
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return books.find((book) => book.id === args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return authors.find((book) => book.id === args.id);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});