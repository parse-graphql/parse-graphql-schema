import generateGraphQLSchema from './generateGraphQLSchema';
import fetchParseSchema from './fetchParseSchema';
import Parse from 'parse/node';

export default async function generateSchema(options) {
  const {
    appId,
    serverURL,
    javascriptKey,
    masterKey,
    parseSchema,
  } = options;

  if (!masterKey && !parseSchema) {
    throw new Error("One of 'masterKey' or 'parseSchema' must be set");
  }

  Parse.initialize(appId, javascriptKey);
  Parse.serverURL = serverURL;

  return generateGraphQLSchema(parseSchema || await fetchParseSchema(options));
}
