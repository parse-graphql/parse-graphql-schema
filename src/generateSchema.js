import { mapValues } from 'lodash';
import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import typeForClass from './typeForClass';
import dependencyHelper from './utils/dependencyHelper';
import baseMapping from './baseMapping';
import queryForType from './queryForType'

export default function generateSchema(parseSchema) {
  const types = dependencyHelper(
    baseMapping,
    mapValues(parseSchema, typeForClass),
  );

  const queryFields = parseSchema.reduce((acc, { className }) => ({
    ...acc,
    [className]: queryForType(types[className]),
  }), {});

  const query = new GraphQLObjectType({
    name: 'Query',
    fields: queryFields,
  });

  return new GraphQLSchema({ query });
}
