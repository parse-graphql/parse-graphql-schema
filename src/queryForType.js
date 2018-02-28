import { GraphQLList } from 'graphql';
import JSON from 'graphql-type-json';
import getFieldNames from 'graphql-list-fields';
import Parse from 'parse/node';

export default (parseClass, Type) => ({
  type: GraphQLList(Type),
  args: {
    json: {
      type: JSON,
    }
  },
  resolve(_, { json }, context, info) {
    const fields = getFieldNames(info);
    const query = Parse.Query.fromJSON(parseClass, { ...json } || { where: {} });
    fields.forEach(field => query.include(field));
    return query.find();
  }
});
