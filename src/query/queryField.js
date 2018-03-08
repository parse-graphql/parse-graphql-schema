import { GraphQLList } from 'graphql';
import JSON from 'graphql-type-json';
import getFieldNames from 'graphql-list-fields';
import Parse from 'parse/node';
import { merge } from 'lodash';

export default (parseClass, Type, getQuery) => ({
  type: GraphQLList(Type),
  args: {
    queryJSON: {
      type: JSON,
      description: 'JSON from Parse.Query#toJSON()',
    },
  },
  resolve(value, args, context, info) {
    const { json } = args;
    const { sessionToken } = context;
    const mappedQuery = getQuery && getQuery(value, args, context, info);
    const query = mappedQuery
      ? mappedQuery.withJSON(merge({}, mappedQuery.toJSON(), { ...json }))
      : Parse.Query.fromJSON(parseClass, { ...json });

    const fields = getFieldNames(info);
    fields.forEach(field => query.include(field));
    return query.find({ sessionToken });
  }
});
