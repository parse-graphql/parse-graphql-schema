import { GraphQLInputObjectType } from 'graphql';
import { flow, includes, filter, omit, mapValues } from 'lodash/fp';
import { builtInFields } from '../../constants/builtInFields'
import JSONObject from '../../types/JSONObject';
import mapType from '../../types/mapType';
import { or } from '../../../lib/utils/logic';
import baseMapping from '../../types/baseMapping';

const objectTypes = ['Relation', 'Pointer']; // Temporary, these need their own input types

const getBasicField = data =>
  mapType(data, baseMapping) && ({
    type: mapType(data, baseMapping),
  });

const getObjectField = data =>
  includes(data.type, objectTypes) && ({
    type: JSONObject,
  });

export default ({ className, displayName, fields }) => {
  const propertyFields = () => flow(
    omit(builtInFields),
    mapValues(or(
      getObjectField,
      getBasicField,
    )),
  )(fields);

  return new GraphQLInputObjectType({
    name: `Create${displayName}Input`,
    fields: propertyFields,
  });
};
