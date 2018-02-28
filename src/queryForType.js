import { GraphQLList } from 'graphql';
import JSON from 'graphql-type-json';
import getFieldNames from 'graphql-list-fields';
import Parse from 'parse/node';

export default (Type) => ({
  type: GraphQLList(Type),
  args: {
    json: {
      type: JSON,
    }
  },
  resolve(_, { json }, context, info) {
    const fields = getFieldNames(info);
    const query = Parse.Query.from(json);
    fields.forEach(field => query.include(field));
    return query.find();
  }
});
