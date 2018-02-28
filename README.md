# Parse Server GraphQL

**WIP**

Automatically creates a GraphQL API from an instance of [parse-server](https://github.com/parse-community/parse-server).

Still missing many features (authentication, several built-in types, and more).

## Install

`yarn add parse-server-graphql`


## Usage

This wraps [express-graphql](https://github.com/graphql/express-graphql) and should be mounted on your express app:

```javascript
const parseGraphQL = require('parse-server-graphql');

// ...

const graphAPI = parseGraphQL({
  appId,
  masterKey, // Needed to fetch schema
  serverURL,
  dynamicSchema: true, // Whether or not to recreate schema on every request
  graphiql: true, // Whether or not to run graphiql
});

app.use('/graphql', graphAPI);
```
