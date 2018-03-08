import { mapValues, constant } from 'lodash/fp';
import JSONObject from './JSONObject';
import File from './File';
import Date from './Date';
import ACL from './ACL';
import {
  GraphQLString,
  GraphQLBoolean,
  GraphQLFloat,
} from 'graphql';

export default mapValues(constant, {
  File,
  Date,
  ACL,
  Object: JSONObject,
  String: GraphQLString,
  Boolean: GraphQLBoolean,
  Number: GraphQLFloat,
});
