import { mapValues, constant } from 'lodash/fp';
import JSON from 'graphql-type-json';
import File from './types/File';
import Date from './types/Date';
import ACL from './types/ACL';
import {
  GraphQLString,
  GraphQLBoolean,
  GraphQLFloat,
} from 'graphql';

export default {
  ...mapValues(constant, {
    File,
    Date,
    ACL,
    Object: JSON,
    String: GraphQLString,
    Boolean: GraphQLBoolean,
    Number: GraphQLFloat,
  }),
  Pointer: ({ targetClass }, mapping) => mapping[targetClass](),
};
