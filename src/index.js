import graphqlHTTP from 'express-graphql';
import generateSchema from './generateSchema';
import fetchParseSchema from './fetchParseSchema';
import Parse from 'parse/node';
import express from 'express';
import sessionTokenMiddleware from './sessionTokenMiddleware';

const getSchema = (() => {
  let schema;
  return async (options, alwaysRecreate) => {
    if (!schema || alwaysRecreate) {
      schema = generateSchema(await fetchParseSchema(options));
    }
    return schema;
  }
})();

function parseGraphQLExpress(options) {
  const {
    graphiql,
    parseSchema,
    dynamicSchema,
  } = options;

  const schema = parseSchema && generateSchema(parseSchema);

  const app = express();
  app.use(
    '/',
    sessionTokenMiddleware,
    graphqlHTTP(async () => ({
      graphiql,
      schema: schema || await getSchema(options, dynamicSchema),
    })),
  );
}

export default function parseGraphQL(options) {
  Parse.initialize(options.appId, options.javascriptKey);
  Parse.serverURL = options.serverURL;
  return graphqlHTTP(async () => ({
    graphiql: options.graphiql,
    schema: await getSchema(options, options.dynamicSchema),
  }));
};
