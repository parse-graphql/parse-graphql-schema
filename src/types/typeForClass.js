import { GraphQLObjectType } from 'graphql';
import { mapValues, once } from 'lodash';
import { property } from 'lodash/fp';
import mapType from './mapType';
import queryField from '../query/queryField'
import { or } from '../utils/logic'
import Object from './JSONObject';

const builtInResolvers = {
  objectId: property('id'),
  ACL: item => item.getACL(),
  createdAt: property('createdAt'),
  updatedAt: property('updatedAt'),
};

const normalResolver = key => item => item.get(key);

const basicField = (typeMap) => (data, key) => mapType(data, typeMap) && ({
  type: mapType(data, typeMap),
  resolve: builtInResolvers[key] || normalResolver(key),
});

const typeFields = (typeMap, data, key) => ({
  Relation: () => queryField(
    data.targetClass,
    mapType({ type: data.targetClass }, typeMap),
    item => item.relation(key).query()
  ),
});

const getTypeField = (typeMap) => (data, key) => {
  const field = typeFields(typeMap, data, key)[data.type];
  return field && field();
}

export default ({ className, fields }) => (typeMap) => once(() => {
  const propertyFields = () => mapValues(fields, or(
    getTypeField(typeMap),
    basicField(typeMap),
  ));

  return new GraphQLObjectType({
    name: className,
    fields: () => ({
      ...propertyFields(),
      parseObjectJSON: {
        type: Object,
        resolve: item => item.toJSON(),
      },
    }),
  });
});
