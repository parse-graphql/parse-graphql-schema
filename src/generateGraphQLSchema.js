import { flow, reduce, mapValues, mapKeys } from 'lodash/fp';
import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import camelCase from 'to-camel-case';
import typeForClass from './types/typeForClass';
import dependencyHelper from './utils/dependencyHelper';
import baseMapping from './types/baseMapping';
import queryForType from './query/field';
import typeForPointer from './types/typeForPointer';
import create from './mutation/create/field';
import update from './mutation/update/field'
import deleteField from './mutation/delete/field';

const schemaArrayToObject = reduce((obj, data) => ({
  ...obj,
  [data.className]: data,
}), {});

const classTypeGetters = flow(
  schemaArrayToObject,
  mapValues(typeForClass),
);

const mapClassName = name => name.match(/^_/) ? name.substr(1) : name;

const mutationField = (type, name) => type + mapClassName(name);

export default function generateGraphqlSchema(parseSchema) {
  const types = dependencyHelper(
    baseMapping,
    {
      ...classTypeGetters(parseSchema),
      Pointer: typeForPointer,
    },
  );

  const queryFields = parseSchema.reduce((obj, { className }) => ({
    ...obj,
    [className]: queryForType(className, types[className]()),
  }), {});

  const mutationFields = parseSchema.reduce((obj, { className, fields }) => ({
    ...obj,

    [mutationField('create', className)]:
      create({
        className,
        fields,
        displayName: mapClassName(className),
      }, types[className]()),

    [mutationField('update', className)]:
      update({
        className,
        fields,
        displayName: mapClassName(className),
      }, types[className]()),

    [mutationField('delete', className)]:
      deleteField({
        className,
        fields,
        displayName: mapClassName(className)
      }, types[className]())
  }), {});

  const query = new GraphQLObjectType({
    name: 'Query',
    fields: mapKeys(
      flow(mapClassName, camelCase),
      queryFields,
    ),
  });

  const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: mutationFields,
  });

  return new GraphQLSchema({ query, mutation });
}
