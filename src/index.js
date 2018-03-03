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

export default function parseGraphQLExpress(options) {
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
    graphqlHTTP(async ({ sessionToken }) => ({
      graphiql,
      schema: schema || await getSchema(options, dynamicSchema),
      context: { sessionToken }
    })),
  );
}
