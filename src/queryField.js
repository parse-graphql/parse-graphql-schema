import { GraphQLList } from 'graphql';
import JSON from 'graphql-type-json';
import getFieldNames from 'graphql-list-fields';
import Parse from 'parse/node';
import { merge } from 'lodash';

export default (parseClass, Type, getQuery) => ({
  type: GraphQLList(Type),
  args: {
    json: {
      type: JSON,
    }
  },
  resolve(...args) {
    const [value, { json }, { sessionToken }, info] = args;
    const query = getQuery
      ? getQuery(...args).withJSON(merge({}, query.toJSON(), { ...json }))
      : Parse.Query.fromJSON(parseClass, { ...json });

    const fields = getFieldNames(info);
    fields.forEach(field => query.include(field));
    return query.find({ sessionToken });
  }
});
