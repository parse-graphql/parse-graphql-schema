import { GraphQLObjectType } from 'graphql';
import JSON from 'graphql-type-json';
import { mapValues } from 'lodash';
import { property } from 'lodash/fp';
import mapType from './mapType';

const specialResolvers = {
  objectId: property('id'),
  ACL: item => item.getACL(),
  createdAt: property('createdAt'),
  updatedAt: property('updatedAt'),
};

const standardResolver = key => item => item.get(key);

export default ({ className, fields }) => (typeMap) => () => {
  const propertyFields = () => mapValues(fields, (data, key) => ({
    type: mapType(data, typeMap),
    resolve: specialResolvers[key] || standardResolver(key),
  }));

  return new GraphQLObjectType({
    name: className,
    fields: () => ({
      ...propertyFields(),
      parseObjectJSON: {
        type: JSON,
        resolve: item => item.toJSON(),
      },
    }),
  });
};
