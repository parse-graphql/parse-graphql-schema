import { flow, reduce, mapValues } from 'lodash/fp';
import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import typeForClass from './typeForClass';
import dependencyHelper from './utils/dependencyHelper';
import baseMapping from './baseMapping';
import queryForType from './queryForType';

export default function generateSchema(parseSchema) {
  const types = dependencyHelper(
    baseMapping,
    flow(
      reduce((obj, data) => ({
        ...obj,
        [data.className]: data,
      }), {}),
      mapValues(typeForClass),
    )(parseSchema),
  );

  console.log(types);

  const queryFields = parseSchema.reduce((acc, { className }) => ({
    ...acc,
    [className]: queryForType(className, types[className]()),
  }), {});

  const query = new GraphQLObjectType({
    name: 'Query',
    fields: queryFields,
  });

  return new GraphQLSchema({ query });
}
