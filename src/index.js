import graphqlHTTP from 'express-graphql';
import generateSchema from './generateSchema';
import fetchParseSchema from './fetchParseSchema';

const getSchema = (() => {
  let schema;
  return async (options, alwaysRecreate) => {
    if (!schema || alwaysRecreate) {
      schema = generateSchema(await fetchParseSchema(options));
    }
    return schema;
  }
});

export default function parseGraphQL(options) {
  return graphqlHTTP(async () => ({
    schema: await getSchema(options, options.dynamicSchema),
    graphiql: true,
  }));
};
