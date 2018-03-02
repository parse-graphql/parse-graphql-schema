import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { every, isNumber, matchesProperty, eq, identity } from 'lodash/fp';

const isValid = array => every(isNumber, array) && array.length === 2;

function parseLiteral(ast) {
  if (ast.kind !== Kind.List) {
    throw new Error('CoordinateArray must be an array');
  }

  return ast.fields.map(({ kind, value }) => {
    if (kind !== Kind.FLOAT && kind !== Kind.INT) {
      throw new Error('CoordinateArray must be array of numbers');
    }

    return parseFloat(value);
  })
}

function parseValue(val) {
  if (!isValid(val)) {
    throw new Error('CoordinateArray must be array of numbers');
  }
  return val;
}

export default new GraphQLScalarType({
  name: 'CoordinateArray',
  serialize: identity,
  parseValue,
  parseLiteral,
});


