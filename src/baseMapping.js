import { mapValues, constant } from 'lodash/fp';
import File from './types/File';
import Date from './types/Date';
import ACL from './types/ACL';
import {
  GraphQLString,
  GraphQLBoolean,
  GraphQLFloat,
} from 'graphql';

export default mapValues(constant, {
  File,
  Date,
  ACL,
  String: GraphQLString,
  Boolean: GraphQLBoolean,
  Number: GraphQLFloat,
});
