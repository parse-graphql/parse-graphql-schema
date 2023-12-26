> This is now supported out of the box by parse server

# Parse GraphQL Schema [<img src="https://raw.githubusercontent.com/parse-graphql/art/master/logo.svg?sanitize=true" width="100" height="100" align="right" alt="Parse GraphQL Logo">](https://github.com/parse-graphql)

[![npm (scoped)](https://img.shields.io/npm/v/@parse-graphql/schema.svg)](https://www.npmjs.com/package/@parse-graphql/schema) ![stability-experimental](https://img.shields.io/badge/stability-experimental-orange.svg) [![Greenkeeper badge](https://badges.greenkeeper.io/parse-graphql/parse-graphql-schema.svg)](https://greenkeeper.io/) [![CircleCI](https://circleci.com/gh/parse-graphql/parse-graphql-schema.svg?style=svg)](https://circleci.com/gh/parse-graphql/parse-graphql-schema) 

## Project Goals

The goal of this project is to generate a GraphQL schema that supports
most of the Parse API, without having much support for customization in
this library. A lot of customization can be done on the parse-server side, or
the generated types can be imported and you can add them to your own custom schema. 

## Install

```yarn add @parse-graphql/schema```

or 

```npm install --save @parse-graphql/schema```

## Usage

This library can be used directly and served over any protocol, but you might want to
start with [parse-graphql-express](https://github.com/parse-graphql/parse-graphql-express).

Example usage:

```javascript
import generateSchema from '@parse-graphql/schema';
import { graphql } from 'graphql';

const schema = generateSchema({
  appId: "foo",
  masterKey: "bar",
  serverURL: "https://foobar.com/parse"
});

const query = `
  query {
    someClass {
      name
    }
  }
`;

graphql(schema, query).then(result => {
  console.log(result);
});
```

To make authenticated requests, pass in a context with property `sessionToken` set to the sesion token
of the current user:

```javascript
graphql(schema, query, null, { sessionToken })
  .then(result => {
    // ...
  });
```
