import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

const parseValue = dateString => new Date(dateString);

function parseLiteral(ast) {
  if (ast.kind !== Kind.STRING) {
    throw new Error('Invalid value for Date scalar');
  }

  return parseValue(ast.value);
}

export default new GraphQLScalarType({
  name: 'Date',
  serialize: date => date.toISOString(),
  parseValue,
  parseLiteral,
});
