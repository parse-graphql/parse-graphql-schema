import graphqlHTTP from 'express-graphql';
import generateSchema from './generateSchema';
import fetchParseSchema from './fetchParseSchema';
import Parse from 'parse/node';

console.log('TEST');

const getSchema = (() => {
  let schema;
  return async (options, alwaysRecreate) => {
    if (!schema || alwaysRecreate) {
      schema = generateSchema(await fetchParseSchema(options));
    }
    console.log(schema);
    return schema;
  }
})();

export default function parseGraphQL(options) {
  Parse.initialize(options.appId);
  Parse.serverURL = options.serverURL;
  return graphqlHTTP(async () => {
    try {
      return ({
        schema: await getSchema(options, options.dynamicSchema),
        graphiql: true,
      });
    } catch (e) {
      console.error(e);
    }
  });
};
