import { flow, reduce, mapValues, mapKeys } from 'lodash/fp';
import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import typeForClass from './typeForClass';
import dependencyHelper from './utils/dependencyHelper';
import baseMapping from './baseMapping';
import queryForType from './queryField';
import typeForPointer from './typeForPointer';

const classTypeGetters = flow(
  reduce((obj, data) => ({
    ...obj,
    [data.className]: data,
  }), {}),
  mapValues(typeForClass),
);

const mapClassName = name => name.match(/^_/) ? name.substr(1) : name;

export default function generateSchema(parseSchema) {
  // TODO: Better way of doing this
  const types = dependencyHelper(
    baseMapping,
    {
      ...classTypeGetters(parseSchema),
      Pointer: typeForPointer,
    },
  );

  const queryFields = parseSchema.reduce((acc, { className }) => ({
    ...acc,
    [className]: queryForType(className, types[className]()),
  }), {});

  const query = new GraphQLObjectType({
    name: 'Query',
    fields: mapKeys(mapClassName, queryFields),
  });

  return new GraphQLSchema({ query });
}
