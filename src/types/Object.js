import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { isObject, identity } from 'lodash';

function parseValue(value) {
  if (!isObject(value)) {
    throw new Error('Value is not an object');
  }
  return value;
}

function parseLiteral(ast) {
  if (ast.kind !== Kind.OBJECT) {
    throw new Error('Value is not an object');
  }

  return parseJSONLiteral(ast);
}

function parseJSONLiteral(ast) {
  switch (ast.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      return ast.value;
    case Kind.INT:
    case Kind.FLOAT:
      return parseFloat(ast.value);
    case Kind.OBJECT: {
      const value = Object.create(null);
      ast.fields.forEach((field) => {
        value[field.name.value] = parseJSONLiteral(field.value);
      });

      return value;
    }
    case Kind.LIST:
      return ast.values.map(parseJSONLiteral);
    case Kind.NULL:
      return null;
    default:
      return undefined;
  }
}


export default new GraphQLScalarType({
  name: 'Object',
  serialize: identity,
  parseValue,
  parseLiteral,
});
