# node-mongo-graphql
A Nodejs app with express.js, graphql, mongodb, mongoose etc.

## Pre-requisites

* Make sure you have latest Node.js installed
* Make sure you have docker engine installed

## Local setup

* Ensure you have checkout fom master code.
* goto to the project folder and run command `docker-compose down node-jwt;docker rmi $(docker images -f "dangling=true" -q); docker system prune; docker-compose up --build -d`
* you must see mongodb and our server container up and running with command `docker ps`

  ```bash
  node-mongo-graphql_mongo_1 is up-to-date
  Recreating node-mongo-graphql_node-graphql_1 ... done
  ```

## GraphQL queries

Goto http://localhost:3000/graphql, you must see graphiql UI interface ready for you. Test below queries by copy pasting command on the LHS of the UI interface.

* For doing any kind of mutation, [__Note__: Use appropriate `authorId` ]
  ```bash
  mutation {
    addAuthor(name: "book2", age: 33){
      name
      age
      id
    }
  }

  mutation {
    addBook(name: "book2", genre: "genre2", authorId: "646358f87ad8d02d4d0a0d63"){
      name
      genre
      id
    }
  }
  ```

* For doing retrieval of book information,
  ```bash
  {
    books{
      name
      genre
      author{
        name
        age
      }
    }
  }
  ```

* For doing retrieval of author information,
  ```bash
  {
    authors{
      name
      age
      books{
        name
        genre
      }
    }
  }
  ```

* For doing retrieval of a specific book. [__Note__: Use appropriate `id` ]
  ```bash
  {
    book(id: "64635cbc17c53c651540b687") {
    name
      genre
      author{
        name
        age
      }
    }
  }
  ```

* For doing retrieval of a specific author. [__Note__: Use appropriate `id` ]
  ```bash
  {
    author(id: "646358f87ad8d02d4d0a0d63") {
      name
      age
      books{
        name
        genre
      }
    }
  }
  ```