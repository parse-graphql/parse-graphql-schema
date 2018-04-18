import { GraphQLInputObjectType, GraphQLNonNull } from 'graphql';
import { flow, includes, filter, omit, map, toPairs, fromPairs } from 'lodash/fp';
import { builtInFields, OBJECT_ID } from '../../constants/builtInFields';
import JSONObject from '../../types/JSONObject';
import mapType from '../../types/mapType';
import baseMapping from '../../types/baseMapping';

const objectTypes = ['Relation', 'Pointer']; // Temporary, these need their own input types

const excludedFields = filter(field => field !== OBJECT_ID, builtInFields);

const requiredFields = [OBJECT_ID];

const getBasicField = (data) =>
  mapType(data, baseMapping) && ({
    type: mapType(data, baseMapping),
  });

const getObjectField = (data) =>
  includes(data.type, objectTypes) && ({
    type: JSONObject,
  });

const makeRequired = (data, key) => includes(key, requiredFields)
  ? {
    ...data,
    type: GraphQLNonNull(data.type),
  }
  : data;

export default ({ className, displayName, fields }) => {
  const propertyFields = () => flow(
    omit(excludedFields),
    toPairs,
    map(([key, value]) => {
      const type = getObjectField(value) || getBasicField(value);
      return [key, type && makeRequired(type, key)];
    }),
    filter(([key, value]) => !!value),
    fromPairs,
  )(fields);

  return new GraphQLInputObjectType({
    name: `Update${displayName}Input`,
    fields: propertyFields,
  });
};
